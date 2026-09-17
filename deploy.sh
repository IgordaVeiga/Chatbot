#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"
cd ChatBot-UBS

echo "==> Baixando a versão mais recente do GitHub..."
git pull origin main --ff-only

echo "==> Instalando dependências..."
npm install

echo "==> Reiniciando o bot no pm2..."
pm2 restart chatbot-ubs

pm2 logs chatbot-ubs --lines 20 --nostream