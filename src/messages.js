class Messages {
    messages = {
        '0': `❌ Opção inválida. Digite "menu" para ver as opções novamente.`,

        '1': `📅 Agendamento de Consulta:\n
        1️⃣ - Clínico Geral\n        2️⃣ - Cardiologia\n        3️⃣ - Ortopedia
        4️⃣ - Pediatria\n        5️⃣ - Ginecologia\n        6️⃣ - Dermatologia
        7️⃣ - Outra especialidade\n
        Digite a opção desejada ou "menu" para voltar ao início.`,

        '1.1': `🩺 Clínico Geral:\n
        Horários disponíveis:\n        Seg-Sex: 07h às 17h\n        Sáb: 08h às 12h\n
        Informe seu nome, telefone e data desejada.
        Um atendente confirmará em breve! ✅\n\nDigite "menu" para retornar ao início.`,

        '1.2': `❤️ Cardiologia:\n
        Horários disponíveis:\n        Seg, Qua e Sex: 08h às 16h\n
        Informe seu nome, telefone e data desejada.
        Um atendente confirmará em breve! ✅\n\nDigite "menu" para retornar ao início.`,

        '1.3': `🦴 Ortopedia:\n
        Horários disponíveis:\n        Ter e Qui: 08h às 17h\n
        Informe seu nome, telefone e data desejada.
        Um atendente confirmará em breve! ✅\n\nDigite "menu" para retornar ao início.`,

        '1.4': `👶 Pediatria:\n
        Horários disponíveis:\n        Seg-Sex: 07h às 18h\n        Sáb: 08h às 12h\n
        Informe nome da criança, responsável, telefone e data desejada.
        Um atendente confirmará em breve! ✅\n\nDigite "menu" para retornar ao início.`,

        '1.5': `🌸 Ginecologia:\n
        Horários disponíveis:\n        Seg, Qua e Qui: 08h às 17h\n
        Informe seu nome, telefone e data desejada.
        Um atendente confirmará em breve! ✅\n\nDigite "menu" para retornar ao início.`,

        '1.6': `🔬 Dermatologia:\n
        Horários disponíveis:\n        Ter e Sex: 09h às 16h\n
        Informe seu nome, telefone e data desejada.
        Um atendente confirmará em breve! ✅\n\nDigite "menu" para retornar ao início.`,

        '1.7': `📋 Outra Especialidade:\n
        Informe qual especialidade você precisa e verificaremos a disponibilidade.
        📞 Ou ligue diretamente: (91) 3333-4444\n\nDigite "menu" para retornar ao início.`,

        '2': `🔬 Resultado de Exames:\n
        🌐 Online: www.hospitalsaolucas.com.br/resultados
        Use seu CPF e a senha enviada por e-mail no cadastro.\n
        🏥 Presencialmente na recepção do laboratório:\n        Seg-Sex: 07h às 18h\n
        ⚠️ Exames de imagem: prontos em até 48 horas
        ⚠️ Exames laboratoriais: prontos em até 24 horas\n\nDigite "menu" para retornar ao início.`,

        '3': `💳 Convênios Aceitos:\n
        - Unimed\n        - Bradesco Saúde\n        - SulAmérica\n        - Amil
        - Porto Seguro Saúde\n        - Hapvida
        - NotreDame Intermédica\n        - Plano de Saúde do Estado (PAMED)\n
        💰 Também atendemos particulares com preços acessíveis.\n\nDigite "menu" para retornar ao início.`,

        '4': `🚨 Emergência / Pronto-socorro:\n
        ⚠️ Risco de vida? Ligue imediatamente:
        🚑 SAMU: 192  |  🔥 Bombeiros: 193  |  👮 Polícia: 190\n
        🏥 Pronto-socorro aberto 24h por dia, 7 dias por semana.\n
        📍 Av. Independência, 1500 — Ananindeua, PA
        🚗 Estacionamento gratuito para emergências.\n\nDigite "menu" para retornar ao início.`,

        '5': `🕐 Horários de Funcionamento:\n
        🏥 Recepção / Agendamentos:
        Seg-Sex: 06h30 às 20h  |  Sáb: 07h às 14h\n
        🔬 Laboratório:
        Seg-Sex: 07h às 18h  |  Sáb: 07h às 12h\n
        🚨 Pronto-socorro: 24 horas — todos os dias\n
        📞 Central: (91) 3333-4444\n\nDigite "menu" para retornar ao início.`,

        '6': `👩‍⚕️ Um atendente será chamado. Por favor, aguarde...\n
        ⏰ Atendimento humano:
        Seg-Sex: 07h às 19h  |  Sáb: 08h às 13h\n
        Fora desse horário deixe sua mensagem — retornaremos em breve! 📩`,

        '10': `👋 Olá! Seja bem-vindo ao *Hospital São Lucas* 🏥\n
        1️⃣ - Agendar consulta\n        2️⃣ - Resultado de exames
        3️⃣ - Informações sobre convênios\n        4️⃣ - Emergência / Pronto-socorro
        5️⃣ - Horários de funcionamento\n        6️⃣ - Falar com atendente\n
        Digite a opção desejada:`
    }

    getMessage(index = 0) {
        return this.messages[index.toString()] ?? this.messages['0'];
    }
}

export default new Messages();