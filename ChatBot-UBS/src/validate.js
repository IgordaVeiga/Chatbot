import { arvore, parents } from './tree.js';
import messages from './messages.js';

let errors = 0;
const warns = [];

const hasMessage = (key) =>
    Object.prototype.hasOwnProperty.call(messages.messages, key);

function error(msg) {
    errors++;
    console.log(`❌ ${msg}`);
}

for (const [node, options] of Object.entries(arvore)) {
    if (node !== 'menu' && !hasMessage(node)) {
        error(`O nó "${node}" não possui mensagem "${node}" em messages.js`);
    }

    for (const option of options) {
        const key = node === 'menu' ? option : `${node}.${option}`;

        if (!hasMessage(key)) {
            error(`A opção "${option}" do nó "${node}" gera a mensagem "${key}", que não existe em messages.js`);
            continue;
        }

        if (node !== 'menu' && parents[key] !== node) {
            error(`O mapa parents deve apontar "${key}" para "${node}", mas aponta para "${parents[key]}"`);
        }
    }
}

for (const [key, parent] of Object.entries(parents)) {
    if (arvore[parent] === undefined) {
        error(`O mapa parents aponta "${key}" para o nó "${parent}", que não existe na árvore`);
    }
}

for (const key of Object.keys(messages.messages)) {
    const valid =
        key === '0' || key === '9.1' || key === '10' ||
        hasMessage(key) && arvore[key] !== undefined ||
        (key.includes('.') && parents[key] !== undefined);

    if (!valid) {
        warns.push(key);
    }
}

if (errors > 0) {
    console.log(`\n${errors} erro(s) encontrado(s) na árvore.`);
    process.exit(1);
}

if (warns.length > 0) {
    console.log(`⚠️  Mensagens não referenciadas na árvore: ${warns.join(', ')}`);
}

console.log('✅ Árvore consistente.');