import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import messages from './messages.js';
import { arvore, parents } from './tree.js';

const DATA_DIR = path.resolve('data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');

// Destino da notificação de atendimento humano.
// Ex: 'grupo@c.us' (grupo) ou '5511999999999@c.us' (contato). Deixe '' para desativar.
const NOTIFY_TARGET = '';

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.once('ready', () => {
    console.log("Bot está pronto!");
});

//onde o usuário está
const userState = loadState();

//lembra se a última mensagem enviada foi uma resposta final (folha):
//guarda o submenu pai para o [0] voltar até ele (ex: 8.1 volta para 8)
const leafView = {};

function loadState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
        }
    } catch (err) {
        console.error('Erro ao carregar estado:', err.message);
    }
    return {};
}

let saveTimer;
function persistState() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        try {
            fs.mkdirSync(DATA_DIR, { recursive: true });
            fs.writeFileSync(STATE_FILE, JSON.stringify(userState, null, 2));
        } catch (err) {
            console.error('Erro ao salvar estado:', err.message);
        }
    }, 1000);
}

async function notifyHuman(msg) {
    if (!NOTIFY_TARGET) return;
    try {
        const contact = await msg.getContact();
        const name = contact.pushname || contact.name || 'Desconhecido';
        const text = `🔔 *Nova solicitação de atendimento humano*\n\n` +
            `👤 Nome: ${name}\n` +
            `📱 Número: ${msg.from}\n\n` +
            `Responda esse contato diretamente no WhatsApp para atendê-lo(a).`;
        await client.sendMessage(NOTIFY_TARGET, text);
    } catch (err) {
        console.error('Erro ao notificar atendimento humano:', err.message);
    }
}

//Lógica da Árvore de decisão

client.on('message', async (msg) => {
    //Definição do id da conversa e o que o usuário digitou (body)
    const chatId = msg.from;
    const body = msg.body.trim().toLocaleLowerCase();

    console.log('Estado atual:', userState[chatId]);
    console.log('Body digitado:', body);

    if (userState[chatId] === 'atendente') {
        console.log('Bot ignorando mensagem, usuário em atendimento humano');
        return;
    }

    //se o usuário escreve 'menu' ou não existe então ele vai para o menu
    if (body === 'menu' || !userState[chatId]) {
        userState[chatId] = 'menu';
        leafView[chatId] = null;
        persistState();
        return client.sendMessage(chatId, messages.getMessage('10'));
    }

    const currentNode = userState[chatId]; //Nó atual
    const validOptions = arvore[currentNode] ?? []; //validação se o nó esta na arvore

    //opção [0]: voltar um nível — da resposta final volta ao submenu; do submenu volta ao menu
    if (body === '0') {
        if (leafView[chatId]) {
            const backTo = leafView[chatId];
            leafView[chatId] = null;
            userState[chatId] = backTo;
            persistState();
            return client.sendMessage(chatId, messages.getMessage(backTo));
        }
        if (currentNode !== 'menu') {
            leafView[chatId] = null;
            userState[chatId] = 'menu';
            persistState();
            return client.sendMessage(chatId, messages.getMessage('10'));
        }
        return client.sendMessage(chatId, messages.getMessage('0'));
    }

    //verifica se a opção do body está inclusa na arvore e seus nós,se não estiver retorna o "0" (mensagem de erro)
    if (!validOptions.includes(body)) {
        return client.sendMessage(chatId, messages.getMessage('0'));
    }

    if (body === '9' && currentNode === 'menu') {
        userState[chatId] = 'atendente';
        persistState();
        console.log('Estado do usuário:', userState[chatId]);
        notifyHuman(msg);
        return client.sendMessage(chatId, messages.getMessage('9'));
    }

    //Nó atual igual ao menu ? se sim então apenas o número ex:"1" se não, está em um submenu então ex:"1.2"
    const messageKey = currentNode === 'menu' ? body : `${currentNode}.${body}`;

    //se o nó que o usuário digitou existe na árvore e está no "menu" então avança para o submenu
    if (arvore[body] !== undefined && currentNode === 'menu') {
        userState[chatId] = body;
        leafView[chatId] = null;
        persistState();
        return client.sendMessage(chatId, messages.getMessage(messageKey));
    }

    //mensagem final (folha): guarda o submenu pai no leafView e volta o estado para ele
    const parent = parents[messageKey] ?? 'menu';
    userState[chatId] = parent;
    leafView[chatId] = parent;
    persistState();
    return client.sendMessage(chatId, messages.getMessage(messageKey));
});

client.on('message_create', async (msg) => {
    const chatId = msg.to;
    const body = msg.body.trim().toLocaleLowerCase();

    if (msg.fromMe && body == 'encerrar atendimento') {
        userState[chatId] = 'menu';
        leafView[chatId] = null;
        persistState();
        await client.sendMessage(chatId, messages.getMessage('9.1'));
        await sleep(3000);
        return client.sendMessage(chatId, messages.getMessage('10'));
    }
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const lockfile = path.resolve('.wwebjs_auth', 'session', 'lockfile');
if (fs.existsSync(lockfile)) {
    console.warn('⚠️  Detectado lockfile de sessão. Se outro bot estiver rodando, encerre antes de continuar: npm run kill');
}

client.initialize().catch((err) => {
    console.error('❌ Falha ao iniciar o bot:', err?.message ?? err);
    if (String(err?.message ?? '').includes('EBUSY') || String(err?.message ?? '').includes('lockfile')) {
        console.error('Possível causa: outra instância do bot ainda está aberta nesta mesma sessão.');
        console.error('👉 Encerre o processo antigo com "npm run kill" e rode "npm start" novamente.');
    }
    process.exit(1);
});