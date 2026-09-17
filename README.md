# ChatBot UBS

Chatbot para uma **Unidade Básica de Saúde (UBS)** que atende a comunidade pelo **WhatsApp**, guiando as pessoas por um menu em formato de **árvore de decisão** (2 níveis) com informações sobre consultas, exames, medicamentos, campanhas, grupos de atenção e atendimento humano.

## Como funciona

1. O usuário chama o número do bot no WhatsApp.
2. O bot apresenta o **menu principal** com 9 opções.
3. A cada escolha, o bot navega pela árvore até chegar à **resposta final**.
4. A qualquer momento o usuário pode voltar digitando `[0]` (volta um nível) ou `menu` (volta ao início).
5. Se a dúvida não for resolvida (opção `9`), a conversa é direcionada ao **atendimento humano**.

## Menu do atendimento

```
1️⃣  - Horários e marcação de consultas/exames
2️⃣  - Serviços oferecidos pela UBS
3️⃣  - Encaminhamentos e especialistas
4️⃣  - Medicamentos e troca de receitas
5️⃣  - Informações sobre gestantes, crianças e idosos
6️⃣  - Dúvidas sobre território e atendimento da ESF
7️⃣  - Falar com ACS ou equipe da UBS
8️⃣  - Campanhas, ações e eventos da unidade
9️⃣  - Outras dúvidas
```

## Funcionalidades

- **Árvore de decisão em 2 níveis** — menu principal e submenus (ex.: `8` → `8.1`/`8.2`).
- **Navegação** — `[0]` volta ao submenu/menu anterior; `menu` volta ao início.
- **Persistência de estado** — cada usuário continua de onde parou mesmo se o bot reiniciar (`data/state.json`).
- **Notificação de atendimento humano** — avisa um contato/grupo configurado quando alguém solicita atendimento (opção `9`).
- **Multi-conversa** — atende vários usuários ao mesmo tempo.
- **Validação da árvore** — detecta nós ou mensagens quebradas (`npm run check`).
- **Portátil para produção** — detecta automaticamente o Chromium da Oracle Cloud (snap) ou usa o Chrome local do Puppeteer.

## Tecnologias

- Node.js 18+
- whatsapp-web.js (LocalAuth)
- Puppeteer / Chromium
- qrcode-terminal

## Estrutura do projeto

```
Chatbot/
├── ChatBot-UBS/          # Projeto (bot)
│   ├── src/
│   │   ├── main.js       # Lógica do bot (conexão, navegação, estado)
│   │   ├── messages.js   # Todos os textos/mensagens do menu
│   │   ├── tree.js       # Árvore de decisão (nós e submenus)
│   │   ├── validate.js   # Validação de consistência da árvore
│   │   └── kill.js       # Encerra instâncias do bot (Windows)
│   ├── data/             # Estado persistido (gerado em execução)
│   └── package.json
├── deploy.sh             # Script de atualização no servidor (ver DEPLOY.md)
└── README.md
```

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no WhatsApp (para vincular o bot)

### Instalação e execução

```bash
# 1. Instale as dependências
npm install

# 2. Execute o bot
npm start
```

Na **primeira execução**, aparece um **QR Code** no terminal — escaneie com o WhatsApp (Aparelhos conectados) do número que será o bot. A sessão fica salva em `.wwebjs_auth` e não precisa refazer o QR nas próximas execuções.

> Se der erro de *lockfile*, outro bot ainda está rodando nesta sessão. Encerre com `npm run kill` e rode `npm start` novamente.

## Scripts

| Comando           | Descrição                                             |
| ----------------- | ----------------------------------------------------- |
| `npm start`       | Inicia o bot                                          |
| `npm run dev`     | Inicia em modo desenvolvimento (restarta ao salvar)  |
| `npm run check`   | Valida a consistência da árvore e das mensagens      |
| `npm run kill`    | Encerra instâncias do bot (Windows)                   |

## Como editar o menu do atendimento

1. Edite o texto da resposta em `src/messages.js` (chave como `'1.2'`, `'8.2'`...).
2. Ajuste os nós/submenus em `src/tree.js`.
3. Valide as mudanças:

```bash
npm run check
```

O `check` garante que toda opção do menu aponta para uma mensagem existente e que o mapa de submenus está correto.

## Deploy em produção

O bot roda na **Oracle Cloud** (Ubuntu) com **pm2**. O passo a passo completo — primeira implantação e atualização de rotina — está em **[DEPLOY.md](DEPLOY.md)**.

## Créditos

Rafael Albuquerque, Igor Veiga