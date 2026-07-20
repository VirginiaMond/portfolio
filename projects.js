function createArtwork({ title, subtitle, accent = '#8b5cf6', accent2 = '#ec4899', detail = 'Portfolio' }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0f"/>
          <stop offset="100%" stop-color="#151525"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="${accent2}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.42" />
        </filter>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)"/>
      <circle cx="960" cy="150" r="140" fill="${accent}" opacity="0.18"/>
      <circle cx="170" cy="760" r="200" fill="${accent2}" opacity="0.13"/>
      <rect x="120" y="120" width="960" height="660" rx="42" fill="#11111d" stroke="rgba(139,92,246,0.24)" filter="url(#shadow)"/>
      <rect x="170" y="170" width="420" height="28" rx="14" fill="url(#accent)" opacity="0.9"/>
      <rect x="170" y="232" width="720" height="18" rx="9" fill="#3c3c52"/>
      <rect x="170" y="270" width="610" height="18" rx="9" fill="#323246"/>
      <rect x="170" y="338" width="860" height="320" rx="28" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)"/>
      <rect x="206" y="378" width="250" height="200" rx="22" fill="rgba(139,92,246,0.16)" stroke="rgba(139,92,246,0.34)"/>
      <rect x="490" y="378" width="250" height="200" rx="22" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.3)"/>
      <rect x="774" y="378" width="220" height="200" rx="22" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
      <text x="170" y="690" fill="#f1f0f5" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="700">${title}</text>
      <text x="170" y="742" fill="#a09ab8" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="400">${subtitle}</text>
      <text x="170" y="794" fill="#5c5478" font-family="Fira Code, monospace" font-size="18" font-weight="400">${detail}</text>
    </svg>
  `;

  return {
    src: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    alt: title,
    caption: subtitle,
  };
}

const projects = {
  pje: {
    id: 'pje',
    titulo: 'Automação de Processos Judiciais (PJe)',
    categoria: 'Profissional',
    status: 'Concluído e novos modelos em produção',
    data: '2025-2026',
    descricao: 'Desenvolvimento de robôs para automação de tarefas repetitivas e extração de metadados processuais na Procuradoria Geral do Maranhão, com integração ao ecossistema de planilhas e fluxos de autenticação.',
    objetivo: 'Reduzir o esforço manual em rotinas judiciais, acelerar a coleta de números de processos, diários eletrônicos e registro de informações.',
    papel: 'Desenvolvimento e manutenção dos robôs, tratamento de exceções, integração com planilhas e suporte à confiabilidade das execuções.',
    funcionalidades: [
      'Automação de rotinas repetitivas no ambiente judicial',
      'Automação de downloads de documentos processuais, ex: Petição Inicial, Sentença, Acórdão',
      'Extração de metadados processuais com validações',
      'Integração com Google Sheets para registro estruturado',
      'Contorno de desafios de MFA e estabilidade de sessão',
    ],
    tecnologias: ['Python', 'Playwright', 'Selenium', 'Google Sheets API', 'HTML5', 'CSS3'],
    galeria: [],
    aprendizados: [
      'Robôs institucionais precisam de tolerância a falhas e observabilidade contínua.',
      'A combinação de automação com validação de dados evita retrabalho na operação.',
      'Fluxos sensíveis exigem comunicação clara entre tecnologia e área usuária.',
    ],
    desafios: [
      'Autenticação com MFA e navegação sujeita a variações na interface.',
      'Manter estabilidade diante de mudanças no comportamento do sistema judicial e na atualização do front-end',
      'Garantir rastreabilidade das execuções em um fluxo crítico.',
    ],
    solucoes: [
      'Seletores resilientes, esperas explícitas e retomada controlada em falhas temporárias.',
      'Camadas de logging e padronização dos registros enviados para planilhas.',
      'Estrutura modular para isolar autenticação, coleta e persistência.',
    ],
    melhorias: [
      'Expandir cobertura de testes para novos fluxos do PJe.',
      'Implementar métricas de desempenho para monitorar a eficácia dos robôs.',
    ],
    arquitetura: 'Pipeline em Python orquestrando automação de navegador, validação de metadados e envio estruturado para Google Sheets.',
    privado: true,
    links: [],
  },
  'sistema-compra-chatbot-ia': {
    id: 'sistema-compra-chatbot-ia',
    titulo: 'Sistema de Compra com Chatbot - SkAI',
    categoria: 'Acadêmico',
    status: 'Concluído',
    data: '2025',
    descricao: 'API REST para compra rápida de passagens aéreas integrada com chatbot dinâmico, usando geração de linguagem para orientar a jornada do usuário e persistência em banco de dados.',
    objetivo: 'Simplificar a busca e compra de passagens com uma camada conversacional que reduz atrito na experiência do usuário.',
    papel: 'Desenvolvimento da API, integração com o chatbot, modelagem dos dados e apoio à experiência conversacional.',
    funcionalidades: [
      'API REST para orquestrar a jornada de compra',
      'Chatbot dinâmico com respostas orientadas por IA',
      'Persistência de dados de busca e interação',
      'Fluxo preparado para evolução da experiência do usuário',
    ],
    tecnologias: ['Flask', 'Python', 'JavaScript', 'Google Gemini', 'MongoDB', 'HTML', 'CSS'],
    galeria: [
        {
            src: './projetos/SkAI/skai1.png',
            alt: 'Tela inicial',
            caption: 'Chatbot integrado na tela home do sistema'
        },
        {
            src: './projetos/SkAI/skai2.png',
            alt: 'Tela home com busca convencional',
            caption: 'modo convencional'
        }
    ],
    aprendizados: [
      'A experiência conversacional precisa ser clara para não sobrecarregar o usuário.',
      'Integração entre IA e backend pede validação rigorosa de entradas e saídas.',
      'Modelagem simples facilita evolução futura do produto.',
    ],
    desafios: [
      'Conciliar respostas generativas com o comportamento esperado da API.',
      'Organizar o fluxo de compra sem perder simplicidade na navegação.',
    ],
    solucoes: [
      'Estruturação de prompts e respostas com foco em previsibilidade.',
      'Separação entre responsabilidade de chatbot, API e persistência.',
    ],
    melhorias: [
      'Adicionar trilha de auditoria.',
      'Integrar novos meios de pagamento e API de viagens.',
    ],
    arquitetura: 'Backend em Flask consumindo IA generativa e persistindo o histórico de interações em MongoDB.',
    creditos: [
      'Desenvolvido em parceria com os colaboradores do projeto: Raylan Santana, Lilia Rosa, Kauan Santos e Yasmin Cantanhede.',
    ],
    privado: false,
    links: [],
  },
  'assistente-virtual-viagens': {
    id: 'assistente-virtual-viagens',
    titulo: 'Mochi: Assistente Virtual de Viagens',
    categoria: 'Pessoal',
    status: 'Concluído',
    data: '2025',
    descricao: 'Agente de IA autônomo para criação de roteiros personalizados e consultas em tempo real, combinando geração de linguagem, orquestração de ferramentas e integração de viagens.',
    objetivo: 'Oferecer uma experiência de planejamento mais inteligente, com sugestões adaptadas ao perfil e às necessidades do viajante.',
    papel: 'Estruturação do agente, integração com APIs de viagem e refinamento da interação com o usuário.',
    funcionalidades: [
      'Geração de roteiros personalizados com IA',
      'Consulta em tempo real via APIs de viagem',
      'Recomendações adaptadas ao contexto da conversa',
      'Orquestração de etapas com LangChain',
    ],
    tecnologias: ['LangChain', 'Gemini IA', 'Amadeus API', 'Python'],
    galeria: [
        {
            src: './projetos/Mochi/mochi1.png',
            alt: 'Tela do sistema no vscode',
            caption: 'Inicio da conversa com o agente'
        },
        {
            src: './projetos/Mochi/mochi2.png',
            alt: 'Tela do sistema no vscode',
            caption: 'Retorno das passagens aéreas'
        }
    ],
    aprendizados: [
      'Agentes precisam de contexto bem delimitado para manter coerência.',
      'APIs externas exigem tratamento cuidadoso de limites e falhas.',
      'A composição de ferramentas muda a forma de pensar a arquitetura.',
    ],
    desafios: [
      'Evitar respostas genéricas demais em um cenário de planejamento.',
      'Gerenciar variabilidade de retorno das fontes externas.',
    ],
    solucoes: [
      'Prompting estruturado e validação das respostas recebidas.',
      'Fluxos de fallback quando dados de viagem não estão disponíveis.',
    ],
    melhorias: [
      'Adicionar perfil do viajante, banco de dados e front-end interativo.',
      'Expandir suporte a novas fontes de busca e comparação.',
    ],
    arquitetura: 'Agente com LangChain coordenando LLM, APIs de viagem e regras de apresentação da resposta.',
    privado: false,
    links: [],
  },
  'inscricao-residentes-estagiarios': {
    id: 'inscricao-residentes-estagiarios',
    titulo: 'Sistema de inscrição para residentes e estagiários',
    categoria: 'Profissional',
    status: 'Concluído',
    data: '2025-2026',
    descricao: 'Aplicação que automatiza o fluxo de candidatos, o upload de documentos e o envio de e-mails de confirmação, com painel administrativo e permissões por perfil.',
    objetivo: 'Centralizar o processo de inscrição e reduzir etapas manuais na gestão de candidatos.',
    papel: 'Desenvolvimento do fluxo de cadastro, interfaces de apoio e integração com o processo administrativo.',
    funcionalidades: [
      'Fluxo de inscrição guiado para candidatos',
      'Upload e validação de documentos',
      'Envio automático de e-mails de confirmação',
      'Painel administrativo com permissões por perfil',
    ],
    tecnologias: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'PostgreSQL'],
    galeria: [],
    aprendizados: [
      'Processos administrativos ganham eficiência com etapas simples e rastreáveis.',
      'Controle de acesso e validação de dados são críticos em sistemas públicos.',
      'O desenho do fluxo impacta diretamente a experiência do candidato.',
    ],
    desafios: [
      'Organizar permissões e estados do fluxo sem aumentar a complexidade da interface.',
      'Garantir integridade dos documentos enviados pelos candidatos.',
    ],
    solucoes: [
      'Separação de perfis e validações em camadas distintas.',
      'Confirmações automatizadas para reduzir dúvidas e inconsistências.',
    ],
    melhorias: [
      'Criar trilha completa de auditoria para o processo.',
      'Adicionar monitoramento de mensagens e documentos pendentes.',
    ],
    arquitetura: 'Aplicação Django com persistência em PostgreSQL, controle de perfis e automação de notificações.',
    privado: true,
    links: [],
  },
  'biblioteca-prompts': {
    id: 'biblioteca-prompts',
    titulo: 'Sistema de uma biblioteca de prompts',
    categoria: 'Profissional',
    status: 'Concluído',
    data: '2026',
    descricao: 'Plataforma de catálogo e gerenciamento de prompts. O sistema permite criar, favoritar e classificar prompts, além de copiar textos com variáveis dinâmicas e cadastro restrito por CPF.',
    objetivo: 'Organizar e reutilizar prompts de forma padronizada, com foco em produtividade e controle de acesso.',
    papel: 'Desenvolvimento da estrutura de catálogo, regras de acesso e interação com o banco de dados.',
    funcionalidades: [
      'Criação e edição de prompts catalogados',
      'Favoritos e classificação por uso',
      'Cópia com variáveis dinâmicas',
      'Cadastro restrito por CPF',
    ],
    tecnologias: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Docker', 'PostgreSQL', 'Docker'],
    galeria: [
      createArtwork({
        title: 'Biblioteca de Prompts',
        subtitle: 'Catálogo e produtividade com controle de acesso',
        accent: '#a78bfa',
        accent2: '#38bdf8',
        detail: 'Django • Docker • PostgreSQL',
      }),
    ],
    aprendizados: [
      'Catálogos vivos precisam de organização e curadoria desde a primeira versão.',
      'Regras de acesso influenciam diretamente a experiência do usuário final.',
      'A utilidade percebida cresce quando o fluxo de uso é muito direto.',
    ],
    desafios: [
      'Representar prompts variáveis sem comprometer a clareza.',
      'Restringir acesso por CPF mantendo a navegação simples.',
    ],
    solucoes: [
      'Normalização da estrutura dos prompts e regras de validação no backend.',
      'Separação entre catálogo público e áreas restritas do sistema.',
    ],
    melhorias: [
      'Adicionar métricas de uso e histórico de alterações.',
      'Permitir versionamento e colaboração em prompts compartilhados.',
    ],
    arquitetura: 'Aplicação Django com catálogo persistido em PostgreSQL, regras de acesso e automações de produtividade.',
    privado: false,
    links: [],
  },
};

window.projects = projects;
