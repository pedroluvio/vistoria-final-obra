const SECTION_ICONS = { 'GERAL': '🏠', 'HALL': '🚪', 'COZINHA': '🍳', 'SALA': '🛋️', 'QUARTO': '🛏️', 'INSTALAÇÃO SANITÁRIA': '🚿', 'DIVERSOS': '📋' };
const TEMPLATE_SECTIONS = [
  { id: 'geral', name: 'GERAL', icon: '🏠', items: [
    { id: 'g0', group: '0 — Porta blindada / de entrada', items: ['Abre/fecha','Acabamento interior da porta em conformidade com o projeto','Acabamento exterior da porta em conformidade com as áreas comuns','Fechadura fixa e em bom estado de funcionamento','Fechadura tranca/destranca','Remates interior/exterior em condições','Visibilidade através do óculo','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'g1', group: '1 — Quadro eléctrico', items: ['Quadro abre/fecha','Interruptor geral funciona','Disjuntores funcionam','Diferenciais funcionam','Etiquetas nos disjuntores','Aspeto estético geral em bom estado'] },
    { id: 'g2', group: '2 — Termoacumulador / Esquentador', items: ['Liga/desliga','Aquece água','Fixação correta (com bucha química)','Sem fugas','Inclui todos os acessórios — tubo plástico para purga incluído','Tomada elétrica acima da entrada de esgoto','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'g3', group: '3 — Chaves gerais', items: ['5 unidades — portas blindadas','Abrem/fecham'] },
    { id: 'g4', group: '4 — Unidades interiores de AVAC / Pré-instalação', items: ['Unidade interior com fixação adequada/ligações efetuadas','Drenagem/esgoto da habitação','Aspeto estético geral em bom estado'] },
    { id: 'g5', group: '5 — Intercomunicador', items: ['Funcionamento do microfone','Funcionamento do áudio','Funcionamento de abertura de porta','Campainha em funcionamento','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] }
  ]},
  { id: 'hall', name: 'HALL', icon: '🚪', items: [
    { id: 'h1', group: '1 — Armário Técnico', items: ['Acabamento da porta em conformidade com o projeto','Portas abrem/fecham','Portas têm batentes','Afinação de portas em conformidade','Instalação de dobradiças de portas em conformidade','Aspeto estético geral em bom estado'] },
    { id: 'h2', group: '2 — Pavimento', items: ['Assentamento do pavimento de forma adequada (sem ressaltos)','Sem peças danificadas','Não existem manchas de obra','Rodapé selado','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'h3', group: '3 — Teto falso', items: ['Sem fissuras ou fendas','Sem humidades','Rebaixos verticais','Sancas/molduras em bom estado','Aspeto estético geral em bom estado'] },
    { id: 'h4', group: '4 — Portas interiores', items: ['Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente','Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'h5', group: '5 — Pintura', items: ['Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade','Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado'] },
    { id: 'h6', group: '6 — Unidades interiores de AVAC / Pré-instalação', items: ['Cablagem passada e inserida em caixa com tampa','Esgoto de condensados efetuado','Aspeto estético geral em bom estado'] },
    { id: 'h7', group: '7 — Vãos exteriores', items: ['Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente','Estore sobe e baixa corretamente','PVC selado no interior e exterior','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'h8', group: '8 — Eletricidade', items: ['Interruptores acendem e apagam','Tomadas funcionam corretamente','Aparelhagens bem fixas','Aspeto estético geral em bom estado'] },
    { id: 'h9', group: '9 — Iluminação', items: ['Pontos de luz funcionam corretamente','Focos de halogénio funcionam corretamente','LEDs funcionam corretamente','Referência corresponde ao projeto'] }
  ]},
  { id: 'cozinha', name: 'COZINHA', icon: '🍳', items: [
    { id: 'c1', group: '1 — Lava loiça', items: ['Torneira abre/fecha','Água aquece','Drenagem correta (sem fugas)','Torneiras de segurança correctamente instaladas','Selado corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c2', group: '2 — Placa Vitrocerâmica', items: ['Liga/desliga','Aquece corretamente','Instalação correta','Selado corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c3', group: '3 — Forno', items: ['Liga/desliga','Instalação correta','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c4', group: '4 — Exaustor', items: ['Extração funciona corretamente','Luzes liga/desliga','Instalação correta','Filtros de carbono colocados','Tubo de extração colocado','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c5', group: '5 — Microondas', items: ['Liga/desliga','Aquece corretamente','Instalação correta','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c6', group: '6 — Máquina de lavar roupa', items: ['Liga/desliga','Torneiras de segurança correctamente instaladas','Drenagem correta','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c7', group: '7 — Máquina de lavar loiça', items: ['Liga/desliga','Torneiras de segurança correctamente instaladas','Drenagem correta','Porta bem instalada','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c8', group: '8 — Frigorífico Combinado', items: ['Liga/desliga','Portas bem instaladas','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c9', group: '9 — Tampo', items: ['Selado corretamente','Roda-tampo selado corretamente','Arestas polidas','Fixação aos móveis','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c10', group: '10 — Módulos', items: ['Gavetas abrem/fecham (sem obstrução)','Portas abrem/fecham (sem obstrução)','Dobradiças instaladas corretamente','Dimensão correcta dos nichos para os eletrodomésticos','Dimensão correta do módulo de microondas','Dimensão correta do módulo de frigorífico','Dimensões conforme projeto','Aspeto estético geral em bom estado'] },
    { id: 'c11', group: '11 — Revestimento cerâmico', items: ['Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c12', group: '12 — Pavimento', items: ['Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente','Encontro com os paramentos verticais com bom acabamento','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c13', group: '13 — Teto falso', items: ['Sem fissuras ou fendas','Sem humidades','Rebaixos verticais','Sancas/molduras em bom estado','Aspeto estético geral em bom estado'] },
    { id: 'c14', group: '14 — Eletricidade', items: ['Interruptores acendem e apagam','Tomadas funcionam corretamente','Aparelhagens correspondem ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c15', group: '15 — Iluminação', items: ['Pontos de luz funcionam corretamente','LEDs funcionam corretamente','Caixas de derivação em bom estado','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c16', group: '16 — Torneiras de segurança', items: ['Abre/fecha a água','Acabamento em bom estado','Aspeto estético geral em bom estado'] },
    { id: 'c17', group: '17 — Portas interiores', items: ['Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente','Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c18', group: '18 — Vãos exteriores', items: ['Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente','Estore sobe e baixa corretamente','PVC selado no interior e exterior','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
    { id: 'c19', group: '19 — Pintura', items: ['Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade','Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado'] }
  ]},
  { id: 'sala', name: 'SALA', icon: '🛋️', items: [
    { id: 's1', group: '1 — Armário', items: ['Acabamento da porta em conformidade com o projeto','Portas abrem/fecham','Portas têm batentes','Afinação de portas em conformidade','Instalação de dobradiças de portas em conformidade','Instalação adequada de varões','Bloco de gavetas abre/fecha','Aspeto estético geral em bom estado'] },
    { id: 's2', group: '2 — Pavimento', items: ['Assentamento do pavimento de forma adequada (sem ressaltos)','Sem peças danificadas','Não existem manchas de obra','Rodapé selado','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 's3', group: '3 — Teto falso', items: ['Sem fissuras ou fendas','Sem humidades','Rebaixos verticais','Sancas/molduras em bom estado','Aspeto estético geral em bom estado'] },
    { id: 's4', group: '4 — Portas interiores', items: ['Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente','Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
    { id: 's5', group: '5 — Pintura', items: ['Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade','Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado'] },
    { id: 's6', group: '6 — Unidades interiores de AVAC / Pré-instalação (Splits)', items: ['Cablagem passada e inserida em caixa com tampa','Esgoto de condensados efetuado','Aspeto estético geral em bom estado'] },
    { id: 's7', group: '7 — Vãos exteriores', items: ['Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente','Estore sobe e baixa corretamente','PVC selado no interior e exterior','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
    { id: 's8', group: '8 — Eletricidade', items: ['Interruptores acendem e apagam','Tomadas funcionam corretamente','Aparelhagens bem fixas','Aspeto estético geral em bom estado'] },
    { id: 's9', group: '9 — Iluminação', items: ['Pontos de luz funcionam corretamente','Focos de halogénio funcionam corretamente','LEDs funcionam corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
    { id: 's10', group: '10 — Varanda', items: ['Pintura de paredes exteriores com bom acabamento','Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade','Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado'] }
  ]}
];

function makeQuarto(n) { const q = `Q${n}`; return { id: `quarto${n}`, name: n===1?'QUARTO':`QUARTO ${n}`, icon: '🛏️', items: [
  { id: `${q}1`, group: '1 — Armários', items: ['Acabamento da porta em conformidade com o projeto','Portas abrem/fecham','Portas têm batentes','Afinação de portas em conformidade','Instalação de dobradiças de portas em conformidade','Instalação adequada de varões','Bloco de gavetas abre/fecha','Aspeto estético geral em bom estado'] },
  { id: `${q}2`, group: '2 — Pavimento', items: ['Assentamento do pavimento de forma adequada (sem ressaltos)','Sem peças danificadas','Não existem manchas de obra','Rodapé selado','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}3`, group: '3 — Teto falso', items: ['Sem fissuras ou fendas','Sem humidades','Sancas/molduras em bom estado','Aspeto estético geral em bom estado'] },
  { id: `${q}4`, group: '4 — Portas interiores', items: ['Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente','Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}5`, group: '5 — Pintura', items: ['Pintura de paredes interiores com bom acabamento','Não se observam manchas de humidade','Não se observam manchas pontuais de sujidade','Pintura homogénea','Aspeto estético geral em bom estado'] },
  { id: `${q}6`, group: '6 — Unidades interiores de AVAC / Pré-instalação', items: ['Cablagem passada e inserida em caixa com tampa','Esgoto de condensados efetuado','Aspeto estético geral em bom estado'] },
  { id: `${q}7`, group: '7 — Vãos exteriores', items: ['Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente','Estore sobe e baixa corretamente','PVC selado no interior e exterior','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}8`, group: '8 — Eletricidade', items: ['Interruptores acendem e apagam','Tomadas funcionam corretamente','Aparelhagens bem fixas','Aspeto estético geral em bom estado'] },
  { id: `${q}9`, group: '9 — Iluminação', items: ['Pontos de luz funcionam corretamente','Focos de halogénio funcionam corretamente','LEDs funcionam corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] }
]};}

function makeIS(n) { const q = `IS${n}`; return { id: `is${n}`, name: n===1?'INST. SANITÁRIA':`INST. SANITÁRIA ${n}`, icon: '🚿', items: [
  { id: `${q}1`, group: '1 — Lavatórios', items: ['Torneira abre/fecha','Torneira bem fixa','Água aquece','Drenagem correta (sem fugas)','Torneiras de segurança correctamente instaladas','Selado corretamente','Corte na 1ª gaveta efetuado de forma correta','Todas as gavetas abrem/fecham','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}2`, group: '2 — Sanita', items: ['Autoclismo em bom estado de funcionamento','Tampo sobe e baixa corretamente','Selado corretamente','Torneira de segurança instalada corretamente (abre/fecha)','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}3`, group: '3 — Base de duche', items: ['Monomando funciona correctamente','Torneira aberta (Água)','Água aquece','Drenagem correta (sem fugas)','Kit de duche instalado corretamente na parede','Selada corretamente','Referência corresponde ao projeto','Aspeto estético geral da base, kit de duche e monocomando em bom estado'] },
  { id: `${q}4`, group: '4 — Espelho', items: ['Posição e instalação corretas','Arestas polidas','Luzes centradas com o lavatório acendem/apagam','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}5`, group: '5 — Resguardo de duche', items: ['Abre/fecha','Resguardo selado corretamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}6`, group: '6 — Toalheiro eléctrico', items: ['Liga/desliga','Instalado corretamente','Não impede a abertura de porta','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}7`, group: '7 — Revestimento cerâmico', items: ['Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}8`, group: '8 — Pavimento', items: ['Sem peças danificadas','Sem manchas de obra','Juntas betumadas correctamente','Encontro com os paramentos verticais com bom acabamento','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}9`, group: '9 — Teto falso', items: ['Sem fissuras ou fendas','Sem humidades','Rebaixos verticais','Sancas de iluminação com bom acabamento','Sancas/molduras em bom estado','Aspeto estético geral em bom estado'] },
  { id: `${q}10`, group: '10 — Eletricidade', items: ['Interruptores acendem e apagam','Tomadas funcionam corretamente','Aspeto estético geral em bom estado'] },
  { id: `${q}11`, group: '11 — Iluminação', items: ['Pontos de luz funcionam corretamente','LEDs do espelho funcionam corretamente','Referências correspondem ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}12`, group: '12 — Torneiras de segurança', items: ['Abre/fecha a água','Acabamento em bom estado','Aspeto estético geral em bom estado'] },
  { id: `${q}13`, group: '13 — Portas interiores', items: ['Ferragens funcionam corretamente e em bom estado','Batentes de porta colocados corretamente','Guarnições colocadas corretamente','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}14`, group: '14 — Vãos exteriores', items: ['Vão exterior com vidro conforme projeto','Abre corretamente','Fecha corretamente','Estore sobe e baixa corretamente','PVC selado no interior e exterior','Acabamentos correspondem ao projeto','Aspeto estético geral em bom estado'] },
  { id: `${q}15`, group: '15 — Extrator eléctrico', items: ['Funciona correctamente','Referência corresponde ao projeto','Aspeto estético geral em bom estado'] }
]};}

const DIVERSOS = { id: 'diversos', name: 'DIVERSOS', icon: '📋', items: [
  { id: 'div1', group: '1 — Manuais e garantias', items: ['Forno','Microondas','Placa vitrocerâmica','Exaustor','AVAC','Termoacumulador / Caldeira','Máquina lavar loiça','Máquina lavar roupa','Splits'] },
  { id: 'div2', group: '2 — Limpeza / Lixo', items: ['Não há lixo, caixas ou restos de ferramentas no apartamento/prédio','Os acessórios excedentes estão todos juntos numa única gaveta','Obra limpa'] },
  { id: 'div3', group: '3 — Estendal', items: ['Guias funcionam corretamente','Fixação correta'] }
]};

let state = { sections: [], answers: {}, obs: {}, photos: {}, header: {} };
let counts = { quartos: 1, is: 1 }, currentPhotoItemId = null, autoSaveIntervalId = null;

function adjustCount(key, delta) { counts[key] = Math.max(0, Math.min(key === 'quartos' ? 6 : 4, counts[key] + delta)); document.getElementById(`val-${key}`).textContent = counts[key]; }
function buildSections() { const s = [...TEMPLATE_SECTIONS]; for(let i=1;i<=counts.quartos;i++) s.push(makeQuarto(i)); for(let i=1;i<=counts.is;i++) s.push(makeIS(i)); s.push(DIVERSOS); return s; }

function startAppWithGoogleDrive() {
  const codigo = document.getElementById('inp-codigo').value.trim();
  if (!codigo) { alert("Introduza o código do imóvel."); return; }
  authenticateGoogle(async () => {
    const driveInfo = await setupImovelDriveStructure(codigo);
    if (driveInfo) {
      const loaded = await loadSessionFromDrive(codigo);
      if (loaded && loaded.state) {
        counts = loaded.counts || counts;
        state = loaded.state;
        state.sections = buildSections();
        showToast("Sessão da Nuvem Restaurada!");
      } else {
        state.header = { codigo, morada: document.getElementById('inp-morada').value, empreiteiro: document.getElementById('inp-empreiteiro').value, rep: document.getElementById('inp-rep').value, data: document.getElementById('inp-data').value, tecnico: document.getElementById('inp-tecnico').value };
        state.sections = buildSections();
        state.sections.forEach(sec => sec.items.forEach(grp => grp.items.forEach((_, i) => { const id = `${grp.id}_${i}`; state.answers[id] = null; state.obs[id] = ''; state.photos[id] = []; })));
      }
      document.getElementById('setup-screen').style.display = 'none'; document.getElementById('app-screen').style.display = 'block';
      document.getElementById('header-morada').textContent = `${state.header.codigo} · ${state.header.morada || ''}`;
      renderSections(); restoreUIState(); startAutoSaveTimer();
    }
  });
}

function importSessionLocal(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.state) {
        counts = data.counts || counts; state = data.state; state.sections = buildSections();
        document.getElementById('setup-screen').style.display = 'none'; document.getElementById('app-screen').style.display = 'block';
        document.getElementById('header-morada').textContent = `${state.header.codigo} · ${state.header.morada || ''}`;
        renderSections(); restoreUIState(); showToast("Backup local restaurado.");
      }
    } catch(err) { alert("Erro ao ler JSON."); }
  };
  reader.readAsText(file);
}

function restoreUIState() {
  for (const id of Object.keys(state.answers)) {
    if (state.answers[id]) {
      const card = document.getElementById(`ic-${id}`);
      if (card) { card.className = `item-card answered-${state.answers[id]}`; document.getElementById(`opt-${id}-${state.answers[id]}`).classList.add(`active-${state.answers[id]}`); }
    }
    if (state.photos[id] && state.photos[id].length > 0) renderPhotoRow(id);
    const wrap = document.getElementById(`obs-wrap-${id}`);
    if (wrap && state.obs[id]) document.getElementById(`obs-${id}`).value = state.obs[id];
  }
  state.sections.forEach(s => updateSectionStatus(s.id)); updateProgress();
}

function startAutoSaveTimer() {
  if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);
  autoSaveIntervalId = setInterval(async () => {
    if (!state.header || !state.header.codigo) return;
    syncHeaderDOMToState();
    await saveSessionToDrive(state.header.codigo, { state, counts, ts: Date.now() });
    const b = document.getElementById('sync-status-badge');
    if (b) b.innerHTML = `<span style="width:6px;height:6px;background:#2a7a4b;border-radius:50%;display:inline-block"></span> Sincronizado: ${new Date().toLocaleTimeString('pt-PT')}`;
  }, 15000);
}

function syncHeaderDOMToState() {
  if (document.getElementById('f-codigo')) {
    state.header.codigo = document.getElementById('f-codigo').value; state.header.morada = document.getElementById('f-morada').value;
    state.header.empreiteiro = document.getElementById('f-empreiteiro').value; state.header.rep = document.getElementById('f-rep').value;
    state.header.data = document.getElementById('f-data').value; state.header.tecnico = document.getElementById('f-tecnico').value;
  }
}

function renderSections() {
  const wrap = document.getElementById('sections-wrap'); wrap.innerHTML = '';
  const cab = document.createElement('div'); cab.className = 'cabecalho-card';
  cab.innerHTML = `<div class="cabecalho-header" onclick="document.getElementById('cabecalho-body').classList.toggle('is-open')"><div class="section-icon">📋</div><div class="section-info"><div class="section-name">Cabeçalho</div></div></div><div class="cabecalho-body" id="cabecalho-body"><div class="field-row"><div class="field-label">Código</div><input class="field-input" id="f-codigo" value="${state.header.codigo || ''}"></div><div class="field-row"><div class="field-label">Morada</div><input class="field-input" id="f-morada" value="${state.header.morada || ''}"></div><div class="field-row"><div class="field-label">Empreiteiro</div><input class="field-input" id="f-empreiteiro" value="${state.header.empreiteiro || ''}"></div><div class="field-row"><div class="field-label">Representante</div><input class="field-input" id="f-rep" value="${state.header.rep || ''}"></div><div class="field-row-2col"><div><div class="field-label">Data</div><input class="field-input" id="f-data" type="date" value="${state.header.data || ''}"></div><div><div class="field-label">Técnico</div><input class="field-input" id="f-tecnico" value="${state.header.tecnico || ''}"></div></div></div>`;
  wrap.appendChild(cab);

  state.sections.forEach(sec => {
    const block = document.createElement('div'); block.className = 'section-block'; block.id = `sec-${sec.id}`;
    let tot = sec.items.reduce((acc, grp) => acc + grp.items.length, 0);
    block.innerHTML = `<div class="section-header" onclick="document.getElementById('sec-${sec.id}').classList.toggle('is-open')"><div class="section-icon">${sec.icon}</div><div class="section-info"><div class="section-name">${sec.name}</div><div class="section-meta"><span class="section-progress-text" id="sp-${sec.id}">0 / ${tot}</span><span class="section-badge" id="sb-${sec.id}">por verificar</span></div></div></div><div class="section-body"><div class="section-body-inner">${renderSectionBody(sec)}</div></div>`;
    wrap.appendChild(block);
  });
}

function renderSectionBody(sec) {
  return sec.items.map(grp => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)"><span style="font-size:11px;font-weight:700">${grp.group}</span><button class="group-na-btn" onclick="setGroupNA('${grp.id}',${grp.items.length})">N/A grupo</button></div>` + grp.items.map((it, i) => {
    const id = `${grp.id}_${i}`;
    return `<div class="item-card" id="ic-${id}"><div class="item-question">${it}</div><div class="item-options"><button class="opt-btn" id="opt-${id}-sim" onclick="setAnswer('${id}','sim')">Sim</button><button class="opt-btn" id="opt-${id}-nao" onclick="setAnswer('${id}','nao')">Não</button><button class="opt-btn" id="opt-${id}-parcial" onclick="setAnswer('${id}','parcial')">Parcial</button><button class="opt-btn" id="opt-${id}-na" onclick="setAnswer('${id}','na')">N/A</button></div><div class="item-obs-toggle" onclick="document.getElementById('obs-wrap-${id}').style.display=document.getElementById('obs-wrap-${id}').style.display==='block'?'none':'block'">📝 Notas/Fotos</div><div class="item-obs-wrap" id="obs-wrap-${id}"><textarea class="item-obs-area" id="obs-${id}" oninput="state.obs['${id}']=this.value"></textarea><div class="photo-row" id="photo-row-${id}"><div class="photo-add-btn" onclick="addPhoto('${id}')">📸</div></div></div></div>`;
  }).join('')).join('');
}

function setAnswer(id, val) {
  state.answers[id] = state.answers[id] === val ? null : val;
  document.getElementById(`ic-${id}`).className = 'item-card' + (state.answers[id] ? ` answered-${state.answers[id]}` : '');
  ['sim','nao','parcial','na'].forEach(v => document.getElementById(`opt-${id}-${v}`).className = 'opt-btn' + (state.answers[id] === v ? ` active-${v}` : ''));
  updateSectionStatus(getSectionId(id)); updateProgress();
}

function setGroupNA(grpId, count) {
  const allNA = Array.from({length: count}, (_,i) => state.answers[`${grpId}_${i}`] === 'na').every(Boolean);
  for (let i=0; i<count; i++) setAnswer(`${grpId}_${i}`, allNA ? state.answers[`${grpId}_${i}`] : 'na');
}

function getSectionId(itemId) { return state.sections.find(s => s.items.some(g => itemId.startsWith(g.id)))?.id; }
function updateSectionStatus(secId) {
  if (!secId) return; const sec = state.sections.find(s => s.id === secId);
  let tot = 0, ans = 0; sec.items.forEach(g => g.items.forEach((_, i) => { tot++; if (state.answers[`${g.id}_${i}`]) ans++; }));
  document.getElementById(`sp-${secId}`).textContent = `${ans} / ${tot}`; document.getElementById(`sec-${secId}`).classList.toggle('is-done', ans === tot);
}
function updateProgress() {
  let tot = 0, ans = 0, c = { sim: 0, nao: 0, parcial: 0, na: 0 };
  Object.values(state.answers).forEach(v => { tot++; if(v){ ans++; c[v]++; } });
  document.getElementById('progress-fill').style.width = tot ? (ans/tot)*100+'%' : '0%'; document.getElementById('progress-label').textContent = `${ans} / ${tot}`;
  ['sim','nao','parcial','na'].forEach(v => document.getElementById(`sum-${v}`).textContent = `${v==='sim'?'✓':v==='nao'?'✗':v==='parcial'?'◑':'—'} ${c[v]}`);
}

function addPhoto(id) { currentPhotoItemId = id; document.getElementById('photo-source-modal').style.display = 'flex'; }
document.getElementById('psm-camera').onclick = () => { const f = document.getElementById('file-input-camera'); f.onchange=handlePhotos; f.click(); document.getElementById('photo-source-modal').style.display='none'; }
document.getElementById('psm-gallery').onclick = () => { const f = document.getElementById('file-input-gallery'); f.onchange=handlePhotos; f.click(); document.getElementById('photo-source-modal').style.display='none'; }

async function handlePhotos(e) {
  for (const file of Array.from(e.target.files)) {
    showToast(`Upload: ${file.name}`);
    try {
      const id = await uploadPhotoToDrive(file, photosFolderId);
      state.photos[currentPhotoItemId].push({ id, name: file.name }); renderPhotoRow(currentPhotoItemId);
    } catch(e) { showToast("Erro."); }
  } e.target.value = '';
}
function renderPhotoRow(id) {
  const row = document.getElementById(`photo-row-${id}`); row.innerHTML = '';
  state.photos[id].forEach(p => { const d = document.createElement('div'); d.className='photo-thumb'; d.innerHTML=`<span style="font-size:9px">☁️ ${p.name}</span>`; row.appendChild(d); });
  const b = document.createElement('div'); b.className='photo-add-btn'; b.onclick=()=>addPhoto(id); b.textContent='+'; row.appendChild(b);
}
function showToast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }
function exportSessionLocal() { const b = new Blob([JSON.stringify({state,counts,ts:Date.now()})],{type:'application/json'}); const a = document.createElement('a'); a.href=URL.createObjectURL(b); a.download='backup.json'; a.click(); }

// CORREÇÃO: Utiliza Fetch (getPhotoDataUrl) seguro para não quebrar PDF
async function exportPDF() {
  showToast("A descarregar imagens..."); syncHeaderDOMToState();
  document.querySelectorAll('.section-block').forEach(b => b.classList.add('is-open'));
  for (const [id, photos] of Object.entries(state.photos)) {
    if (photos.length > 0) {
      const row = document.getElementById(`photo-row-${id}`); row.innerHTML = '';
      for (const p of photos) {
        try {
          const base64Url = await getPhotoDataUrl(p.id);
          const img = document.createElement('img'); img.src = base64Url; img.className = 'pdf-report-img';
          img.onload = function() { if (this.naturalHeight > this.naturalWidth) this.classList.add('portrait'); };
          row.appendChild(img);
        } catch(e){}
      }
    }
  }
  setTimeout(() => window.print(), 1000);
}

function exportAutoRececao() {
  syncHeaderDOMToState(); let falhas = [];
  for (const [id, val] of Object.entries(state.answers)) if (val==='nao' || val==='parcial') falhas.push(`<li>Anomalia no item: ${id} - ${state.obs[id]||'Sem notas'}</li>`);
  const html = `<div style="padding:40px;font-family:sans-serif"><h2>AUTO DE RECEÇÃO</h2><p>Data: ${state.header.data} | Obra: ${state.header.morada}</p><p>Inconformidades:</p><ul>${falhas.length?falhas.join(''):'<li>Nenhuma.</li>'}</ul></div>`;
  const f = document.getElementById('print-frame').contentWindow; f.document.open(); f.document.write(html); f.document.close(); setTimeout(() => f.print(), 500);
}