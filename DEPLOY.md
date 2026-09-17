# Guia de Deploy — ChatBot UBS

Guia do início ao fim de como o chatbot da UBS roda em produção e como atualizá-lo sempre que houver alterações novas no projeto.

## Arquitetura

```
Seu PC (desenvolvimento)  -->  GitHub (main = fonte da verdade)  -->  Servidor (Oracle Cloud)
        push                                merge                        git pull manual
```

O fluxo de uma alteração é sempre o mesmo:

1. Você altera o código no **seu PC**.
2. Envia para o **GitHub** (merge na branch `main`).
3. No **servidor**, você puxa a versão nova e reinicia o bot com **um comando**.

> ⚠️ **Importante:** o servidor **NÃO se atualiza sozinho**. Ele só recebe o que estiver na branch `main` do GitHub **quando você rodar o `deploy.sh`**. Por isso o passo 2 (código na `main`) é obrigatório antes do passo 3.

## Ambientes e caminhos

| Ambientes        | Caminho no repositório                 | Observações                                    |
| ---------------- | -------------------------------------- | ---------------------------------------------- |
| Seu PC (Windows) | `.../Chatbot/ChatBot-UBS`              | Desenvolvimento local                          |
| GitHub           | `https://github.com/IgordaVeiga/Chatbot` | Branch `main` = versão que vai para produção |
| Servidor (Ubuntu) | `/home/ubuntu/Chatbot` (repositório)  | O `.git` fica aqui, 1 nível acima do projeto  |
| Servidor (projeto) | `/home/ubuntu/Chatbot/ChatBot-UBS`   | Onde o bot roda                                 |

O bot roda no servidor com **pm2**, com o nome do processo **`chatbot-ubs`**.

---

## 1. Primeira implantação (do zero)

Execute os comandos abaixo **no servidor** (via SSH). Ajuste a instalação do Node.js conforme a distro (ex.: use `nvm` caso prefira uma versão específica).

```bash
# 1. Node.js + npm
sudo apt update && sudo apt install -y nodejs npm

# 2. Gerenciador de processos pm2
sudo npm install -g pm2

# 3. Chromium (usado pelo Puppeteer para abrir o WhatsApp Web)
sudo snap install chromium

# 4. Baixa o código do GitHub
cd /home/ubuntu
git clone https://github.com/IgordaVeiga/Chatbot.git

# 5. Instala as dependências do projeto
cd Chatbot/ChatBot-UBS
npm install
```

### Configurando o pm2

```bash
# Inicia o bot
pm2 start src/main.js --name chatbot-ubs

# Garante que o pm2 suba junto com o sistema
pm2 save
pm2 startup
```

### Vinculando o WhatsApp (primeira vez)

A primeira execução mostra um **QR Code** nos logs do pm2:

```bash
pm2 logs chatbot-ubs
```

Escaneie com o WhatsApp do número que será o bot (Menu do WhatsApp → **Aparelhos conectados** → **Conectar um aparelho**). A sessão fica salva em `.wwebjs_auth` e **não** precisa refazer o QR nas próximas atualizações.

### Verificando

```bash
pm2 status            # deve mostrar o chatbot-ubs como "online"
pm2 logs chatbot-ubs  # deve aparecer "Bot está pronto!"
```

Mande `menu` no WhatsApp do bot para testar.

---

## 2. Atualização de rotina (alterações novas no projeto)

Este é o processo que você vai usar **sempre** que fizer uma alteração e quiser publicar no servidor.

### Passo 1 — No seu PC: enviar as alterações para o GitHub

```bash
# Dentro da pasta do projeto (ChatBot-UBS/)
git add .
git commit -m "descrição da alteração"
git push origin Dev-Rafael
```

Depois, leve as alterações para a `main` (opcional, mas recomendado) pelo **Pull Request** no GitHub (Dev-Rafael → main) e clique em **Merge**. Se prefere enviar direto para a main:

```bash
git push origin Dev-Rafael:main
```

> Confirme que a `main` do GitHub recebeu o commit antes de seguir (página do repositório mostra o histórico).

### Passo 2 — No servidor: puxar e reiniciar

```bash
cd /home/ubuntu/Chatbot
bash deploy.sh
```

O `deploy.sh` faz, em sequência:

```bash
cd ChatBot-UBS                       # entra no projeto
git pull origin main --ff-only        # baixa a versão nova da main do GitHub
npm install                           # atualiza dependências
pm2 restart chatbot-ubs               # reinicia o bot com o código novo
pm2 logs chatbot-ubs --lines 20 --nostream   # mostra o final dos logs
```

> Como o `deploy.sh` está salvo no repositório, ele sempre acompanha o projeto.

### Passo 3 — Conferir

```bash
pm2 status                # chatbot-ubs = online
pm2 logs chatbot-ubs      # deve mostrar "Bot está pronto!"
```

Teste no WhatsApp do bot (mande `menu`) para confirmar o atendimento.

---

## Regras de ouro

- **Nunca edite arquivos direto no servidor** (ex.: `nano src/main.js`). Qualquer alteração local é **descartada** no próximo `git pull`.
- **Nunca apague** `.wwebjs_auth/` (login do WhatsApp) nem `data/` (estado dos usuários) durante atualizações. Isso só é feito em situações específicas (ver abaixo).
- Se o `git pull` reclamar de *local changes would be overwritten*: `git stash` (guarda de lado), `git pull`, e `git stash drop` quando confirmar que está tudo certo.
- A VM free-tier da Oracle tem **1 GB de RAM**: o boot do bot é lento e o Chromium às vezes "pisca". Após `pm2 restart`, aguarde um pouco antes de testar.

---

## Problemas comuns

### O bot parou de responder

O WhatsApp Web atualizou o DOM e a biblioteca `whatsapp-web.js` ficou desatualizada. Atualize a biblioteca:

```bash
cd /home/ubuntu/Chatbot/ChatBot-UBS
pm2 stop chatbot-ubs
npm install whatsapp-web.js@latest
pm2 restart chatbot-ubs
pm2 logs chatbot-ubs
```

### Precisa deslogar o WhatsApp ou trocar o número do bot

Apague a sessão (e só nesse caso) e reinicie — um novo QR aparecerá:

```bash
pm2 stop chatbot-ubs
rm -rf .wwebjs_auth .wwebjs_cache
pm2 restart chatbot-ubs
pm2 logs chatbot-ubs
```

### Erro de lockfile (apenas em desenvolvimento local/Windows)

Outra instância do bot ainda está aberta na mesma sessão do WhatsApp:

```bash
npm run kill
npm start
```