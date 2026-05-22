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

const userState = {};

//Lógica da Árvore de decisão

client.on('message', async(msg) => {
    const chatId = msg.from;
    const body = msg.body.trim().toLocaleLowerCase();

    if (body === 'menu' || !userState[chatId]) {
        userState[chatId] = 'menu'
        return client.sendMessage(chatId, messages.getMessage('10'))
    }

    if (userState[chatId] === 'menu') {
        return client.sendMessage(chatId, messages.getMessage(body))
    }
})

client.initialize();