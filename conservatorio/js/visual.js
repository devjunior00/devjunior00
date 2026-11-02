/* Conservatório de Sopros — ilustrações dos instrumentos, descrição dos dedos em palavras e cartão da nota */
(function () {
  'use strict';
  let uid = 0;
  const LATAO = (id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6DE94"/><stop offset=".45" stop-color="#D9A441"/><stop offset="1" stop-color="#8F5E12"/></linearGradient>
    <linearGradient id="${id}p" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E9EDF2"/><stop offset=".5" stop-color="#B9C2CD"/><stop offset="1" stop-color="#7D8794"/></linearGradient>
    <linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A3F4B"/><stop offset=".5" stop-color="#1E222B"/><stop offset="1" stop-color="#0E1015"/></linearGradient></defs>`;
  const T = 'stroke="var(--tinta)" stroke-width="1.4" stroke-linejoin="round"';

  // cada desenho: [viewBox, corpo(id), rótulos [x, y, texto, xLinha, yLinha]]
  const DESENHOS = {
    sax: ['0 0 240 260', (g) => `
      <path d="M100 62 C100 36 86 24 64 25 L64 17 C92 15 116 28 114 62 Z" fill="url(#${g})" ${T}/>
      <rect x="40" y="14" width="26" height="14" rx="5" fill="url(#${g}m)" ${T}/>
      <path d="M100 62 L94 200 C94 250 176 250 176 205 L176 140 C176 126 196 116 200 104 L128 104 C136 116 152 126 152 140 L152 205 C152 226 122 226 122 200 L114 62 Z" fill="url(#${g})" ${T}/>
      <ellipse cx="164" cy="104" rx="36" ry="8" fill="url(#${g})" ${T}/><ellipse cx="164" cy="104" rx="28" ry="5" fill="#6B4510" opacity=".55"/>
      ${[80, 96, 112, 142, 158, 174].map((y, i) => `<circle cx="${107 + i * 0.6}" cy="${y}" r="5.5" fill="url(#${g}p)" ${T}/>`).join('')}
      <rect x="117" y="74" width="9" height="16" rx="4" fill="url(#${g}p)" ${T}/><rect x="86" y="150" width="8" height="18" rx="4" fill="url(#${g}p)" ${T}/>
      <path d="M126 190 C134 214 150 214 156 200" fill="none" stroke="#6B4510" stroke-width="1" opacity=".6"/>`,
      [[16, 44, 'boquilha', 50, 26], [60, 64, 'tudel', 86, 40], [12, 118, 'chaves', 102, 112], [196, 70, 'campana', 178, 100], [196, 238, 'curva', 160, 232], [42, 196, 'corpo', 96, 180]]],
    soprano: ['0 0 240 260', (g) => `
      <g transform="rotate(-28 120 130)">
        <rect x="113" y="6" width="14" height="20" rx="5" fill="url(#${g}m)" ${T}/>
        <path d="M114 26 L126 26 L134 214 L106 214 Z" fill="url(#${g})" ${T}/>
        <path d="M106 214 C104 232 96 240 86 246 L154 246 C144 240 136 232 134 214 Z" fill="url(#${g})" ${T}/>
        <ellipse cx="120" cy="246" rx="34" ry="6" fill="url(#${g})" ${T}/>
        ${[60, 78, 96, 130, 148, 166].map((y, i) => `<circle cx="${120 + (i % 2 ? 1 : 0)}" cy="${y}" r="5.5" fill="url(#${g}p)" ${T}/>`).join('')}
      </g>`, [[30, 30, 'boquilha', 74, 24], [12, 120, 'corpo reto', 92, 116], [182, 236, 'campana', 178, 214]]],
    clarinete: ['0 0 240 260', (g) => `
      <path d="M113 8 L127 8 L129 36 L111 36 Z" fill="url(#${g}m)" ${T}/>
      <rect x="109" y="36" width="22" height="20" rx="3" fill="url(#${g}m)" ${T}/>
      <rect x="111" y="56" width="18" height="160" fill="url(#${g}m)" ${T}/>
      <rect x="108" y="128" width="24" height="7" rx="2" fill="url(#${g}p)" ${T}/>
      <path d="M111 216 C110 236 100 246 90 252 L150 252 C140 246 130 236 129 216 Z" fill="url(#${g}m)" ${T}/>
      ${[70, 86, 102, 148, 164, 180].map((y) => `<circle cx="120" cy="${y}" r="5" fill="none" stroke="url(#${g}p)" stroke-width="2.4"/>`).join('')}
      ${[62, 112, 156, 192].map((y) => `<rect x="129" y="${y}" width="12" height="4" rx="2" fill="url(#${g}p)" ${T}/>`).join('')}
      <rect x="98" y="196" width="12" height="4" rx="2" fill="url(#${g}p)" ${T}/>`,
      [[60, 20, 'boquilha', 110, 20], [60, 48, 'barrilete', 108, 46], [178, 90, 'corpo superior', 132, 90], [178, 170, 'corpo inferior', 132, 170], [52, 132, 'junta', 108, 132], [178, 248, 'campana', 140, 244]]],
    flauta: ['0 0 240 200', (g) => `
      <g transform="rotate(-14 120 100)">
        <rect x="8" y="94" width="226" height="13" rx="6" fill="url(#${g}p)" ${T}/>
        <rect x="6" y="92" width="10" height="17" rx="4" fill="url(#${g}p)" ${T}/>
        <ellipse cx="42" cy="93" rx="11" ry="5" fill="url(#${g}p)" ${T}/><ellipse cx="42" cy="93" rx="4" ry="2" fill="var(--tinta)"/>
        <line x1="66" y1="92" x2="66" y2="109" stroke="var(--tinta)" stroke-width="1"/><line x1="196" y1="92" x2="196" y2="109" stroke="var(--tinta)" stroke-width="1"/>
        ${[96, 110, 124, 146, 160, 174].map((x) => `<circle cx="${x}" cy="94" r="5" fill="url(#${g}p)" ${T}/>`).join('')}
        ${[206, 216].map((x) => `<rect x="${x}" y="88" width="7" height="10" rx="3" fill="url(#${g}p)" ${T}/>`).join('')}
        <rect x="132" y="100" width="8" height="7" rx="3" fill="url(#${g}p)" ${T}/>
      </g>`, [[14, 52, 'bocal (cabeça)', 40, 88], [96, 42, 'corpo', 120, 86], [200, 50, 'pé', 206, 74], [40, 160, 'porta-lábio', 44, 104], [150, 150, 'chaves', 148, 102]]],
    trompete: ['0 0 240 200', (g) => `
      <path d="M14 92 L24 88 L24 100 L14 96 Z" fill="url(#${g}p)" ${T}/>
      <path d="M24 90 L104 90 L104 98 L24 98 Z" fill="url(#${g})" ${T}/>
      <path d="M146 112 L190 112 C200 112 214 96 232 80 L232 160 C214 142 200 126 190 126 L146 126 Z" fill="url(#${g})" ${T}/>
      <path d="M100 126 C60 126 46 128 40 140 C34 154 46 164 70 164 L104 164 L104 156 L70 156 C52 156 46 150 50 142 C54 134 64 134 100 134 Z" fill="url(#${g})" ${T}/>
      ${[0, 1, 2].map((i) => `<rect x="${104 + i * 14}" y="80" width="12" height="62" rx="3" fill="url(#${g})" ${T}/><rect x="${105 + i * 14}" y="66" width="10" height="14" rx="2" fill="url(#${g}p)" ${T}/><rect x="${103 + i * 14}" y="62" width="14" height="5" rx="2" fill="url(#${g}p)" ${T}/>`).join('')}
      <path d="M112 142 L112 176 L140 176 L140 142" fill="none" stroke="var(--tinta)" stroke-width="5"/><path d="M112 142 L112 176 L140 176 L140 142" fill="none" stroke="url(#${g})" stroke-width="3"/>
      <ellipse cx="232" cy="120" rx="6" ry="40" fill="url(#${g})" ${T}/>`,
      [[12, 70, 'bocal', 18, 88], [50, 60, 'tubo de entrada', 64, 88], [120, 36, 'pistos 1 · 2 · 3', 124, 60], [20, 186, 'bomba geral', 46, 158], [196, 186, 'campana', 222, 150]]],
    trombone: ['0 0 240 200', (g) => `
      <rect x="40" y="128" width="190" height="7" rx="3" fill="url(#${g})" ${T}/>
      <rect x="40" y="148" width="190" height="7" rx="3" fill="url(#${g})" ${T}/>
      <path d="M226 128 C242 128 242 155 226 155 L226 148 C234 148 234 135 226 135 Z" fill="url(#${g})" ${T}/>
      <rect x="40" y="124" width="10" height="35" rx="2" fill="url(#${g}p)" ${T}/><rect x="120" y="124" width="8" height="35" rx="2" fill="url(#${g}p)" ${T}/>
      <path d="M24 129 L34 126 L34 137 L24 134 Z" fill="url(#${g}p)" ${T}/>
      <path d="M44 148 C10 148 10 92 44 92 L120 92 C136 92 150 80 168 64 L168 140 C150 124 136 112 120 112 L44 112 C34 112 34 128 44 128 Z" fill="url(#${g})" ${T} transform="translate(0,0)"/>
      <ellipse cx="168" cy="102" rx="7" ry="38" fill="url(#${g})" ${T}/>`,
      [[6, 112, 'bocal', 26, 128], [80, 186, 'vara', 110, 156], [196, 52, 'campana', 170, 70], [6, 70, 'bomba de afinação', 22, 100], [120, 186, 'trava', 46, 160]]],
  };

  function ilustracao(sub, opts = {}) {
    const d = DESENHOS[sub] || DESENHOS.sax;
    const g = 'lt' + (++uid);
    const rot = opts.rotulos ? d[2].map(([x, y, t, lx, ly]) => `<line x1="${x + (x < 120 ? t.length * 3.1 : 0)}" y1="${y - 4}" x2="${lx}" y2="${ly}" stroke="var(--acento-texto)" stroke-width="1" stroke-dasharray="2 2"/><text x="${x}" y="${y}" font-size="11" font-weight="600" fill="var(--tinta)" ${x >= 120 ? '' : ''}>${t}</text>`).join('') : '';
    const vb = opts.rotulos ? (() => { const [x, y, w, h] = d[0].split(' ').map(Number); return `${x - 10} ${y} ${w + 80} ${h + 10}`; })() : d[0];
    return `<svg viewBox="${vb}" class="ilustra" role="img" aria-label="Ilustração do instrumento">${LATAO(g)}${d[1](g)}${rot}</svg>`;
  }

  // ---------- dedos em palavras ----------
  const PALAVRAS = {
    '1': ['esq', 'indicador'], '2': ['esq', 'médio'], '3': ['esq', 'anelar'], '4': ['dir', 'indicador'], '5': ['dir', 'médio'], '6': ['dir', 'anelar'],
    O: ['esq', 'polegar na chave de oitava'], T: ['esq', 'polegar tampando o furo de trás'], R: ['esq', 'polegar na chave de registro'],
    bis: ['esq', 'indicador também na chave bis (a pequena, entre o 1 e o 2)'], gs: ['esq', 'mínimo na chave de Sol♯'], csL: ['esq', 'mínimo na chave de Dó♯ grave'],
    b: ['esq', 'mínimo na chave de Si grave'], bb: ['esq', 'mínimo na chave de Si♭ grave'], ebR: ['dir', 'mínimo na chave de Mi♭'], cR: ['dir', 'mínimo na chave de Dó grave'],
    sC: ['dir', 'lateral do indicador na chave de Dó lateral'], sBb: ['dir', 'lateral do indicador na chave de Si♭ lateral'], sE: ['dir', 'lateral do indicador na chave de Mi agudo'],
    pD: ['esq', 'base do indicador na chave de palma do Ré'], pEb: ['esq', 'palma na chave de Mi♭ agudo'], pF: ['esq', 'palma na chave de Fá agudo'],
    fF: ['esq', 'indicador na chave de Fá de frente'], fs: ['dir', 'chave de Fá♯ agudo'],
    A: ['esq', 'indicador na chave de Lá'], Gs: ['esq', 'lateral do indicador na chave de Sol♯'],
    lE: ['esq', 'mínimo na chave Mi/Si'], lF: ['esq', 'mínimo na chave Fá/Dó'], lFs: ['esq', 'mínimo na chave Fá♯/Dó♯'], lCs: ['esq', 'mínimo na chave Dó♯/Sol♯'],
    rE: ['dir', 'mínimo na chave Mi/Si'], rF: ['dir', 'mínimo na chave Fá/Dó'], rFs: ['dir', 'mínimo na chave Fá♯/Dó♯'], rAb: ['dir', 'mínimo na chave Sol♯/Ré♯'],
    s1: ['dir', 'lateral do indicador na chave lateral 1'], s2: ['dir', 'lateral do indicador na chave lateral 2'], s3: ['dir', 'lateral do indicador na chave lateral 3'], s4: ['dir', 'lateral do indicador na chave lateral 4 (Mi♭/Si♭)'],
    // flauta
    fT: ['esq', 'polegar na chave de Si'], fTb: ['esq', 'polegar na alavanca de Si♭'], fGs: ['esq', 'mínimo na chave de Sol♯'], fEb: ['dir', 'mínimo na chave de Mi♭'],
    fCs: ['dir', 'mínimo no rolete de Dó♯ grave'], fC: ['dir', 'mínimo no rolete de Dó grave'], fTr1: ['dir', 'chave de trinado de Ré'], fTr2: ['dir', 'chave de trinado de Ré♯'],
  };
  function palavras(I, d) {
    if (I.sub === 'trompete') {
      if (d.texto.startsWith('solto')) return ['Nenhum pisto: todos soltos. A nota sai só com o ar e a vibração dos lábios.'];
      const nomes = { 1: 'indicador', 2: 'médio', 3: 'anelar' };
      return ['Mão direita: ' + d.k.split('').map((p) => `${nomes[p]} no pisto ${p}`).join(', ') + '.', 'Aperte até o fundo, com a ponta dos dedos.'];
    }
    if (I.sub === 'trombone') {
      const p = d.k[0];
      const onde = { 1: 'vara toda fechada (sem tocar no batente)', 2: 'cerca de 8 cm para fora', 3: 'um pouco antes da campana', 4: 'logo depois da campana', 5: 'cerca de um palmo depois da campana', 6: 'braço quase estendido', 7: 'braço todo estendido' }[p];
      return [`Braço direito: vara na ${p}ª posição — ${onde}.`, 'O ouvido confirma a afinação: ajuste a vara milímetros se precisar.'];
    }
    const esq = [], dir = [];
    d.k.forEach((c) => { const w = PALAVRAS[c]; if (w) (w[0] === 'esq' ? esq : dir).push(w[1]); });
    if (!esq.length && !dir.length) return ['Nenhuma chave: todos os dedos soltos, apoiados perto das chaves.'];
    const junta = (l) => (l.length > 1 ? l.slice(0, -1).join(', ') + ' e ' + l[l.length - 1] : l[0]);
    return [`Mão esquerda: ${esq.length ? junta(esq) : 'nenhum dedo'}.`, `Mão direita: ${dir.length ? junta(dir) : 'nenhum dedo'}.`];
  }

  window.Visual = { ilustracao, palavras, DESENHOS };
})();
