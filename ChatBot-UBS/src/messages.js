const NAV_HINT = `Digite :  [0] voltar  • "menu" para o início`;

class Messages {
    messages = {
        '0': `❌ Opção inválida. Digite *menu* para ver as opções novamente.`,

        '1': `1 . Horários e marcação de consultas/exames

Escolha uma opção digitando o número:
1️⃣ Consulta médica
2️⃣ Consulta de enfermagem
3️⃣ Marcação de exames
4️⃣ Documentos necessários
5️⃣ Laboratório e coletas
6️⃣ Preventivo (PCCU)

${NAV_HINT}`,

        '1.1': `🩺 1.1 Consulta médica

As consultas médicas são realizadas conforme *disponibilidade da unidade*. Procure a recepção da UBS ou seu ACS para orientações sobre *agendamento*.

${NAV_HINT}`,

        '1.2': `👩‍⚕️ 1.2 Consulta de enfermagem

Oferecemos consultas de enfermagem para:
• *Pré-natal*
• *Curativos*
• *Acompanhamento de doenças crônicas*
• *Preventivo*
• *Orientações gerais*

${NAV_HINT}`,

        '1.3': `🔬 1.3 Marcação de exames

• Exames e consultas são marcados no *laboratório* da unidade.
• Dias de marcação: *segunda, quarta e sexta-feira*.

${NAV_HINT}`,

        '1.4': `🪪 1.4 Documentos necessários

Para qualquer atendimento, traga sempre:
• *RG e CPF*
• *Cartão do SUS*
• *Comprovante de residência* atualizado
• Encaminhamento (se houver)

${NAV_HINT}`,

        '1.5': `🧪 1.5 Laboratório e coletas

• Consultas e exames: marcados no laboratório às *seg, qua e sex*
• Coleta de material: *07h15 às 11h* (somente pela manhã)
• Entrega de material: *ter e qui*

${NAV_HINT}`,

        '1.6': `🩺 1.6 Preventivo (PCCU)

Realizado por *agendamento*, todos os dias:
• Manhã: *08h às 10h*
• Tarde: *14h às 16h*

${NAV_HINT}`,

        '2': `2 . Serviços oferecidos pela UBS

Escolha uma opção digitando o número:
1️⃣ Médico
2️⃣ Enfermagem
3️⃣ Psicologia
4️⃣ Nutrição
5️⃣ Odontologia
6️⃣ Curativos
7️⃣ Imunização (vacinas)
8️⃣ Testes rápidos
9️⃣ Teste do pezinho
🔟 Injetáveis (intramuscular)

${NAV_HINT}`,

        '2.1': `🩺 2.1 Médico

A unidade possui principalmente *médicos da família*, responsáveis pelo atendimento geral e acompanhamento contínuo da população.

${NAV_HINT}`,

        '2.2': `🩺 2.2 Enfermagem

A equipe realiza *consultas preventivas*, *pré-natal*, *curativos*, *imunização* e *grupos de orientação em saúde*.

${NAV_HINT}`,

        '2.3': `🧠 2.3 Psicologia

Atendimento psicológico voltado para *acolhimento*, *orientações* e *acompanhamento clínico preventivo*.

${NAV_HINT}`,

        '2.4': `🍏 2.4 Nutrição

Acompanhamento nutricional, *dietas terapêuticas* e orientações para uma *alimentação saudável*.

${NAV_HINT}`,

        '2.5': `🦷 2.5 Odontologia

Atendimento odontológico *preventivo*, *limpeza* e *tratamentos clínicos básicos*.

${NAV_HINT}`,

        '2.6': `🩹 2.6 Curativos

Todos os dias: *08h às 11h* e *13h às 16h*.

${NAV_HINT}`,

        '2.7': `💉 2.7 Imunização (vacinas)

• Atendimento por *livre demanda*, qualquer dia da semana.
• Em caso de dúvidas, procure a UBS para informações sobre *horários* e *vacinas disponíveis*.

${NAV_HINT}`,

        '2.8': `🧬 2.8 Testes rápidos

Todos os dias: *08h às 11h* e *13h30 às 16h*.
Realizados para:
• *HIV*
• *Hepatite B*
• *Sífilis*

${NAV_HINT}`,

        '2.9': `👶 2.9 Teste do pezinho

Realizado das *08h às 11h*.

${NAV_HINT}`,

        '2.10': `💊 2.10 Injetáveis (intramuscular)

Das *08h às 11h* e *13h30 às 16h*.

${NAV_HINT}`,

        '3': `3 . Encaminhamentos e especialistas

Escolha uma opção digitando o número:
1️⃣ Encaminhamento para exames
2️⃣ Encaminhamento para especialista
3️⃣ Onde dar entrada no encaminhamento
4️⃣ Troca de medicamentos
5️⃣ Regulação / entrada de exame

${NAV_HINT}`,

        '3.1': `📝 3.1 Encaminhamento para exames

Para exames fora da rede básica, apresente obrigatoriamente: *encaminhamento médico*, *Cartão SUS* e *documento com foto*.

${NAV_HINT}`,

        '3.2': `🏥 3.2 Encaminhamento para especialista

A unidade conta com *médicos da família*. Havendo necessidade de especialista, o encaminhamento é inserido no *sistema de regulação*.

${NAV_HINT}`,

        '3.3': `🏢 3.3 Onde dar entrada no encaminhamento

Procure o *setor de regulação* ou a *recepção* da UBS portando as *guias médicas* e seus *documentos pessoais*.

${NAV_HINT}`,

        '3.4': `🔄 3.4 Troca de medicamentos / ajustes

Para reavaliar ou ajustar *receitas de medicamentos contínuos*, agende um *atendimento médico* ou *de enfermagem*.

${NAV_HINT}`,

        '3.5': `📋 3.5 Regulação / entrada de exame

Para dar entrada em exames que passam pela regulação, procure o *serviço de regulação* da unidade portando *encaminhamento médico*, *Cartão do SUS* e *documento com foto*.

${NAV_HINT}`,

        '4': `4 . Medicamentos e troca de receitas

Escolha uma opção digitando o número:
1️⃣ Informações sobre medicamentos
2️⃣ Troca de receita
3️⃣ Como conseguir medicamentos pela UBS

${NAV_HINT}`,

        '4.1': `ℹ️ 4.1 Informações sobre medicamentos

Consulte a *farmácia da UBS* para checar a disponibilidade de medicamentos da *lista essencial do município*.

${NAV_HINT}`,

        '4.2': `✍️ 4.2 Troca de receita

A renovação de receitas deve ser solicitada com antecedência em uma *consulta de rotina* ou *acolhimento*.

${NAV_HINT}`,

        '4.3': `🤲 4.3 Como conseguir medicamentos pela UBS

Apresente a *receita original dentro da validade* (emitida pelo SUS) com o documento do paciente na *farmácia da unidade*.

${NAV_HINT}`,

        '5': `5 . Informações sobre gestantes, crianças e idosos

Escolha uma opção digitando o número:
1️⃣ Gestantes
2️⃣ Crianças
3️⃣ Idosos

${NAV_HINT}`,

        '5.1': `🤰 5.1 Gestantes

A UBS oferece acompanhamento completo de *pré-natal*, *exames laboratoriais*, *testes rápidos*, *vacinação* e *orientações para o parto*.

${NAV_HINT}`,

        '5.2': `👶 5.2 Crianças

Acompanhamento do crescimento (*puericultura*), *vacinação em dia* e *atendimento infantil regular*.

${NAV_HINT}`,

        '5.3': `🧓 5.3 Idosos

Acompanhamento de *doenças crônicas (Hiperdia)* e grupo de comunicação exclusivo via *WhatsApp* para avisos e orientações.

${NAV_HINT}`,

        '6': `6 . Dúvidas sobre território e atendimento da ESF

Escolha uma opção digitando o número:
1️⃣ Como descobrir sua ESF
2️⃣ O que fazer se morar em outra área
3️⃣ Como funciona o atendimento

${NAV_HINT}`,

        '6.1': `🔍 6.1 Como descobrir sua ESF

Compareça à *recepção* com o *comprovante de residência*. A equipe informará qual a sua equipe de *Saúde da Família* com base na sua rua.

${NAV_HINT}`,

        '6.2': `🏠 6.2 Morar em outra área

A unidade realiza o *acolhimento e a orientação inicial*, mas para acompanhamentos contínuos você será direcionado à sua *UBS de referência*.

${NAV_HINT}`,

        '6.3': `⚙️ 6.3 Como funciona o atendimento

A *ESF* (Estratégia Saúde da Família) trabalha de forma *territorial fixa*, focando na *prevenção* e no cuidado do núcleo familiar.

${NAV_HINT}`,

        '7': `7 . Falar com ACS ou equipe da UBS

Escolha uma opção digitando o número:
1️⃣ Agente Comunitário de Saúde (ACS)
2️⃣ Equipe de Enfermagem
3️⃣ Recepção da UBS
4️⃣ Médico(a)

${NAV_HINT}`,

        '7.1': `👣 7.1 Agente Comunitário de Saúde (ACS)

Os ACS realizam *visitas domiciliares* periódicas para *cadastramento*, monitoramento de *gestantes* e *idosos* e ações de *prevenção* na comunidade.

${NAV_HINT}`,

        '7.2': `🩺 7.2 Equipe de Enfermagem

Um profissional de enfermagem prestará o *atendimento humano* assim que disponível.

${NAV_HINT}`,

        '7.3': `💁 7.3 Recepção da UBS

Aguarde um momento, sua mensagem está sendo direcionada ao *balcão de atendimento* da recepção.

${NAV_HINT}`,

        '7.4': `🩺 7.4 Médico(a)

Para falar com o médico ou obter *laudos específicos*, aguarde o *redirecionamento* ou agende seu atendimento presencial.

${NAV_HINT}`,

        '8': `8 . Campanhas, ações e eventos da unidade

Escolha uma opção digitando o número:
1️⃣ Eventos atuais
2️⃣ Datas das ações

${NAV_HINT}`,

        '8.1': `🗓️ 8.1 Campanhas e eventos

A UBS promove rotineiramente *campanhas de vacinação*, *mutirões de saúde*, *ações educativas* e *distribuição assistida de cestas básicas*.

${NAV_HINT}`,

        '8.2': `📅 8.2 Datas das ações

As datas são divulgadas no *mural da UBS*, na *recepção* e nos *grupos de WhatsApp* da comunidade. Acompanhe também os avisos dos *ACS*.

${NAV_HINT}`,

        '9': `9 . Outras dúvidas

Por favor, descreva brevemente sua dúvida para que a nossa equipe possa orientar você da melhor forma possível.

Aguarde, nossa equipe irá te responder por aqui. 😁`,

        '10': `Olá! Seja bem-vindo ao atendimento virtual da UBS do Curió 🏥

Eu sou o CURI.IA 🐦‍⬛, como posso ajudar você hoje?

1️⃣ Horários e marcação de consultas/exames
2️⃣ Serviços oferecidos pela UBS
3️⃣ Encaminhamentos e especialistas
4️⃣ Medicamentos e troca de receitas
5️⃣ Informações sobre gestantes, crianças e idosos
6️⃣ Dúvidas sobre território e atendimento da ESF
7️⃣ Falar com ACS ou equipe da UBS
8️⃣ Campanhas, ações e eventos da unidade
9️⃣ Outras dúvidas

👉 Digite o número da opção desejada.`,

        '9.1': `Atendimento encerrado, você está falando com o CURI.IA🐦‍⬛ agora.`
    }

    getMessage(index = 0) {
        return this.messages[index.toString()] ?? this.messages['0'];
    }
}

export default new Messages();