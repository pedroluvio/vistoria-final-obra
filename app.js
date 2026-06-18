// ==========================================
// LUVIO VISTORIAS — CORE APPLICATION LOGIC
// ==========================================

const SECTION_ICONS = {
  'GERAL': '🏠', 'HALL': '🚪', 'COZINHA': '🍳', 'SALA': '🛋️',
  'QUARTO': '🛏️', 'INSTALAÇÃO SANITÁRIA': '🚿', 'DIVERSOS': '📋'
};

const TEMPLATE_SECTIONS = [
  {
    id: 'geral',
    name: 'GERAL',
    icon: '🏠',
    items: [
      { id: 'g0', group: '0 — Porta blindada / de entrada', items: [
        'Abre/fecha',
        'Acabamento interior da porta em conformidade com o projeto',
        'Acabamento exterior da porta em conformidade com as áreas comuns',
        'Fechadura fixa e em bom estado de funcionamento',
        'Fechadura tranca/destranca',
        'Remates interior/exterior em condições',
        'Visibilidade através do óculo',
        'Referência corresponds ao projeto',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'g1', group: '1 — Quadro eléctrico', items: [
        'Quadro abre/fecha',
        'Interruptor geral funciona',
        'Disjuntores funcionam',
        'Diferenciais funcionam',
        'Etiquetas nos disjuntores',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'g2', group: '2 — Termoacumulador / Esquentador', items: [
        'Liga/desliga',
        'Aquece água',
        'Fixação correta (com bucha química)',
        'Sem fugas',
        'Inclui todos os acessórios — tubo plástico para purga incluído',
        'Tomada elétrica acima da entrada de esgoto',
        'Referência corresponde ao projeto',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'g3', group: '3 — Chaves gerais', items: [
        '5 unidades — portas blindadas',
        'Abrem/fecham',
      ]},
      { id: 'g4', group: '4 — Unidades interiores de AVAC / Pré-instalação', items: [
        'Unidade interior com fixação adequada/ligações efetuadas',
        'Drenagem/esgoto da habitação',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'g5', group: '5 — Intercomunicador', items: [
        'Funcionamento do microfone',
        'Funcionamento do áudio',
        'Funcionamento de abertura de porta',
        'Campainha em funcionamento',
        'Referência corresponde ao projeto',
        'Aspeto estético geral em bom estado',
      ]},
    ]
  },
  {
    id: 'hall',
    name: 'HALL',
    icon: '🚪',
    items: [
      { id: 'h1', group: '1 — Armário Técnico', items: [
        'Acabamento da porta em conformidade com o projeto',
        'Portas abrem/fecham',
        'Portas têm batentes',
        'Afinação de portas em conformidade',
        'Instalação de dobradiças de portas em conformidade',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h2', group: '2 — Pavimento', items: [
        'Assentamento do pavimento de forma adequada (sem ressaltos)',
        'Sem peças danificadas',
        'Não existem manchas de obra',
        'Rodapé selado',
        'Referência corresponde ao projeto',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h3', group: '3 — Teto falso', items: [
        'Sem fissuras ou fendas',
        'Sem humidades',
        'Rebaixos verticais',
        'Sancas/molduras em bom estado',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h4', group: '4 — Portas interiores', items: [
        'Ferragens funcionam corretamente e em bom estado',
        'Batentes de porta colocados corretamente',
        'Guarnições colocadas corretamente',
        'Acabamentos correspondem ao projeto',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h5', group: '5 — Pintura', items: [
        'Pintura de paredes interiores com bom acabamento',
        'Não se observam manchas de humidade',
        'Não se observam manchas pontuais de sujidade',
        'Pintura homogénea',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h6', group: '6 — Unidades interiores de AVAC / Pré-instalação', items: [
        'Cablagem passada e inserida em caixa com tampa',
        'Esgoto de condensados efetuado',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h7', group: '7 — Vãos exteriores', items: [
        'Vão exterior com vidro conforme projeto',
        'Abre corretamente',
        'Fecha corretamente',
        'Estore sobe e baixa corretamente',
        'PVC selado no interior e exterior',
        'Acabamentos correspondem ao projeto',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h8', group: '8 — Eletricidade', items: [
        'Interruptores acendem e apagam',
        'Tomadas funcionam corretamente',
        'Aparelhagens bem fixas',
        'Aspeto estético geral em bom estado',
      ]},
      { id: 'h9', group: '9 — Iluminação', items: [
        'Pontos de luz funcionam corretamente',
        'Focos de halogénio funcionam corretamente',
        'LEDs funcionam corretamente',
        'Referência corresponde ao projeto',
      ]},
    ]
  },
  {
    id: 'cozinha',
    name: 'COZINHA',
    icon: '🍳',
    items: [
      { id: 'c1', group: '1 — Lava loiça', items: [
        'Torneira abre/fecha','Água aquece','Drenagem correta (sem fugas)',
        'Torneiras de segurança correctamente instaladas','Selado corretamente',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c2', group: '2 — Placa Vitrocerâmica', items: [
        'Liga/desliga','Aquece corretamente','Instalação correta',
        'Selado corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c3', group: '3 — Forno', items: [
        'Liga/desliga','Instalação correta','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c4', group: '4 — Exaustor', items: [
        'Extração funciona corretamente','Luzes liga/desliga','Instalação correta',
        'Filtros de carbono colocados','Tubo de extração colocado',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c5', group: '5 — Microondas', items: [
        'Liga/desliga','Aquece corretamente','Instalação correta',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c6', group: '6 — Máquina de lavar roupa', items: [
        'Liga/desliga','Torneiras de segurança correctamente instaladas',
        'Drenagem correta','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c7', group: '7 — Máquina de lavar loiça', items: [
        'Liga/desliga','Torneiras de segurança correctamente instaladas',
        'Drenagem correta','Porta bem instalada',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c8', group: '8 — Frigorífico Combinado', items: [
        'Liga/desliga','Portas bem instaladas','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c9', group: '9 — Tampo', items: [
        'Selado corretamente','Roda-tampo selado corretamente','Arestas polidas',
        'Fixação aos móveis','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c10', group: '10 — Módulos', items: [
        'Gavetas abrem/fecham (sem obstrução)','Portas abrem/fecham (sem obstrução)',
        'Dobradiças instaladas corretamente','Dimensão correcta dos nichos para os eletrodomésticos',
        'Dimensão correta do módulo de microondas','Dimensão correta do módulo de frigorífico',
        'Dimensões conforme projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c11', group: '11 — Revestimento cerâmico', items: [
        'Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c12', group: '12 — Pavimento', items: [
        'Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente',
        'Encontro com os paramentos verticais com bom acabamento',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c13', group: '13 — Teto falso', items: [
        'Sem fissuras ou fendas','Sem humidades','Rebaixos verticais',
        'Sancas/molduras em bom estado','Aspeto estético geral em bom estado',
      ]},
      { id: 'c14', group: '14 — Eletricidade', items: [
        'Interruptores acendem e apagam','Tomadas funcionam corretamente',
        'Aparelhagens correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c15', group: '15 — Iluminação', items: [
        'Pontos de luz funcionam corretamente','LEDs funcionam corretamente',
        'Caixas de derivação em bom estado','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c16', group: '16 — Torneiras de segurança', items: [
        'Abre/fecha a água','Acabamento em bom estado','Aspeto estético geral em bom estado',
      ]},
      { id: 'c17', group: '17 — Portas interiores', items: [
        'Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente',
        'Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c18', group: '18 — Vãos exteriores', items: [
        'Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente',
        'Estore sobe e baixa corretamente','PVC selado no interior e exterior',
        'Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 'c19', group: '19 — Pintura', items: [
        'Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade',
        'Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado',
      ]},
    ]
  },
  {
    id: 'sala',
    name: 'SALA',
    icon: '🛋️',
    items: [
      { id: 's1', group: '1 — Armário', items: [
        'Acabamento da porta em conformidade com o projeto','Portas abrem/fecham',
        'Portas têm batentes','Afinação de portas em conformidade',
        'Instalação de dobradiças de portas em conformidade','Instalação adequada de varões',
        'Bloco de gavetas abre/fecha','Aspeto estético geral em bom estado',
      ]},
      { id: 's2', group: '2 — Pavimento', items: [
        'Assentamento do pavimento de forma adequada (sem ressaltos)',
        'Sem peças danificadas','Não existem manchas de obra','Rodapé selado',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 's3', group: '3 — Teto falso', items: [
        'Sem fissuras ou fendas','Sem humidades','Rebaixos verticais',
        'Sancas/molduras em bom estado','Aspeto estético geral em bom estado',
      ]},
      { id: 's4', group: '4 — Portas interiores', items: [
        'Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente',
        'Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 's5', group: '5 — Pintura', items: [
        'Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade',
        'Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado',
      ]},
      { id: 's6', group: '6 — Unidades interiores de AVAC / Pré-instalação (Splits)', items: [
        'Cablagem passada e inserida em caixa com tampa',
        'Esgoto de condensados efetuado','Aspeto estético geral em bom estado',
      ]},
      { id: 's7', group: '7 — Vãos exteriores', items: [
        'Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente',
        'Estore sobe e baixa corretamente','PVC selado no interior e exterior',
        'Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 's8', group: '8 — Eletricidade', items: [
        'Interruptores acendem e apagam','Tomadas funcionam corretamente',
        'Aparelhagens bem fixas','Aspeto estético geral em bom estado',
      ]},
      { id: 's9', group: '9 — Iluminação', items: [
        'Pontos de luz funcionam corretamente','Focos de halogénio funcionam corretamente',
        'LEDs funcionam corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: 's10', group: '10 — Varanda', items: [
        'Pintura de paredes exteriores com bom acabamento','Pintura de paredes interiores com bom acabamento',
        'Não se observam manchas de humidade','Não se observam manchas pontuais de sujidade',
        'Pintura homogénea','Aspeto estético geral em bom estado',
      ]},
    ]
  },
];

function makeQuarto(n) {
  const q = `Q${n}`;
  return {
    id: `quarto${n}`,
    name: n === 1 ? 'QUARTO' : `QUARTO ${n}`,
    icon: '🛏️',
    items: [
      { id: `${q}1`, group: '1 — Armários', items: [
        'Acabamento da porta em conformidade com o projeto','Portas abrem/fecham',
        'Portas têm batentes','Afinação de portas em conformidade',
        'Instalação de dobradiças de portas em conformidade','Instalação adequada de varões',
        'Bloco de gavetas abre/fecha','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}2`, group: '2 — Pavimento', items: [
        'Assentamento do pavimento de forma adequada (sem ressaltos)',
        'Sem peças danificadas','Não existem manchas de obra','Rodapé selado',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}3`, group: '3 — Teto falso', items: [
        'Sem fissuras ou fendas','Sem humidades','Sancas/molduras em bom estado','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}4`, group: '4 — Portas interiores', items: [
        'Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente',
        'Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}5`, group: '5 — Pintura', items: [
        'Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade',
        'Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}6`, group: '6 — Unidades interiores de AVAC / Pré-instalação', items: [
        'Cablagem passada e inserida em caixa com tampa',
        'Esgoto de condensados efetuado','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}7`, group: '7 — Vãos exteriores', items: [
        'Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente',
        'Estore sobe e baixa corretamente','PVC selado no interior e exterior',
        'Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}8`, group: '8 — Eletricidade', items: [
        'Interruptores acendem e apagam','Tomadas funcionam corretamente',
        'Aparelhagens bem fixas','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}9`, group: '9 — Iluminação', items: [
        'Pontos de luz funcionam corretamente','Focos de halogénio funcionam corretamente',
        'LEDs funcionam corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
    ]
  };
}

function makeIS(n) {
  const q = `IS${n}`;
  return {
    id: `is${n}`,
    name: n === 1 ? 'INST. SANITÁRIA' : `INST. SANITÁRIA ${n}`,
    icon: '🚿',
    items: [
      { id: `${q}1`, group: '1 — Lavatórios', items: [
        'Torneira abre/fecha','Torneira bem fixa','Água aquece','Drenagem correta (sem fugas)',
        'Torneiras de segurança correctamente instaladas','Selado corretamente',
        'Corte na 1ª gaveta efetuado de forma correta','Todas as gavetas abrem/fecham',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}2`, group: '2 — Sanita', items: [
        'Autoclismo em bom estado de funcionamento','Tampo sobe e baixa corretamente',
        'Selado corretamente','Torneira de segurança instalada corretamente (abre/fecha)',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}3`, group: '3 — Base de duche', items: [
        'Monomando funciona correctamente','Torneira aberta (Água)','Água aquece',
        'Drenagem correta (sem fugas)','Kit de duche instalado corretamente na parede',
        'Selada corretamente','Referência corresponde ao projeto',
        'Aspeto estético geral da base, kit de duche e monocomando em bom estado',
      ]},
      { id: `${q}4`, group: '4 — Espelho', items: [
        'Posição e instalação corretas','Arestas polidas',
        'Luzes centradas com o lavatório acendem/apagam',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}5`, group: '5 — Resguardo de duche', items: [
        'Abre/fecha','Resguardo selado corretamente',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}6`, group: '6 — Toalheiro eléctrico', items: [
        'Liga/desliga','Instalado corretamente','Não impede a abertura de porta',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}7`, group: '7 — Revestimento cerâmico', items: [
        'Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}8`, group: '8 — Pavimento', items: [
        'Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente',
        'Encontro com os paramentos verticais com bom acabamento',
        'Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}9`, group: '9 — Teto falso', items: [
        'Sem fissuras ou fendas','Sem humidades','Rebaixos verticais',
        'Sancas de iluminação com bom acabamento','Sancas/molduras em bom estado','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}10`, group: '10 — Eletricidade', items: [
        'Interruptores acendem e apagam','Tomadas funcionam corretamente','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}11`, group: '11 — Iluminação', items: [
        'Pontos de luz funcionam corretamente','LEDs do espelho funcionam corretamente',
        'Referências correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}12`, group: '12 — Torneiras de segurança', items: [
        'Abre/fecha a água','Acabamento em bom estado','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}13`, group: '13 — Portas interiores', items: [
        'Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente',
        'Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}14`, group: '14 — Vãos exteriores', items: [
        'Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente',
        'Estore sobe e baixa corretamente','PVC selado no interior e exterior',
        'Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado',
      ]},
      { id: `${q}15`, group: '15 — Extrator eléctrico', items: [
        'Funciona correctamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado',
      ]},
    ]
  };
}

const DIVERSOS = {
  id: 'diversos',
  name: 'DIVERSOS',
  icon: '📋',
  items: [
    { id: 'div1', group: '1 — Manuais e garantias', items: [
      'Forno','Microondas','Placa vitrocerâmica','Exaustor',
      'AVAC','Termoacumulador / Caldeira','Máquina lavar loiça',
      'Máquina lavar roupa','Splits',
    ]},
    { id: 'div2', group: '2 — Limpeza / Lixo', items: [
      'Não há lixo, caixas ou restos de ferramentas no apartamento/prédio',
      'Os acessórios excedentes estão todos juntos numa única gaveta',
      'Obra limpa',
    ]},
    { id: 'div3', group: '3 — Estendal', items: [
      'Guias funcionam corretamente',
      'Fixação correta',
    ]},
  ]
};

// ════════════════════════════════════════
//  STATE
// ════════════════════════════════════════
let state = {
  sections: [],
  answers: {},
  obs: {},
  photos: {},
  header: {},
};

let counts = { quartos: 1, is: 1 };
let currentPhotoItemId = null;
let autoSaveIntervalId = null;

function adjustCount(key, delta) {
  const min = key === 'quartos' ? 0 : 0;
  const max = key === 'quartos' ? 6 : 4;
  counts[key] = Math.max(min, Math.min(max, counts[key] + delta));
  document.getElementById(`val-${key}`).textContent = counts[key];
}

function buildSections() {
  const sections = [...TEMPLATE_SECTIONS];
  for (let i = 1; i <= counts.quartos; i++) {
    sections.push(makeQuarto(i));
  }
  for (let i = 1; i <= counts.is; i++) {
    sections.push(makeIS(i));
  }
  sections.push(DIVERSOS);
  return sections;
}

function startAppWithGoogleDrive() {
  const codigo = document.getElementById('inp-codigo').value.trim();
  if (!codigo) {
    alert("Por favor, introduza o código do imóvel antes de iniciar.");
    return;
  }

  authenticateGoogle(async () => {
    const driveInfo = await setupImovelDriveStructure(codigo);
    if (driveInfo) {
      // 1. Inicializa o ecrã base da vistoria com os campos limpos
      initMainAppScreen();
      
      // 2. Tenta carregar dados existentes na Nuvem de forma automática
      try {
        const savedData = await loadSessionFromDrive(codigo);
        if (savedData && savedData.state) {
          // Restaura os contadores de divisões (quartos e instalações sanitárias)
          if (savedData.counts) {
            counts = savedData.counts;
            document.getElementById('val-quartos').textContent = counts.quartos;
            document.getElementById('val-is').textContent = counts.is;
            // Reconstrói a árvore de secções com base no número de divisões recuperadas
            state.sections = buildSections();
          }
          
          // Injeta as respostas, notas e mapeamento de fotos recuperados
          state.answers = savedData.state.answers || {};
          state.obs = savedData.state.obs || {};
          state.photos = savedData.state.photos || {};
          if (savedData.state.header) {
            state.header = savedData.state.header;
          }
          
          // Re-renderiza o ecrã com as cores correspondentes (Verde, Vermelho, Amarelo)
          renderSections();
          
          // Loop para aplicar as classes visuais corretas em cada card restaurado
          for (const id of Object.keys(state.answers)) {
            const card = document.getElementById(`ic-${id}`);
            if (card && state.answers[id]) {
              card.className = `item-card answered-${state.answers[id]}`;
              ['sim','nao','parcial','na'].forEach(v => {
                const optBtn = document.getElementById(`opt-${id}-${v}`);
                if (optBtn) optBtn.className = 'opt-btn' + (state.answers[id] === v ? ` active-${v}` : '');
              });
            }
            // Se existirem fotos registadas no JSON, desenha os polegares de nuvem provisórios
            if (state.photos[id] && state.photos[id].length > 0) {
              renderPhotoRow(id);
            }
          }
          
          updateProgress();
          showToast("✅ Sessão restaurada com sucesso!");
        }
      } catch (loadErr) {
        console.error("Erro no mapeamento do restauro:", loadErr);
      }
      
      // 3. Ativa o temporizador de gravação automática a cada 15 segundos
      startAutoSaveTimer();
    }
  });
}

function initMainAppScreen() {
  state.header = {
    codigo: document.getElementById('inp-codigo').value,
    morada: document.getElementById('inp-morada').value,
    empreiteiro: document.getElementById('inp-empreiteiro').value,
    rep: document.getElementById('inp-rep').value,
    data: document.getElementById('inp-data').value,
    tecnico: document.getElementById('inp-tecnico').value,
  };

  state.sections = buildSections();

  state.answers = {};
  state.obs = {};
  state.photos = {};
  for (const sec of state.sections) {
    for (const grp of sec.items) {
      for (let i = 0; i < grp.items.length; i++) {
        const id = `${grp.id}_${i}`;
        state.answers[id] = null;
        state.obs[id] = '';
        state.photos[id] = [];
      }
    }
  }

  document.getElementById('setup-screen').style.display = 'none';
  document.getElementById('app-screen').style.display = 'block';
  document.getElementById('header-morada').textContent = (state.header.codigo ? state.header.codigo + ' · ' : '') + (state.header.morada || '—');

  renderSections();
  updateProgress();
}

function startAutoSaveTimer() {
  if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);

  autoSaveIntervalId = setInterval(async () => {
    if (!state.header || !state.header.codigo) return;
    syncHeaderDOMToState();

    const stateWrapper = {
      state: { answers: state.answers, obs: state.obs, header: state.header, photos: state.photos },
      counts: counts,
      ts: Date.now()
    };

    await saveSessionToDrive(state.header.codigo, stateWrapper);
    
    const badge = document.getElementById('sync-status-badge');
    if (badge) {
      const agora = new Date().toLocaleTimeString('pt-PT', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
      badge.innerHTML = `<span style="width:6px; height:6px; background:#2a7a4b; border-radius:50%; display:inline-block"></span> Sincronizado: ${agora}`;
    }
  }, 15000);
}

function syncHeaderDOMToState() {
  if (document.getElementById('f-codigo')) {
    state.header.codigo = document.getElementById('f-codigo').value;
    state.header.morada = document.getElementById('f-morada').value;
    state.header.empreiteiro = document.getElementById('f-empreiteiro').value;
    state.header.rep = document.getElementById('f-rep').value;
    state.header.data = document.getElementById('f-data').value;
    state.header.tecnico = document.getElementById('f-tecnico').value;
  }
}

async function triggerManualDriveSave() {
  syncHeaderDOMToState();
  const stateWrapper = {
    state: { answers: state.answers, obs: state.obs, header: state.header, photos: state.photos },
    counts: counts,
    ts: Date.now()
  };
  showToast("A guardar no Google Drive...");
  await saveSessionToDrive(state.header.codigo, stateWrapper);
  showToast("Guardado com sucesso no Drive! 💾");
}

// ════════════════════════════════════════
//  RENDER ENGINE
// ════════════════════════════════════════
function renderSections() {
  const wrap = document.getElementById('sections-wrap');
  wrap.innerHTML = '';

  const cab = document.createElement('div');
  cab.className = 'cabecalho-card';
  cab.innerHTML = `
    <div class="cabecalho-header" onclick="toggleCabecalho()">
      <div class="section-icon">📋</div>
      <div class="section-info">
        <div class="section-name">Cabeçalho</div>
        <div class="section-meta"><span class="section-progress-text">Dados da vistoria</span></div>
      </div>
      <svg class="section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="cab-chev"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
    <div class="cabecalho-body" id="cabecalho-body">
      <div class="field-row">
        <div class="field-label">Código do Imóvel</div>
        <input class="field-input" id="f-codigo" value="${state.header.codigo || ''}" placeholder="Código do imóvel (ex: LV000)">
      </div>
      <div class="field-row">
        <div class="field-label">Morada</div>
        <input class="field-input" id="f-morada" value="${state.header.morada || ''}" placeholder="Morada do imóvel">
      </div>
      <div class="field-row">
        <div class="field-label">Empreiteiro</div>
        <input class="field-input" id="f-empreiteiro" value="${state.header.empreiteiro || ''}" placeholder="Empreiteiro">
      </div>
      <div class="field-row">
        <div class="field-label">Representante legal do empreiteiro</div>
        <input class="field-input" id="f-rep" value="${state.header.rep || ''}" placeholder="Representante legal">
      </div>
      <div class="field-row-2col">
        <div>
          <div class="field-label">Data</div>
          <input class="field-input" id="f-data" type="date" value="${state.header.data || ''}">
        </div>
        <div>
          <div class="field-label">Técnico</div>
          <input class="field-input" id="f-tecnico" value="${state.header.tecnico || 'Pedro Gonçalves'}">
        </div>
      </div>
    </div>
  `;
  wrap.appendChild(cab);

  for (const sec of state.sections) {
    const block = document.createElement('div');
    block.className = 'section-block';
    block.id = `sec-${sec.id}`;

    let total = 0;
    for (const grp of sec.items) total += grp.items.length;

    block.innerHTML = `
      <div class="section-header" onclick="toggleSection('${sec.id}')">
        <div class="section-icon">${sec.icon}</div>
        <div class="section-info">
          <div class="section-name">${sec.name}</div>
          <div class="section-meta">
            <span class="section-progress-text" id="sp-${sec.id}">0 / ${total}</span>
            <span class="section-badge" id="sb-${sec.id}">por verificar</span>
          </div>
        </div>
        <div class="section-done-tick"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
        <svg class="section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="section-body">
        <div class="section-body-inner" id="sb-body-${sec.id}">
          ${renderSectionBody(sec)}
        </div>
      </div>
    `;
    wrap.appendChild(block);
  }
}

function renderSectionBody(sec) {
  let html = '';
  for (const grp of sec.items) {
    html += `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px;padding:6px 0 2px;border-bottom:1px solid var(--border)">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted)">${grp.group}</span>
        <button class="group-na-btn" id="grp-na-${grp.id}" onclick="setGroupNA('${grp.id}',${grp.items.length})">N/A grupo</button>
      </div>`;
    for (let i = 0; i < grp.items.length; i++) {
      const id = `${grp.id}_${i}`;
      html += `
        <div class="item-card" id="ic-${id}">
          <div class="item-question">${grp.items[i]}</div>
          <div class="item-options">
            <button class="opt-btn" id="opt-${id}-sim" onclick="setAnswer('${id}','sim')">Sim</button>
            <button class="opt-btn" id="opt-${id}-nao" onclick="setAnswer('${id}','nao')">Não</button>
            <button class="opt-btn" id="opt-${id}-parcial" onclick="setAnswer('${id}','parcial')">Parcial</button>
            <button class="opt-btn" id="opt-${id}-na" onclick="setAnswer('${id}','na')">N/A</button>
          </div>
          <div class="item-obs-toggle" onclick="toggleObs('${id}')">
            <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span id="obs-toggle-label-${id}">Adicionar nota ou foto</span>
          </div>
          <div class="item-obs-wrap" id="obs-wrap-${id}">
            <textarea class="item-obs-area" id="obs-${id}" placeholder="Observações..." oninput="saveObs('${id}',this.value)"></textarea>
            <div class="photo-row" id="photo-row-${id}">
              <div class="photo-add-btn" onclick="addPhoto('${id}')">📸 Foto</div>
            </div>
          </div>
        </div>`;
    }
  }
  return html;
}

function setGroupNA(grpId, count) {
  const allNA = Array.from({length: count}, (_,i) => state.answers[`${grpId}_${i}`] === 'na').every(Boolean);
  const newVal = allNA ? null : 'na';

  for (let i = 0; i < count; i++) {
    const id = `${grpId}_${i}`;
    state.answers[id] = newVal;
    const card = document.getElementById(`ic-${id}`);
    if (card) card.className = 'item-card' + (newVal ? ` answered answered-${newVal}` : '');
    ['sim','nao','parcial','na'].forEach(v => {
      const btn = document.getElementById(`opt-${id}-${v}`);
      if (btn) btn.className = 'opt-btn' + (newVal === v ? ` active-${v}` : '');
    });
  }

  const grpBtn = document.getElementById(`grp-na-${grpId}`);
  if (grpBtn) grpBtn.classList.toggle('active', !allNA);

  let secId = null;
  for (const sec of state.sections) {
    if (sec.items.some(g => g.id === grpId)) { secId = sec.id; break; }
  }
  updateSectionStatus(secId);
  updateProgress();
}

function toggleCabecalho() {
  const body = document.getElementById('cabecalho-body');
  const chev = document.getElementById('cab-chev');
  const open = body.classList.toggle('is-open');
  chev.style.transform = open ? 'rotate(180deg)' : '';
}

function toggleSection(id) {
  const block = document.getElementById(`sec-${id}`);
  const wasOpen = block.classList.contains('is-open');
  document.querySelectorAll('.section-block.is-open').forEach(b => b.classList.remove('is-open'));
  if (!wasOpen) block.classList.add('is-open');
}

// ════════════════════════════════════════
//  ANSWERS
// ════════════════════════════════════════
function setAnswer(id, val) {
  const prev = state.answers[id];
  state.answers[id] = (prev === val) ? null : val;

  const card = document.getElementById(`ic-${id}`);
  card.className = 'item-card' + (state.answers[id] ? ` answered answered-${state.answers[id]}` : '');

  ['sim','nao','parcial','na'].forEach(v => {
    const btn = document.getElementById(`opt-${id}-${v}`);
    btn.className = 'opt-btn' + (state.answers[id] === v ? ` active-${v}` : '');
  });

  updateSectionStatus(getSectionIdFromItemId(id));
  updateProgress();
}

function saveObs(id, val) { state.obs[id] = val; }
function toggleObs(id) {
  const wrap = document.getElementById(`obs-wrap-${id}`);
  const label = document.getElementById(`obs-toggle-label-${id}`);
  const open = wrap.style.display === 'block';
  wrap.style.display = open ? 'none' : 'block';
  label.textContent = open ? 'Adicionar nota ou foto' : 'Fechar notas';
}

function getSectionIdFromItemId(itemId) {
  for (const sec of state.sections) {
    for (const grp of sec.items) {
      for (let i = 0; i < grp.items.length; i++) {
        if (`${grp.id}_${i}` === itemId) return sec.id;
      }
    }
  }
  return null;
}

function updateSectionStatus(secId) {
  if (!secId) return;
  const sec = state.sections.find(s => s.id === secId);
  if (!sec) return;

  let total = 0, answered = 0;
  for (const grp of sec.items) {
    for (let i = 0; i < grp.items.length; i++) {
      total++;
      if (state.answers[`${grp.id}_${i}`]) answered++;
    }
  }

  const block = document.getElementById(`sec-${secId}`);
  const spEl = document.getElementById(`sp-${secId}`);
  const sbEl = document.getElementById(`sb-${secId}`);

  spEl.textContent = `${answered} / ${total}`;
  const done = answered === total;
  block.classList.toggle('is-done', done);
  sbEl.textContent = done ? 'Completo ✓' : answered > 0 ? `${total - answered} por preencher` : 'por verificar';
}

function updateProgress() {
  let total = 0, answered = 0;
  let counts_ans = { sim: 0, nao: 0, parcial: 0, na: 0 };

  for (const [id, val] of Object.entries(state.answers)) {
    total++;
    if (val) { answered++; counts_ans[val]++; }
  }

  const pct = total > 0 ? (answered / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${answered} / ${total}`;
  document.getElementById('sum-sim').textContent = `✓ ${counts_ans.sim}`;
  document.getElementById('sum-nao').textContent = `✗ ${counts_ans.nao}`;
  document.getElementById('sum-parcial').textContent = `◑ ${counts_ans.parcial}`;
  document.getElementById('sum-na').textContent = `— ${counts_ans.na}`;
}

// ════════════════════════════════════════
//  PHOTOS ENGINE (Otimizada Binária)
// ════════════════════════════════════════
function addPhoto(itemId) {
  currentPhotoItemId = itemId;
  const modal = document.getElementById('photo-source-modal');
  modal.style.display = 'flex';
}

(function() {
  function closePhotoModal() { document.getElementById('photo-source-modal').style.display = 'none'; }
  function bindPhotoInput(inputId) {
    const fi = document.getElementById(inputId);
    fi.onchange = function(e) { handlePhotos(e); closePhotoModal(); };
    return fi;
  }
  document.getElementById('psm-camera').onclick = function() { const fi = bindPhotoInput('file-input-camera'); fi.value = ''; fi.click(); };
  document.getElementById('psm-gallery').onclick = function() { const fi = bindPhotoInput('file-input-gallery'); fi.value = ''; fi.click(); };
  document.getElementById('psm-cancel').onclick = closePhotoModal;
})();

async function handlePhotos(e) {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  const id = currentPhotoItemId;

  if (!photosFolderId) {
    alert("⚠️ Erro: Pasta do Google Drive não detetada. Reconecte a sessão.");
    return;
  }

  for (const file of files) {
    showToast(`A enviar ${file.name} para a Cloud...`);
    try {
      // Faz o upload direto e recebe o ID único do ficheiro na Google
      const driveFileId = await uploadPhotoToDrive(file, photosFolderId);
      
      state.photos[id] = state.photos[id] || [];
      // Guardamos apenas a referência no JSON
      state.photos[id].push({ id: driveFileId, name: file.name });
      
      renderPhotoRow(id);
    } catch (err) {
      console.error(err);
      showToast("❌ Erro ao enviar fotografia.");
    }
  }
  e.target.value = '';
}

function renderPhotoRow(id) {
  const row = document.getElementById(`photo-row-${id}`);
  row.innerHTML = '';
  (state.photos[id] || []).forEach((photo) => {
    const div = document.createElement('div');
    div.className = 'photo-thumb';
    div.style.background = '#e8f5ee';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.fontSize = '9px';
    div.style.border = '1px solid #2a7a4b';
    div.style.padding = '4px';
    div.style.color = '#2a7a4b';
    div.innerHTML = `<span style="word-break:break-all; text-align:center">☁️ ${photo.name}</span>`;
    row.appendChild(div);
  });
  const btn = document.createElement('div');
  btn.className = 'photo-add-btn';
  btn.onclick = () => addPhoto(id);
  btn.innerHTML = `📸`;
  row.appendChild(btn);
}

function openPhoto(src) {
  document.getElementById('photo-modal-img').src = src;
  document.getElementById('photo-modal').classList.add('open');
}
function closePhoto() { document.getElementById('photo-modal').classList.remove('open'); }
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

function exportSessionLocal() {
  const json = JSON.stringify({ state: { answers: state.answers, obs: state.obs, header: state.header, photos: state.photos }, counts: counts, ts: Date.now() });
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `backup_local_${state.header.codigo || 'vistoria'}.json`; a.click();
}

// ════════════════════════════════════════
//  MOTOR DE EXPORTAÇÃO DE RELATÓRIO PDF
// ════════════════════════════════════════
async function exportPDF() {
  showToast("🔄 A descarregar fotografias da Cloud e a estruturar PDF...");
  syncHeaderDOMToState();

  // 1. Abre os blocos de todas as secções para que o motor de impressão consiga ler os elementos ocultos
  document.querySelectorAll('.section-block').forEach(block => {
    block.classList.add('is-open');
  });

  // 2. Percorre todas as perguntas para localizar referências de fotos na cloud
  for (const [itemId, photosArray] of Object.entries(state.photos)) {
    if (photosArray && photosArray.length > 0) {
      const photoRowContainer = document.getElementById(`photo-row-${itemId}`);
      if (photoRowContainer) {
        // Limpa o indicador de nuvem provisório
        photoRowContainer.innerHTML = ''; 

        for (const photo of photosArray) {
          try {
            // Descarrega o conteúdo binário privado diretamente do Google Drive
            const driveResponse = await gapi.client.drive.files.get({
              fileId: photo.id,
              alt: 'media'
            });

            // Converte os bytes binários numa string Base64 temporária para exibição local no PDF
            const base64Url = `data:image/jpeg;base64,${btoa(driveResponse.body)}`;
            
            // Cria a tag de imagem estruturada com a regra de dimensionamento técnico
            const imgElement = document.createElement('img');
            imgElement.src = base64Url;
            imgElement.className = 'pdf-report-img';
            
            // Validação geométrica: Identifica se a foto é vertical ou horizontal para aplicar os 300px no lado menor
            imgElement.onload = function() {
              if (this.naturalHeight > this.naturalWidth) {
                this.classList.add('portrait'); // Aplica largura 300px se for vertical
              }
            };

            photoRowContainer.appendChild(imgElement);
          } catch (err) {
            console.error(`Falha ao renderizar a foto ${photo.name} no PDF:`, err);
          }
        }
      }
    }
  }

  // 3. Pequena pausa de 800ms para garantir que o processador gráfico do telemóvel/computador renderizou as imagens
  setTimeout(() => {
    showToast("💾 Relatório pronto!");
    window.print();
  }, 800);
}
