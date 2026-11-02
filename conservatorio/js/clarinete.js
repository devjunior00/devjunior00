/* Dedilhados do clarinete em Si♭ (sistema Boehm), notas ESCRITAS de Mi3 a Dó6.
   Conferidos com The Woodwind Fingering Guide (wfg.woodwind.org, dedilhados básicos). */
(function () {
  'use strict';
  const L = ['T', '1', '2', '3'], R = ['4', '5', '6'];
  const tab = {
    52: { k: [...L, 'lE', ...R], alts: [{ k: [...L, ...R, 'rE'], nota: 'Mi/Si com o mínimo direito' }], obs: 'Mi grave: a nota mais grave do clarinete. Todos os furos bem tampados — qualquer vazamento faz a nota guinchar.' },
    53: { k: [...L, ...R, 'rF'], alts: [{ k: [...L, 'lF', ...R], nota: 'Fá/Dó com o mínimo esquerdo' }] },
    54: { k: [...L, 'lFs', ...R], alts: [{ k: [...L, ...R, 'rFs'], nota: 'Fá♯/Dó♯ com o mínimo direito' }] },
    55: { k: [...L, ...R] },
    56: { k: [...L, ...R, 'rAb'] },
    57: { k: [...L, '4', '5'] },
    58: { k: [...L, '4'] },
    59: { k: [...L, '5'], obs: 'Si grave: só o dedo médio da mão direita. É um dedilhado em “forquilha”.' },
    60: { k: [...L] },
    61: { k: [...L, 'lCs'] },
    62: { k: ['T', '1', '2'] },
    63: { k: ['T', '1', '2', 's4'], obs: 'Mi♭/Ré♯: chave lateral 4 (Mi♭/Si♭) com a lateral do indicador direito.' },
    64: { k: ['T', '1'] },
    65: { k: ['T'] },
    66: { k: ['1'], obs: 'Fá♯: polegar SOLTO, só o dedo 1.' },
    67: { k: [], obs: 'Sol solto (garganta): nenhum dedo. Mantenha as mãos em posição, perto dos furos.' },
    68: { k: ['Gs'], obs: 'Sol♯: chave de Sol♯ com a lateral do indicador esquerdo.' },
    69: { k: ['A'], obs: 'Lá: chave de Lá com o indicador esquerdo. Para cruzar o “registro” (Lá → Si), deixe os dedos da mão direita já abaixados (dedos “fechados”).' },
    70: { k: ['R', 'A'], obs: 'Si♭ (garganta): registro + chave de Lá. Som tende a ficar fraco; os dedos da mão direita podem ficar abaixados para dar estabilidade.' },
    71: { k: ['R', ...L, 'lE', ...R], alts: [{ k: ['R', ...L, ...R, 'rE'], nota: 'Mi/Si com o mínimo direito' }], obs: 'Si médio: início do registro clarim (uma 12ª acima do Mi grave). É a passagem mais difícil para iniciantes: tampe tudo e sopre com velocidade.' },
    72: { k: ['R', ...L, ...R, 'rF'], alts: [{ k: ['R', ...L, 'lF', ...R], nota: 'Fá/Dó com o mínimo esquerdo' }] },
    73: { k: ['R', ...L, 'lFs', ...R], alts: [{ k: ['R', ...L, ...R, 'rFs'], nota: 'Fá♯/Dó♯ com o mínimo direito' }] },
    74: { k: ['R', ...L, ...R] },
    75: { k: ['R', ...L, ...R, 'rAb'] },
    76: { k: ['R', ...L, '4', '5'] },
    77: { k: ['R', ...L, '4'] },
    78: { k: ['R', ...L, '5'] },
    79: { k: ['R', ...L] },
    80: { k: ['R', ...L, 'lCs'] },
    81: { k: ['R', 'T', '1', '2'] },
    82: { k: ['R', 'T', '1', '2', 's4'] },
    83: { k: ['R', 'T', '1'] },
    84: { k: ['R', 'T'], obs: 'Dó agudo: polegar + registro. Notas acima daqui (altíssimo) usam dedilhados próprios — estudados no nível avançado.' },
  };
  window.Inst.registrarClarinete(tab);
})();
