import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import messages from './messages.js';

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.once('ready', () => {
    console.log("Bot está pronto!");
});

//Nós da árvore

const arvore = {
    'menu': ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    '1': ['1', '2', '3', '4'],
    '2': ['1', '2', '3', '4', '5'],
    '3': ['1', '2', '3', '4'],
    '4': ['1', '2', '3'],
    '5': ['1', '2', '3'],
    '6': ['1', '2', '3'],
    '7': ['1', '2', '3', '4'],
    '8': ['1'],
    '9': [],
};

//onde o usuário está
const userState = {};

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
        userState[chatId] = 'menu'
        return client.sendMessage(chatId, messages.getMessage('10'));
    }

    const currentNode = userState[chatId]; //Nó atual
    const validOptions = arvore[currentNode] ?? []; //validação se o nó esta na arvore

    //verifica se a opção do body está inclusa na arvore e seus nós,se não estiver retorna o "0" (mensagem de erro)
    if (!validOptions.includes(body)) {
        return client.sendMessage(chatId, messages.getMessage('0'));
    }

    if (body === '9' && currentNode === 'menu') {
        userState[chatId] = 'atendente';
        console.log('Estado do usuário:', userState[chatId]);
        return client.sendMessage(chatId, messages.getMessage('9'));
    }

    //Nó atual igual ao menu ? se sim então apenas o número ex:"1" se não, está em um submenu então ex:NoAtual.body ou "1.2"
    const messageKey = currentNode === 'menu' ? body : `${currentNode}.${body}`;

    /* se minha o nó que o usuário digitou for na arvore diferente de vazio/indefinido e estiver no "menu" então avança para o submenu se não,
    vai para o menu */
    if (arvore[body] !== undefined && currentNode === 'menu') {
        userState[chatId] = body;
    } else {
        userState[chatId] = 'menu';
    }

    return client.sendMessage(chatId, messages.getMessage(messageKey));
});

client.on('message_create', async (msg) => {
    const chatId = msg.to;
    const body = msg.body.trim().toLocaleLowerCase();

    if (msg.fromMe && body == 'encerrar atendimento') {
        userState[chatId] = 'menu'
        await client.sendMessage(chatId, messages.getMessage('9.1'));
        await sleep(3000);
        return client.sendMessage(chatId, messages.getMessage('10'));
    }
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

client.initialize();