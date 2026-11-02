/* Conservatório de Sopros — módulos 11 a 16 (Intermediário avançado a Profissional) */
(function () {
  'use strict';
  const C = window.Curso;
  const por = (I, m) => window.H.por(I, m);
  const ton = (I) => (!I.grave ? 'C4' : 'Bb2');

  // =====================================================================
  C.mod({ n: 11, nivel: 'intAvancado', titulo: 'Improvisação', desc: 'Do motivo de 3 notas ao II–V–I: pentatônicas, blues, notas-guia, aproximações, cromatismo, enclosures e outside.' });

  C.aula({
    id: '11-1', titulo: 'O que é improvisar: poucas notas, motivos e pergunta e resposta', tempo: '20 min por dia',
    obj: 'Improvisar frases curtas e coerentes com poucas notas, desenvolvendo motivos e usando pergunta e resposta.',
    apr: ['Improvisação é composição em tempo real', 'Improvisar com 3 notas', 'Motivo e desenvolvimento (repetição, sequência, variação rítmica)', 'Pergunta e resposta', 'Espaço e silêncio'],
    teo: '<p><b>Improvisar</b> é compor na hora, com uma linguagem que você já conhece. Ninguém improvisa do nada: os grandes improvisadores têm um vocabulário enorme de frases, aprendido ouvindo, transcrevendo e praticando.</p><p><b>Motivo</b> é uma pequena ideia (2 a 5 notas com um ritmo). Um bom solo <b>desenvolve</b> poucos motivos em vez de despejar muitas notas: <b>repetição</b>, <b>sequência</b> (repetir em outra altura), <b>variação rítmica</b>, <b>inversão</b> (de cabeça para baixo), <b>aumento/diminuição</b> (notas mais longas ou mais curtas).</p><p><b>Pergunta e resposta:</b> a primeira frase termina “em aberto” (numa nota de tensão, como o 2º ou 5º grau); a resposta conclui (na tônica ou 3ª). É a base do blues, do gospel e da conversa entre solista e congregação.</p><p><b>Silêncio:</b> as pausas dão sentido às frases. Deixe espaço.</p>',
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'resposta' }) + '<p>Ligue a nota de referência (aba Afinador) na tônica e improvise só com 3 notas (1, 2 e 3 da escala). Depois 5 notas (pentatônica maior).</p>',
    exs: [
      { nome: 'Três notas', dur: '5 min', bpm: 80, obj: 'Criar com limites.', passos: ['Só os graus 1, 2 e 3.', 'Crie frases de 2 compassos com pausas de 2 compassos.', 'Varie o ritmo, não as notas.'], crit: '8 frases diferentes, todas com começo e fim claros.' },
      { nome: 'Motivo e desenvolvimento', dur: '10 min', bpm: 80, obj: 'Coerência.', passos: ['Invente um motivo de 3–4 notas.', 'Toque-o repetido, em sequência (subindo um grau), com outro ritmo e invertido.', 'Grave.'], crit: 'Quem ouve reconhece o motivo em todas as variações.' },
      { nome: 'Pergunta e resposta', dur: '5 min', bpm: 80, obj: 'Diálogo musical.', passos: ['Pergunta (2 compassos) termina no 2º ou 5º grau.', 'Resposta (2 compassos) termina na tônica.'], crit: '4 pares convincentes.' },
    ],
    met: [['Improviso com drone (pulso no metrônomo)', 72, 100]],
    err: [['Tocar sem parar (sem respirar nem deixar espaço).', 'Regra: tocar 2 compassos, descansar 2.'], ['Notas aleatórias sem ideia.', 'Comece de um motivo e desenvolva.'], ['Medo de errar.', 'No estudo, “erro” é informação. Grave e ouça.']],
    tempo: '20 minutos por dia.',
    crit: ['Improviso frases com 3 notas com começo e fim claros.', 'Desenvolvo um motivo de 4 maneiras.', 'Faço pergunta e resposta convincentes.'],
    quiz: [
      { p: 'Um bom solo geralmente…', o: ['usa o máximo de notas possível', 'desenvolve poucas ideias com coerência', 'nunca repete nada', 'não tem pausas'], c: 1 },
      { p: 'Sequência é…', o: ['repetir o motivo em outra altura', 'tocar a escala inteira', 'tocar mais rápido', 'parar'], c: 0 },
      { p: 'A “pergunta” costuma terminar…', o: ['na tônica', 'numa nota de tensão (2º ou 5º grau)', 'em pausa', 'no agudo sempre'], c: 1 },
    ],
    tarefa: 'Improvise 5 minutos por dia sobre um drone e grave uma vez por semana.',
  });

  C.aula({
    id: '11-2', titulo: 'Pentatônicas e blues', tempo: '25 min por dia',
    obj: 'Improvisar sobre o blues de 12 compassos usando pentatônicas e escala blues, com linguagem de blues.',
    apr: ['Pentatônica maior e menor', 'Escala blues e a “blue note”', 'Forma do blues de 12 compassos', 'Swing e articulação de blues'],
    teo: (I, H) => `<p>A <b>pentatônica</b> tem 5 notas e nenhum semitom: por isso quase tudo soa bem. <b>Maior:</b> 1-2-3-5-6. <b>Menor:</b> 1-♭3-4-5-♭7 (é a maior começando pelo 6º grau). A <b>escala blues</b> acrescenta a <b>♭5</b> (blue note) à pentatônica menor: 1-♭3-4-♭5-5-♭7.</p>
      <p><b>Blues de 12 compassos</b> (forma básica):</p>${H.tabela(['Compassos 1–4', '5–6', '7–8', '9', '10', '11–12'], [['I7 I7 I7 I7', 'IV7 IV7', 'I7 I7', 'V7', 'IV7', 'I7 (V7)']])}
      <p>Sobre todo o blues, a <b>escala blues da tônica</b> funciona; para soar mais profissional, mire a <b>3ª de cada acorde</b> (ex.: em Dó, Mi no C7 e Lá no F7).</p>
      <p><b>Swing:</b> colcheias longa-curta (próximas de uma tercina), acento nas colcheias do contratempo, ligar de 2 em 2 começando no contratempo (“du-<b>dá</b> du-<b>dá</b>”).</p>`,
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'pentaMaior', tonica: ton(I), oitavas: 1, dur: 2, bpm: 80 }) + H.pauta({ tipo: 'escala', escala: 'blues', tonica: ton(I), oitavas: 1, dur: 2, bpm: 80 }) + H.pauta({ tipo: 'mel', id: 'blues' }),
    exs: [
      { nome: 'Blues da Escola', dur: '10 min', bpm: 100, obj: 'Linguagem e forma.', passos: ['Toque o tema com swing.', 'Repare na forma de 12 compassos e nos riffs.'], crit: 'Tema de memória com swing a ♩ = 120.' },
      { nome: 'Improviso no blues', dur: '15 min', bpm: 100, obj: 'Improvisar sobre a forma.', passos: ['Use um playback de blues no seu tom (procure “blues backing track in F” — Fá de concerto é muito comum).', '1º chorus: só 3 notas; 2º: pentatônica menor; 3º: blues, mirando as 3ªs.', 'Grave.'], crit: '3 choruses sem se perder na forma.' },
    ],
    met: [['Escalas pentatônica e blues (swing)', 80, 160], ['Blues da Escola', 90, 140]],
    err: [['Perder-se na forma.', 'Conte os compassos; ouça a mudança para o IV no compasso 5.'], ['Colcheias “retas” no blues/jazz.', 'Ouça e imite; leve as colcheias e acentue o contratempo.'], ['Ficar só subindo e descendo a escala.', 'Use motivos, repetição e pergunta e resposta (aula 11.1).']],
    tempo: '25 minutos por dia.',
    crit: ['Toco pentatônicas e blues em 6 tonalidades.', 'Toco o Blues da Escola com swing a ♩ = 120.', 'Improviso 3 choruses de blues sem me perder.'],
    quiz: [
      { p: 'A escala blues acrescenta à pentatônica menor a…', o: ['2ª', '♭5 (blue note)', '7ª maior', '6ª'], c: 1 },
      { p: 'No blues de 12 compassos, o compasso 5 vai para…', o: ['V7', 'IV7', 'VIm', 'II'], c: 1 },
      { p: 'Colcheias swing são tocadas…', o: ['iguais', 'longa-curta, próximas da tercina', 'curta-longa', 'em staccato sempre'], c: 1 },
    ],
    tarefa: 'Transcreva 4 compassos de um solo de blues que você goste.',
  });

  C.aula({
    id: '11-3', titulo: 'Improvisar sobre acordes: arpejos, notas-guia e II–V–I', tempo: '30 min por dia',
    obj: 'Improvisar seguindo a harmonia (“tocar as mudanças”), usando arpejos e notas-guia sobre II–V–I.',
    apr: ['Notas do acorde nos tempos fortes', 'Notas-guia', 'Escala de cada acorde (dórico, mixolídio, jônio)', 'II–V–I maior e menor'],
    teo: (I, H) => `<p>“Tocar as mudanças” é fazer o ouvinte <b>ouvir a harmonia</b> no seu solo. A técnica básica: colocar <b>notas do acorde nos tempos fortes</b> e usar notas de passagem nos fracos.</p>
      ${H.tabela(['Acorde', 'Escala (modo)', 'Notas de destaque'], [['IIm7', 'dórico', '3ª (♭3) e 7ª'], ['V7', 'mixolídio (ou alteradas)', '3ª e ♭7 (o trítono)'], ['I7M', 'jônio (maior) ou lídio', '3ª e 7ª, 9ª'], ['IIm7(♭5) (menor)', 'lócrio', '♭3 e ♭5'], ['V7(♭9) (menor)', 'menor harmônica a partir do I (frígio dominante)', '3ª e ♭9']])}
      <p><b>Notas-guia:</b> ligar a 3ª e a 7ª de cada acorde pelo caminho mais curto cria uma linha que “desenha” a harmonia. A partir dela, enfeite com ritmo e notas de passagem.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'guia' }) + ['dorico', 'mixolidio'].map((e, i) => H.pauta({ tipo: 'escala', escala: e, tonica: !I.grave ? ['D4', 'G4'][i] : ['D3', 'G2'][i], oitavas: 1, dur: 2, bpm: 90 })).join(''),
    exs: [
      { nome: 'Arpejos no ritmo', dur: '10 min', bpm: 100, obj: 'Ouvir a harmonia nos dedos.', passos: ['Sobre um playback de II–V–I, toque só arpejos (1-3-5-7) em colcheias.', 'Depois comece de outras notas (3, 5, 7).'], crit: 'Muda de arpejo exatamente na troca de acorde.' },
      { nome: 'Notas-guia + ritmo', dur: '10 min', bpm: 100, obj: 'Solos melódicos.', passos: ['Toque a linha de notas-guia.', 'Repita mudando o ritmo e acrescentando 1–2 notas.'], crit: '4 versões diferentes, todas mostrando a harmonia.' },
      { nome: 'Standard simples', dur: '10 min', obj: 'Aplicar num tema.', passos: ['Escolha um tema com II–V–I (ex.: “Autumn Leaves” — use a edição do Real Book no seu tom).', 'Toque o tema, depois improvise com notas-guia.'], crit: 'Um chorus completo sem se perder.' },
    ],
    met: [['II–V–I com arpejos', 80, 160], ['Notas-guia com ritmo', 80, 140]],
    err: [['Tocar só a escala da tônica sobre tudo.', 'Mude com os acordes: a 3ª de cada um precisa aparecer.'], ['Começar sempre pela fundamental.', 'Comece pela 3ª ou 7ª — soa mais melódico.']],
    tempo: '30 minutos por dia.',
    crit: ['Toco arpejos sobre II–V–I em 4 tonalidades a ♩ = 120.', 'Improviso um chorus de um standard mostrando a harmonia.'],
    quiz: [
      { p: 'Sobre o IIm7, a escala mais usada é a…', o: ['jônia', 'dórica', 'lócria', 'frígia'], c: 1 },
      { p: 'Sobre o V7, usa-se tipicamente a…', o: ['mixolídia', 'dórica', 'pentatônica menor sempre', 'cromática'], c: 0 },
      { p: '“Tocar as mudanças” significa…', o: ['mudar de instrumento', 'fazer a harmonia ser ouvida no solo', 'mudar de andamento', 'tocar mais forte'], c: 1 },
    ],
    tarefa: 'Aprenda o tema de um standard com II–V–I e improvise um chorus por dia.',
  });

  C.aula({
    id: '11-4', titulo: 'Linguagem: aproximações, cromatismo, enclosures, outside e transcrição', tempo: '30 min por dia',
    obj: 'Enriquecer a linguagem com notas de aproximação, cromatismos, enclosures, escala bebop e noções de outside, e aprender com transcrições.',
    apr: ['Aproximação cromática e diatônica', 'Enclosure (cercadura)', 'Escala bebop', 'Outside playing (side-slipping)', 'Transcrever e analisar solos'],
    teo: (I) => `<p><b>Aproximação:</b> chegar a uma nota do acorde vindo de meio tom abaixo (cromática) ou de um grau da escala acima. <b>Enclosure</b> (cercadura): “cercar” a nota-alvo com notas acima e abaixo antes de tocá-la (ex.: alvo Mi: Fá – Ré♯ – Mi). É marca do bebop.</p>
      <p><b>Escala bebop dominante:</b> mixolídio + 7ª maior de passagem (8 notas). Em colcheias, ela coloca as notas do acorde nos tempos fortes.</p>
      <p><b>Outside:</b> sair da tonalidade de propósito e voltar — por exemplo, tocar meio tom acima (side-slipping) por um tempo e resolver. Funciona quando a ideia é clara e a volta é segura.</p>
      <p><b>Transcrever</b> é a forma mais eficaz de aprender a linguagem (aula 9.4). Solos para transcrever: ${por(I, { alto: 'Charlie Parker (“Now’s the Time”, “Billie’s Bounce”), Cannonball Adderley (“Autumn Leaves”), Paul Desmond (“Take Five”)', soprano: 'Sidney Bechet, John Coltrane (“My Favorite Things”), Wayne Shorter', clarinete: 'Benny Goodman, Artie Shaw, Paulo Moura, Abel Ferreira', trompete: 'Louis Armstrong (“West End Blues”), Miles Davis (“So What”), Clifford Brown (“Joy Spring”), Chet Baker', trombone: 'J. J. Johnson, Curtis Fuller (“Blue Train”), Raul de Souza' })}.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'bebopDom', tonica: !I.grave ? 'G4' : 'F2', oitavas: 1, dur: 2, bpm: 100, porLinha: 3 }) + H.pauta({ tipo: 'notas', notas: !I.grave ? 'F4:2 D#4:2 E4:4 r:4 D5:2 B4:2 C5:4 r:4' : 'F3:2 D#3:2 E3:4 r:4 D4:2 B3:2 C4:4 r:4', tom: 'C', titulo: 'Enclosures (alvo: Mi e Dó)', bpm: 90 }),
    exs: [
      { nome: 'Enclosures em todas as notas do acorde', dur: '10 min', bpm: 90, obj: 'Vocabulário bebop.', passos: ['Escolha um acorde (ex.: C7M).', 'Faça enclosure em cada nota: 1, 3, 5, 7.', 'Transponha para outras tonalidades.'], crit: 'Enclosures em 4 tonalidades a ♩ = 120.' },
      { nome: 'Transcrição de solo', dur: '20 min/dia', obj: 'Linguagem real.', passos: ['Escolha um solo da lista.', 'Transcreva um chorus em 2–3 semanas.', 'Analise: onde há aproximações, enclosures, arpejos?', 'Use 3 frases do solo nos seus improvisos.'], crit: 'Um chorus transcrito, tocado junto com a gravação, com 3 frases incorporadas.' },
    ],
    met: [['Escala bebop em colcheias', 90, 180], ['Enclosures', 80, 140]],
    err: [['Usar cromatismo sem alvo.', 'Todo cromatismo deve resolver numa nota do acorde, num tempo forte.'], ['“Outside” sem voltar.', 'A volta precisa ser clara e no lugar certo.'], ['Copiar frases sem entender.', 'Analise a função de cada nota e transponha a frase para 12 tonalidades.']],
    tempo: '30 minutos por dia.',
    crit: ['Faço enclosures em 4 tonalidades.', 'Transcrevi um chorus de um solo e uso 3 frases dele.', 'Uso aproximações cromáticas resolvendo em tempos fortes.'],
    quiz: [
      { p: 'Enclosure é…', o: ['tocar só a fundamental', 'cercar a nota-alvo com notas acima e abaixo', 'uma escala', 'tocar fora do ritmo'], c: 1 },
      { p: 'A escala bebop dominante acrescenta ao mixolídio…', o: ['a 7ª maior de passagem', 'a ♭9', 'a ♯4', 'a ♭3'], c: 0 },
      { p: 'Side-slipping é…', o: ['tocar meio tom acima/abaixo de propósito e resolver', 'escorregar a palheta', 'glissando', 'erro de leitura'], c: 0 },
    ],
    tarefa: 'Transcreva um chorus e transponha suas 3 frases favoritas para 12 tonalidades.',
  });

  // =====================================================================
  C.mod({ n: 12, nivel: 'avancado', titulo: 'Estilos: jazz, blues, soul, funk, música brasileira e erudita', desc: 'Sonoridade, articulação, fraseado, ritmo e repertório de cada estilo.' });

  C.aula({
    id: '12-1', titulo: 'Jazz: tradicional, swing, bebop e cool', tempo: '30 min por dia',
    obj: 'Tocar jazz com o som, a articulação e o fraseado de cada época.',
    apr: ['Jazz tradicional (Nova Orleans)', 'Swing das big bands', 'Bebop', 'Cool jazz', 'Repertório e como estudar com o Real Book'],
    teo: (I, H) => H.tabela(['Estilo', 'Época', 'Características', 'Ouça'], [
      ['Tradicional (Nova Orleans)', '1910–1930', 'improviso coletivo, vibrato largo, polifonia entre trompete, clarinete e trombone', 'Louis Armstrong Hot Five, Sidney Bechet'],
      ['Swing', '1930–1945', 'big bands, riffs de naipe, swing marcado, solos melódicos', 'Count Basie, Duke Ellington, Benny Goodman'],
      ['Bebop', '1945–1955', 'andamentos rápidos, harmonia complexa, enclosures, cromatismo', 'Charlie Parker, Dizzy Gillespie, J. J. Johnson'],
      ['Cool', '1949–1960', 'som suave, menos vibrato, frases líricas, espaço', 'Miles Davis (Birth of the Cool), Chet Baker, Paul Desmond'],
      ['Hard bop / modal', '1955–1965', 'blues, gospel, modos', 'Art Blakey, Cannonball Adderley, Kind of Blue'],
    ]) + '<p><b>Articulação de swing:</b> colcheias ligadas de 2 em 2 começando no contratempo; acento no contratempo e nas notas mais agudas da frase; notas “fantasma” (ghost notes, quase sem som) em notas de passagem; final de frase curto (“dot”).</p>',
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'iiVI' }) + '<p>Toque o estudo em três “sotaques”: tradicional (vibrato largo), bebop (rápido, articulado, com ghost notes) e cool (suave, legato, pouco vibrato). Grave e compare com as referências.</p>',
    exs: [
      { nome: 'Imitação de época', dur: '15 min', obj: 'Sotaques do jazz.', passos: ['Escolha 1 gravação de cada estilo da tabela.', 'Toque junto 8 compassos de cada, imitando o som.'], crit: 'Três imitações reconhecíveis.' },
      { nome: 'Repertório de standards', dur: '15 min/dia', obj: 'Repertório básico.', passos: ['Aprenda de memória: um blues, “Autumn Leaves”, “Take the A Train” (temas, edição legal do Real Book no seu tom).', 'Improvise um chorus em cada.'], crit: '3 standards de memória com improviso.' },
    ],
    err: [['Swing “quadrado” ou exagerado.', 'Ouça e imite; o swing muda com o andamento (mais reto em andamentos rápidos).'], ['Tocar jazz com som erudito (ou vice-versa).', 'Cada estilo tem sua referência sonora: ouça antes de tocar.']],
    tempo: '30 minutos por dia.',
    crit: ['Distingo e imito 3 estilos de jazz.', 'Toco 3 standards de memória com improviso.'],
    quiz: [
      { p: 'O improviso coletivo é característica do…', o: ['bebop', 'jazz tradicional de Nova Orleans', 'cool', 'funk'], c: 1 },
      { p: 'O bebop tem…', o: ['andamentos lentos e pouca harmonia', 'andamentos rápidos e harmonia complexa', 'só improviso coletivo', 'nenhuma improvisação'], c: 1 },
      { p: 'Ghost note é…', o: ['nota muito forte', 'nota quase sem som, de passagem', 'nota errada', 'nota de fim'], c: 1 },
    ],
    tarefa: 'Monte uma playlist de referência com 10 faixas dos estilos estudados.',
  });

  C.aula({
    id: '12-2', titulo: 'Blues, soul, funk e pop', tempo: '25 min por dia',
    obj: 'Dominar os efeitos e a precisão rítmica dos estilos da black music e do pop.',
    apr: ['Efeitos: bend, scoop, fall, doit, growl', 'Naipe de metais (horn section)', 'Precisão rítmica e notas curtas', 'Repertório'],
    teo: (I, H) => H.tabela(['Efeito', 'O que é', 'Como fazer'], [
      ['Scoop', 'chegar à nota por baixo', I.familia === 'metal' ? 'lábio relaxado no início e sobe' : 'mandíbula baixa no início e sobe'],
      ['Bend', 'curvar a nota para baixo e voltar', I.sub === 'trombone' ? 'vara ou lábio' : I.familia === 'metal' ? 'lábio/meio-pisto' : 'mandíbula/garganta'],
      ['Fall', 'cair da nota no final', I.sub === 'trombone' ? 'glissando de vara' : I.familia === 'metal' ? 'meio-pistos + lábio' : 'escala cromática rápida descendente ou garganta'],
      ['Doit', 'subir no final da nota', 'contrário do fall'],
      ['Growl', 'som rouco', 'cantar/rosnar ao mesmo tempo que toca'],
      ['Shake', 'trinado largo', I.familia === 'metal' ? 'balançar o instrumento (lip trill)' : 'trinado de 3ª menor rápido'],
    ]) + '<p><b>Soul e funk:</b> notas curtas, precisas e “em cima” do tempo; o naipe toca junto como um só instrumento (mesmo ataque, mesmo corte). Referências: Tower of Power, Earth, Wind & Fire, James Brown, Maceo Parker (sax alto), Banda Black Rio (Brasil).</p><p><b>Pop:</b> som limpo e brilhante, solos melódicos e cantáveis (David Sanborn no alto, Kenny G no soprano), muito uso de microfone.</p>',
    pra: (I, H) => H.pauta({ tipo: 'notas', notas: !I.grave ? 'r:2 G4:2 r:2 Bb4:2 r:2 C5:1 r:1 r:4 r:2 G4:2 Bb4:2 C5:2 Eb5:4 C5:4' : 'r:2 F3:2 r:2 Ab3:2 r:2 Bb3:1 r:1 r:4 r:2 F3:2 Ab3:2 Bb3:2 Db4:4 Bb3:4', tom: 'C', titulo: 'Riff de funk (notas curtas e precisas)', bpm: 96 }),
    exs: [{ nome: 'Efeitos', dur: '10 min', obj: 'Paleta de estilo.', passos: ['Pratique cada efeito numa nota longa.', 'Aplique scoop e fall numa melodia de soul.'], crit: 'Efeitos afinados e controlados (não aleatórios).' }, { nome: 'Riff com metrônomo', dur: '10 min', bpm: 96, obj: 'Precisão.', passos: ['Metrônomo nos tempos 2 e 4.', 'Toque o riff em laço por 2 minutos.'], crit: 'Notas curtas idênticas, sem atrasar.' }],
    err: [['Efeitos demais.', 'Efeito é tempero: use em notas de destaque.'], ['Notas curtas “mortas”.', 'Curta não é fraca: ataque com ar, corte com a língua.']],
    tempo: '25 minutos por dia.',
    crit: ['Faço scoop, bend, fall e doit com controle.', 'Toco o riff de funk a ♩ = 96 com metrônomo nos tempos 2 e 4.'],
    quiz: [
      { p: 'Fall é…', o: ['chegar à nota por baixo', 'cair a partir da nota no final', 'um trinado', 'um acento'], c: 1 },
      { p: 'No naipe de funk, o mais importante é…', o: ['vibrato largo', 'ataque e corte idênticos entre os músicos', 'tocar forte sempre', 'improvisar sempre'], c: 1 },
    ],
    tarefa: 'Tire de ouvido um riff de metais de uma música soul/funk.',
  });

  C.aula({
    id: '12-3', titulo: 'Música brasileira: choro, samba, bossa nova, frevo e MPB', tempo: '30 min por dia',
    obj: 'Tocar os principais gêneros brasileiros com o ritmo, a articulação e o fraseado corretos.',
    apr: ['Choro', 'Samba', 'Bossa nova', 'Frevo', 'MPB e baião'],
    teo: (I, H) => H.tabela(['Gênero', 'Ritmo', 'Fraseado e articulação', 'Ouça'], [
      ['Choro', '2/4, síncopes, semicolcheias', 'virtuosismo, ornamentos (apojaturas, mordentes), contracantos (baixaria), forma rondó A-B-A-C-A', 'Pixinguinha, Altamiro Carrilho, Abel Ferreira, Paulo Moura, K-Ximbinho'],
      ['Samba', '2/4, síncope característica, “teco-teco”', 'notas curtas e balançadas, acentos antecipados', 'Paulinho da Viola, gafieira (Severino Araújo e a Orquestra Tabajara)'],
      ['Bossa nova', '2/4 ou 4/4 sincopado', 'som suave, pouco vibrato, legato, dinâmica contida', 'Stan Getz & João Gilberto, Tom Jobim, Paulo Moura'],
      ['Frevo', '2/4 rápido', 'metais e palhetas em diálogo, notas curtas e brilhantes, muita energia', 'Vassourinhas, Nelson Ferreira, Spok Frevo Orquestra'],
      ['Baião', '2/4, acento no contratempo', 'escalas mixolídias e lídias com ♭7 (modos nordestinos)', 'Luiz Gonzaga, Hermeto Pascoal, Sivuca'],
    ]) + '<p><b>Modos nordestinos:</b> o baião e o xote usam muito o <b>mixolídio</b> (♭7) e o <b>lídio ♭7</b> (♯4 e ♭7). Estude essas escalas na aba Escalas.</p>',
    pra: (I, H) => H.pauta({ tipo: 'ritmo', ritmo: '2 4 2 2 2 2 2 2 4 2 4 2 2 4 2 2 8', compasso: '2/4', titulo: 'Células de samba e choro', bpm: 80 }) + H.pauta({ tipo: 'escala', escala: 'mixolidio', tonica: ton(I), oitavas: 1, dur: 2, titulo: 'Mixolídio (baião)', bpm: 90 }),
    exs: [{ nome: 'Um choro inteiro', dur: '20 min/dia', obj: 'Repertório brasileiro.', passos: ['Escolha um choro (ex.: “Carinhoso”, “Naquele Tempo” — use edição publicada).', 'Estude por partes, com metrônomo.', 'Toque junto com uma gravação.'], crit: 'Um choro completo de memória, no andamento da gravação.' }, { nome: 'Síncope brasileira', dur: '10 min', bpm: 80, obj: 'Balanço.', passos: ['Toque as células rítmicas numa nota.', 'Depois aplique-as numa escala.'], crit: 'Balanço natural (grave e compare com gravações).' }],
    err: [['Tocar choro “quadrado”.', 'O choro tem síncopes e respirações do pandeiro: ouça muito antes.'], ['Bossa nova com som grande e vibrato largo.', 'Bossa pede intimidade: som suave e contido.']],
    tempo: '30 minutos por dia.',
    crit: ['Toco um choro completo de memória.', 'Toco células de samba com balanço.', 'Toco o modo mixolídio em 4 tonalidades.'],
    quiz: [
      { p: 'A forma típica do choro é…', o: ['A-A-B-A', 'rondó A-B-A-C-A', '12 compassos', 'livre'], c: 1 },
      { p: 'O baião usa muito o modo…', o: ['frígio', 'mixolídio', 'lócrio', 'eólio'], c: 1 },
      { p: 'A bossa nova pede…', o: ['vibrato largo e forte', 'som suave, contido e legato', 'staccato agressivo', 'growl'], c: 1 },
    ],
    tarefa: 'Ouça um álbum de choro inteiro esta semana, de preferência com seu instrumento (palhetas: Abel Ferreira, Paulo Moura; metais: frevo e gafieira).',
  });

  C.aula({
    id: '12-4', titulo: 'Música erudita', tempo: '30 min por dia',
    obj: (I) => `Conhecer a tradição erudita do ${I.curto.toLowerCase()}, sua sonoridade, articulação e repertório.`,
    apr: ['Sonoridade erudita', 'Articulação e estilo por período (Barroco, Clássico, Romântico, Moderno)', 'Repertório essencial', 'Estudos de método'],
    teo: (I, H) => `<p>A música erudita exige <b>som homogêneo</b>, <b>afinação rigorosa</b>, articulação precisa e respeito absoluto ao texto da partitura (dinâmicas, articulações, andamentos).</p>
      ${H.tabela(['Período', 'Estilo', 'Articulação típica'], [['Barroco (1600–1750)', 'ornamentos, pouco vibrato, frase em “arcos” curtos', 'notas separadas, trinados da nota de cima'], ['Clássico (1750–1820)', 'equilíbrio, clareza', 'staccato leve, apojaturas'], ['Romântico (1820–1900)', 'expressão, legato, rubato', 'longas frases cantadas'], ['Moderno (1900–)', 'cores, técnicas estendidas', 'muito variada']])}
      <p>${por(I, { sax: 'O sax não existia no Barroco nem no Clássico: seu repertório original começa no fim do século XIX e se desenvolve no século XX (Glazunov, Ibert, Debussy, Creston, Villa-Lobos). A escola francesa de <b>Marcel Mule</b> definiu o som erudito do sax; <b>Sigurd Raschèr</b> expandiu o registro altíssimo. Transcrições de obras barrocas são muito usadas para estudo.', clarinete: 'O clarinete tem repertório desde o século XVIII: Stamitz, Mozart (Concerto K. 622, Quinteto K. 581), Weber, Brahms, Debussy, Copland. É instrumento fixo da orquestra sinfônica.', trompete: 'O trompete tem repertório barroco (Bach, Händel, Torelli — originalmente para trompete natural), clássico (Haydn, Hummel) e moderno (Hindemith, Arutunian), além de um vasto repertório orquestral.', trombone: 'O trombone aparece na música sacra desde a Renascença, entra na orquestra sinfônica com Beethoven (5ª Sinfonia) e tem repertório solo em David, Guilmant, Rimsky-Korsakov, Grøndahl, Hindemith e Frank Martin.' })}</p>`,
    pra: '<p>Abra a aba <a href="#repertorio">Repertório</a> e escolha um estudo e uma peça do seu nível. Estude com o método de 7 passos descrito ali. Ouça duas gravações profissionais antes de começar.</p>',
    exs: [{ nome: 'Estudo de método', dur: '20 min/dia', obj: 'Técnica e musicalidade erudita.', passos: ['Escolha um estudo do método do seu nível (ex.: Ferling/Mule, Rose, Kopprasch, Rochut).', 'Um estudo a cada 1–2 semanas.', 'Grave a versão final.'], crit: 'Estudo no andamento indicado, com todas as dinâmicas.' }, { nome: 'Peça com piano', dur: '20 min/dia', obj: 'Repertório.', passos: ['Escolha uma peça com acompanhamento de piano.', 'Estude com gravação do acompanhamento (playback) ou com pianista.'], crit: 'Peça completa com acompanhamento.' }],
    err: [['Tocar erudito com vibrato e efeitos de música popular.', 'Ouça a escola do seu instrumento e adapte o som.'], ['Ignorar indicações da partitura.', 'No erudito, cada sinal é uma instrução.']],
    tempo: '30 minutos por dia.',
    crit: ['Toco um estudo de método publicado no andamento indicado.', 'Toco uma peça erudita com acompanhamento.'],
    quiz: [
      { p: 'No estilo barroco, os trinados geralmente começam…', o: ['pela nota de cima', 'pela nota principal', 'pela nota de baixo', 'tanto faz'], c: 0 },
      { p: 'O rubato é mais característico do período…', o: ['Barroco', 'Clássico', 'Romântico', 'nenhum'], c: 2 },
    ],
    tarefa: 'Escolha a peça erudita que você vai preparar no módulo 14.',
  });

  // =====================================================================
  C.mod({ n: 13, nivel: 'avancado', titulo: 'Música gospel e prática em igreja', desc: 'Melodia congregacional, introduções, contracantos, respostas, solos, harmonia gospel, arranjos e prática em conjunto.' });

  C.aula({
    id: '13-1', titulo: 'O instrumento no culto: servir à congregação', tempo: '30 min',
    obj: 'Entender o papel do instrumento no culto, tocar a melodia congregacional com fidelidade e saber quando tocar e quando silenciar.',
    apr: ['A função do músico no culto', 'Tocar a melodia congregacional', 'Respirar com a congregação', 'Quando tocar e quando ficar em silêncio', 'Dinâmica e sensibilidade'],
    teo: '<p>No culto, a música serve à <b>adoração e à congregação</b>, não à exibição do músico. O instrumentista maduro sabe que <b>menos é mais</b>: uma frase bem colocada vale mais que um solo longo.</p><ul><li><b>Melodia congregacional:</b> tocada com fidelidade, som cantado, sem enfeites que confundam quem canta. Respire onde a congregação respira (fim dos versos).</li><li><b>Andamento:</b> siga quem dirige (ministro, regente, tecladista). Nunca acelere.</li><li><b>Quando silenciar:</b> durante a fala, a oração e a leitura (a menos que seja combinado tocar um fundo muito suave); nos momentos em que a voz e a letra precisam de espaço; quando outro instrumento está solando.</li><li><b>Dinâmica:</b> acompanhe a intensidade do momento: introspecção pede som suave e notas longas; celebração pede brilho e ritmo.</li><li><b>Volume do grupo:</b> o sopro é penetrante. Toque abaixo do cantor sempre.</li></ul>',
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'graca' }) + '<p>Toque a melodia como se estivesse conduzindo a congregação: som cheio, legato, respirações no fim de cada verso, sem vibrato exagerado. Depois toque como “fundo” para uma leitura: notas longas, piano, só a tônica e a 5ª.</p>',
    exs: [{ nome: 'Melodias do hinário', dur: '20 min/dia', obj: 'Repertório congregacional.', passos: ['Escolha 10 hinos/louvores da sua igreja.', 'Toque cada um na tonalidade usada no culto (transponha!).', 'Decore os 5 mais cantados.'], crit: '10 melodias na tonalidade do culto; 5 de memória.' }],
    err: [['Tocar o tempo todo.', 'Planeje: onde entra, onde sai. Silêncio também é serviço.'], ['Enfeitar a melodia quando a congregação está aprendendo.', 'Primeiro fidelidade; ornamentos só onde não atrapalham.'], ['Volume acima do cantor.', 'Toque sempre abaixo da voz principal.']],
    tempo: '30 minutos e 20 minutos diários de repertório.',
    crit: ['Toco 10 melodias congregacionais na tonalidade do culto.', 'Sei descrever quando devo silenciar.'],
    quiz: [
      { p: 'No culto, o principal papel do instrumentista é…', o: ['mostrar técnica', 'servir à adoração e à congregação', 'tocar o máximo possível', 'tocar mais forte que o cantor'], c: 1 },
      { p: 'Durante uma oração falada, normalmente…', o: ['toca-se um solo', 'silencia-se ou toca-se um fundo muito suave combinado', 'toca-se forte', 'improvisa-se livremente'], c: 1 },
    ],
    tarefa: 'Faça a lista dos louvores/hinos mais usados na sua igreja com a tonalidade de concerto e a sua tonalidade escrita.',
  });

  C.aula({
    id: '13-2', titulo: 'Introduções, respostas, contracantos e acompanhamento do cantor', tempo: '30 min por dia',
    obj: 'Criar introduções, respostas (fills) e contracantos que valorizam a voz.',
    apr: ['Introduções (a partir do refrão ou do final)', 'Respostas nos espaços da voz', 'Contracantos em notas longas, 3ªs e 6ªs', 'Acompanhar sem competir'],
    teo: '<p><b>Introdução:</b> geralmente usa os últimos 4 compassos do refrão (ou a frase mais marcante), terminando na <b>dominante</b> (V) para “puxar” a entrada do cantor. Combine com o tecladista.</p><p><b>Respostas (fills):</b> entram nos <b>espaços</b> entre as frases do cantor — nunca por cima da letra. São curtas (1–2 compassos), usando notas do acorde, pentatônica e motivos da própria melodia.</p><p><b>Contracanto:</b> uma segunda melodia que soa junto com a voz. Princípios: <b>movimento contrário</b> (a voz sobe, você desce), <b>notas longas</b> quando a voz se move muito, <b>3ªs e 6ªs</b> abaixo/acima da melodia, notas-guia (3ª e 7ª dos acordes) e registro diferente da voz.</p>',
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'contracanto' }) + '<p>Esse contracanto usa notas longas que mudam pouco enquanto a melodia se move — ele “abraça” a voz. Experimente criar o seu sobre a progressão C – G/B – Am – F – C/G – G – C (relativa ao seu tom escrito).</p>',
    exs: [
      { nome: 'Introduções', dur: '10 min', obj: 'Começar bem.', passos: ['Para 3 louvores, toque os 4 últimos compassos do refrão como introdução.', 'Termine na dominante.'], crit: '3 introduções combinadas com o tecladista.' },
      { nome: 'Respostas', dur: '10 min', obj: 'Dialogar com o cantor.', passos: ['Cante (ou ouça uma gravação) um louvor.', 'Nos espaços, toque respostas de 1–2 compassos.', 'Nunca sobre a letra.'], crit: 'Respostas apenas nos espaços, em 2 louvores.' },
      { nome: 'Contracanto escrito', dur: '15 min', obj: 'Segunda voz.', passos: ['Escreva um contracanto para um refrão (8 compassos).', 'Use notas longas, 3ªs/6ªs e movimento contrário.', 'Toque junto com uma gravação.'], crit: 'Contracanto que soa junto sem esconder a melodia.' },
    ],
    err: [['Tocar por cima da letra.', 'Respostas só nos espaços.'], ['Contracanto paralelo e no mesmo registro da voz.', 'Mude de registro e use movimento contrário.'], ['Introdução que não “entrega” o tom.', 'Termine na dominante e combine o sinal de entrada.']],
    tempo: '30 minutos por dia.',
    crit: ['Faço introduções para 3 louvores.', 'Faço respostas apenas nos espaços da voz.', 'Escrevi e toquei um contracanto de 8 compassos.'],
    quiz: [
      { p: 'Onde entram as respostas (fills)?', o: ['sobre a letra', 'nos espaços entre as frases do cantor', 'só no final', 'em qualquer lugar'], c: 1 },
      { p: 'Um bom contracanto usa…', o: ['as mesmas notas da melodia', 'notas longas, 3ªs/6ªs e movimento contrário', 'só notas rápidas', 'a mesma oitava da voz sempre'], c: 1 },
      { p: 'A introdução costuma terminar na…', o: ['tônica', 'dominante, para chamar o cantor', 'subdominante', 'pausa'], c: 1 },
    ],
    tarefa: 'Prepare introdução, respostas e um contracanto para um louvor do próximo culto.',
  });

  C.aula({
    id: '13-3', titulo: 'Solos e improvisação gospel', tempo: '30 min por dia',
    obj: 'Construir solos gospel emocionantes e maduros, com dinâmica, ápice e linguagem própria, sem exageros.',
    apr: ['Progressões gospel típicas', 'Escalas: pentatônicas, blues, maior com ♭3 de passagem', 'Construção de um solo (arco dramático)', 'Frases emocionantes sem exagero'],
    teo: (I, H) => `<p><b>Progressões típicas</b> (em graus): 1 – 4 – 5 – 1; 1 – 1/3 – 4 – 5; 4 – 5 – 3m – 6m – 2m – 5 – 1; 1 – 5/7 – 6m – 4; 2m7 – 5 – 1 (o II–V–I gospel com 9ªs e sus). No andamento lento, muito 12/8.</p>
      <p><b>Linguagem:</b> pentatônica maior com a <b>♭3 de passagem</b> (o “blue” resolvendo na 3ª), escala blues, enclosures sobre a 3ª, frases cantadas com scoops e falls discretos, vibrato no fim das notas longas.</p>
      <p><b>Arco dramático de um solo:</b></p>${H.tabela(['Parte', 'O que fazer'], [['Começo', 'registro médio, piano, frases curtas e espaçadas, melodia reconhecível'], ['Desenvolvimento', 'motivos repetidos e desenvolvidos, crescendo, frases mais longas'], ['Ápice', 'registro agudo, forte, notas longas e intensas, combinado com a banda'], ['Resolução', 'desce, diminui, volta à melodia ou ao refrão']])}
      <p><b>Sem exageros:</b> o ápice precisa ser <b>preparado</b>; agudos e efeitos sem preparação soam como exibição. A emoção vem da direção e da dinâmica, não do número de notas.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'bluesMaior', tonica: ton(I), oitavas: 1, dur: 2, titulo: 'Blues maior (pentatônica maior + ♭3 de passagem)', bpm: 72 }),
    exs: [
      { nome: 'Solo sobre progressão gospel', dur: '20 min', bpm: 66, obj: 'Arco dramático.', passos: ['Use um playback de louvor (procure “gospel backing track 12/8” no tom de concerto que sua igreja usa).', 'Planeje o arco: começo, desenvolvimento, ápice, resolução (32 compassos).', 'Grave.'], crit: 'Ouvinte identifica claramente o ápice e a resolução.' },
      { nome: 'Frases de referência', dur: '10 min', obj: 'Vocabulário.', passos: ['Transcreva 3 frases de solistas gospel que você admira.', 'Transponha para 3 tonalidades.'], crit: '3 frases em 3 tonalidades.' },
    ],
    err: [['Ápice no começo do solo.', 'Comece simples; guarde o agudo para o ápice.'], ['Muitas notas rápidas sem melodia.', 'Cante o solo: se não dá para cantar, provavelmente não emociona.'], ['Ignorar a banda.', 'Combine o crescendo com bateria e teclado.']],
    tempo: '30 minutos por dia.',
    crit: ['Construo um solo de 32 compassos com arco dramático claro.', 'Uso 3 frases transcritas em 3 tonalidades.'],
    quiz: [
      { p: 'O ápice de um solo gospel deve…', o: ['vir logo no início', 'ser preparado pelo desenvolvimento', 'ser evitado', 'durar o solo inteiro'], c: 1 },
      { p: 'A ♭3 de passagem na pentatônica maior…', o: ['é erro', 'dá o sabor “blue” resolvendo na 3ª', 'substitui a tônica', 'só se usa no erudito'], c: 1 },
    ],
    tarefa: 'Grave um solo completo e avalie: tem começo, desenvolvimento, ápice e resolução?',
  });

  C.aula({
    id: '13-4', titulo: 'Arranjos, harmonizações, transposição de hinos e conjuntos de igreja', tempo: '45 min por dia (projeto)',
    obj: 'Arranjar hinos para seu instrumento (solo, duo e naipe), transpor hinários e tocar em orquestras e bandas de igreja.',
    apr: ['Arranjo para instrumento solo + teclado', 'Harmonização a 2 e 3 vozes', 'Transposição de hinários', 'Tocar com teclado, guitarra, baixo e bateria', 'Orquestras de igreja: naipes e afinação'],
    teo: (I) => `<p><b>Arranjo simples:</b> introdução (4 compassos) – 1ª estrofe com melodia – 2ª estrofe com contracanto (o cantor ou outro instrumento faz a melodia) – interlúdio/solo – modulação (+½ ou +1 tom) – último refrão com melodia oitava acima ou dobrada – final (cadência plagal ou fermata).</p>
      <p><b>Harmonização a 2 vozes:</b> 2ª voz uma <b>3ª ou 6ª abaixo</b> da melodia, ajustando para notas do acorde. A 3 vozes: melodia + 3ª abaixo + nota restante do acorde (tríade fechada). Evite quintas e oitavas paralelas consecutivas.</p>
      <p><b>Transpor hinários:</b> a maioria está em concerto (para coral e órgão). ${I.transp.s ? `Para você: ${I.id === 'alto' ? 'suba uma 6ª maior (armadura +3♯)' : 'suba um tom (armadura +2♯)'}. Hinários de orquestra trazem partes já transpostas para ${I.tom}.` : 'Você lê em sons reais na clave de Fá; se a parte vier em Si♭ na clave de Sol, leia uma 9ª abaixo.'}</p>
      <p><b>Com a banda:</b> o teclado e a guitarra definem a harmonia; o baixo, a fundamental; a bateria, o pulso. Fique fora da região da voz e do teclado (registro e ritmo diferentes). Combine sinais de mão para repetir, modular e terminar.</p>
      <p><b>Orquestras de igreja</b> (muito comuns no Brasil, com naipes de sax, clarinete, trompete, trombone, além de cordas): toque o seu papel no naipe (1ª, 2ª, 3ª voz), afine com a nota do grupo, combine respirações e articulações com o chefe de naipe.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'graca' }) + '<p>Projeto: escreva um arranjo de “Amazing Grace” (ou de um hino da sua igreja) para seu instrumento + teclado, no MuseScore, com: introdução, melodia, contracanto, modulação e final. Escreva também uma 2ª voz para um colega.</p>',
    exs: [{ nome: 'Arranjo completo', dur: '45 min/dia por 2 semanas', obj: 'Projeto de arranjo.', passos: ['Escolha o hino e o tom de concerto.', 'Escreva no MuseScore: introdução, estrofes, contracanto, modulação, final.', 'Gere a parte transposta para seu instrumento.', 'Toque com o tecladista.'], crit: 'Arranjo tocado num ensaio ou culto.' }, { nome: '2ª voz', dur: '20 min', obj: 'Harmonização.', passos: ['Escreva a 2ª voz em 3ªs/6ªs para 16 compassos.', 'Toque em duo.'], crit: 'Duo afinado e sem paralelismos de 5ª/8ª.' }],
    err: [['Arranjo sem combinar com a banda.', 'Escreva a forma (roteiro) e entregue a todos.'], ['Esquecer de transpor a parte.', 'MuseScore: ative a “partitura de concerto” para editar e gere as partes transpostas.']],
    tempo: '45 minutos por dia durante o projeto.',
    crit: ['Escrevi um arranjo completo de um hino.', 'Escrevi e toquei uma 2ª voz.', 'Transponho qualquer hino do hinário para meu instrumento.'],
    quiz: [
      { p: 'A 2ª voz mais simples fica…', o: ['em uníssono', 'uma 3ª ou 6ª abaixo da melodia', 'uma 2ª acima', 'uma 7ª abaixo'], c: 1 },
      { p: 'Uma modulação comum no último refrão é…', o: ['descer uma 5ª', 'subir ½ tom ou 1 tom', 'ir para o relativo menor', 'mudar de compasso'], c: 1 },
      { p: 'Ao tocar com banda, o sopro deve…', o: ['tocar na mesma região da voz', 'ocupar registro e ritmo diferentes da voz e do teclado', 'dobrar o baixo', 'tocar sempre forte'], c: 1 },
    ],
    tarefa: 'Apresente seu arranjo num ensaio. Grave e avalie com o grupo.',
  });

  C.aula({
    id: '13-5', titulo: 'Assembleia de Deus: a Harpa Cristã, bandas e conjuntos', tempo: '30 min por dia',
    obj: 'Tocar os hinos da Harpa Cristã com segurança e servir à banda, à orquestra ou ao conjunto da igreja.',
    apr: ['A Harpa Cristã: história e organização', 'Estrutura dos hinos: estrofes e coro', 'Introdução, passagens e final', 'Tocar com banda, orquestra e conjunto', 'Montar seu repertório da Harpa'],
    teo: (I, H) => `<p>A <b>Harpa Cristã</b> é o hinário oficial das Assembleias de Deus no Brasil. A primeira edição saiu no <b>Recife, em 1922</b>, um ano depois do <i>Cantor Pentecostal</i>. Entre seus organizadores estão Adriano Nobre, Samuel Nyström e Paulo Leivas Macalão. Em 1937 foi nomeada uma comissão para preparar a primeira edição com música; a <b>Harpa Cristã Ampliada</b>, de 1999, chegou a <b>640 hinos</b>. A editora é a CPAD.</p>
      <p>A maioria dos hinos tem <b>estrofes</b> e um <b>coro</b> (refrão) que se repete depois de cada estrofe. Antes de tocar, descubra: quantas estrofes, onde está o coro, e se há repetição do coro no final.</p>
      ${H.tabela(['Momento', 'O que o sopro faz'], [['Introdução', 'toca a última frase do coro (ou o coro inteiro), terminando na dominante para chamar a congregação'], ['Estrofes', 'melodia com fidelidade, ou contracanto suave se o cantor/coral já sustenta a melodia'], ['Coro', 'mais presença: melodia dobrada, 2ª voz em 3ªs ou respostas nos espaços'], ['Entre estrofes', 'pequena passagem de 2 a 4 compassos, só se combinado'], ['Final', 'repetição da última frase, rit. e fermata na tônica']])}
      <p><b>Formações:</b> em muitas igrejas há <b>bandas</b> (metais, palhetas e percussão), <b>orquestras</b> (com cordas) e <b>conjuntos</b> com teclado, guitarra, baixo e bateria. Em todas, quem conduz é o regente ou o dirigente do louvor: combine tom, introdução, número de estrofes e final.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'graca' }) + `<p>Use esta melodia como treino de “hino com estrofes”: toque a introdução (últimos 4 compassos), a melodia, e no final repita a última frase com <i>rit.</i> e fermata. ${I.transp.s ? 'A Harpa com música está em som de concerto: transponha (aba Transpositor) ou use a parte já escrita para ' + I.tom + ', se sua banda tiver.' : 'A Harpa com música está em som de concerto, que é como você lê.'}</p><p class="aviso">Para estudar os hinos da <b>sua</b> Harpa: abra <a href="#hinos">Meus hinos</a>, copie ou fotografe o hino, e o app transpõe para o ${I.nomeMin}, toca e mostra os dedilhados.</p>`,
    exs: (I) => [
      { nome: 'Seu repertório da Harpa', dur: '20 min/dia', obj: 'Estar pronto para o culto.', passos: ['Liste os 10 hinos que sua igreja mais canta.', 'Anote o tom de concerto usado e o seu tom escrito.', 'Toque cada um com introdução e final.'], crit: '10 hinos prontos, 5 de memória.' },
      { nome: 'Segunda voz no coro', dur: '15 min', obj: 'Harmonizar.', passos: ['Escolha 3 hinos.', 'Escreva uma 2ª voz em 3ªs abaixo para o coro.', 'Toque com outro músico ou com o teclado.'], crit: '2ª voz afinada em 3 hinos.' },
    ],
    err: [['Tocar todas as estrofes iguais.', 'Varie: melodia, contracanto, dinâmica. A última estrofe pode crescer.'], ['Mudar o tom sem combinar.', 'O tom é o da congregação e do regente; transponha você.'], ['Encher todos os espaços com respostas.', 'Respostas só onde ajudam a letra.']],
    tempo: '30 minutos por dia.',
    crit: ['Toco 10 hinos da Harpa no tom da minha igreja, com introdução e final.', 'Faço 2ª voz no coro de 3 hinos.'],
    quiz: [
      { p: 'A Harpa Cristã é…', o: ['um método de música', 'o hinário oficial das Assembleias de Deus no Brasil', 'um estilo de solo', 'uma banda'], c: 1 },
      { p: 'Onde e quando saiu a primeira edição?', o: ['São Paulo, 1950', 'Recife, 1922', 'Rio de Janeiro, 1999', 'Belém, 1911'], c: 1 },
      { p: 'Quantos hinos tem a Harpa Cristã Ampliada (1999)?', o: ['480', '524', '640', '300'], c: 2 },
      { p: 'Quem define tom, introdução e final no culto?', o: ['cada músico', 'o regente ou o dirigente do louvor, combinado com o grupo', 'o primeiro que começar', 'ninguém'], c: 1 },
    ],
    tarefa: 'Monte a lista dos 10 hinos com tom de concerto, tom escrito, introdução e final.',
  });

  C.aula({
    id: '13-6', titulo: 'CCB: o hinário, as quatro vozes e a orquestra', tempo: '30 min por dia',
    obj: 'Ler e tocar com perfeição a sua voz no hinário a quatro vozes e entender a organização musical da Congregação Cristã no Brasil.',
    apr: ['O hinário nº 5', 'Leitura a quatro vozes (SATB)', 'Hinários por afinação', 'Encarregado, ensino e oficialização', 'Como se preparar'],
    teo: (I, H) => `<p>O hinário da Congregação Cristã no Brasil é <b>Hinos de Louvores e Súplicas a Deus</b>. O <b>hinário nº 5</b> foi publicado em junho de 2012 e está em uso desde <b>17 de março de 2013</b>. Tem <b>480 hinos</b> — 430 para os cultos oficiais e 50 para as reuniões de jovens e menores — e 6 coros. O canto da congregação é em <b>uníssono</b>.</p>
      <p>Os hinários com música estão no formato <b>SATB</b>: <b>soprano e contralto na clave de Sol</b>, <b>tenor e baixo na clave de Fá</b>. Para os instrumentos, existem hinários de acordo com a afinação:</p>
      ${H.tabela(['Hinário', 'Capa', 'Para'], [['Dó', 'preta', 'instrumentos em Dó (flauta, oboé, violino…)'], ['Fá', 'bege', 'instrumentos em Fá (trompa, corne inglês)'], ['Mi♭', 'vinho', 'sax alto, sax barítono, clarinete alto'], ['Si♭', 'azul-escuro', 'instrumentos em Si♭ (clarinete, sax soprano e tenor, trompete…)']])}
      <p>Desde 1985 o hinário traz <b>sinais de respiração</b>; no nº 5, as linhas de acompanhamento (sobretudo o baixo) ficaram mais melódicas.</p>
      <p><b>Organização:</b> o <b>encarregado</b> é o maestro da orquestra: mantém o andamento musical dos cultos, coordena o ensino e preside os ensaios. O <b>instrutor</b> é um músico oficializado que auxilia o encarregado. O ensino é <b>gratuito</b>, nos <b>Grupos de Estudo Musical (GEM)</b>; nos dias de <b>testes e exames</b>, os candidatos são avaliados pelo encarregado regional para serem aprovados a tocar nos cultos (para os cultos oficiais, o aprendiz precisa ser batizado). Para trocar de instrumento, fala-se com o encarregado local.</p>
      <p><b>Instrumentos usados</b> (lista da igreja): violino, viola, violoncelo, flauta transversal, oboé, oboé d’amore, corne inglês, fagote, clarinete, clarinete alto e baixo, saxofones soprano, alto, tenor e barítono, trompete, cornet, flugelhorn, trompa, trombone de pisto, trombonito, eufônio, tuba e órgão.${I.sub === 'trombone' ? ' <b>Atenção:</b> na lista consta o <b>trombone de pisto</b> (e o trombonito), não o trombone de vara. A leitura, a teoria, a respiração e a embocadura que você aprende aqui valem para os dois; confirme com seu encarregado qual hinário e qual instrumento usar.' : ''}</p>
      <p class="aviso">A igreja não produz nem autoriza gravações de seus hinos. Por isso este app não reproduz hinos do hinário: estude pelo próprio hinário, com seu instrutor. Para estudar um hino do seu hinário no app, use <a href="#hinos">Meus hinos</a>: copie (ou fotografe) a sua voz, e o app mostra os dedilhados e toca a melodia. O exercício abaixo é original, no mesmo formato a quatro vozes.</p>`,
    pra: (I, H) => `<p>Leia o coral abaixo nas quatro vozes. A partitura já vem transposta para o seu instrumento e na oitava que cabe na sua extensão. Toque primeiro a voz indicada pelo seu encarregado, depois as outras — isso treina leitura e ouvido harmônico.</p>` + ['s', 'a', 't', 'b'].map((v) => H.pauta({ tipo: 'mel', id: 'coral4', voz: v, bpm: 66 })).join(''),
    exs: [
      { nome: 'Quatro vozes', dur: '20 min/dia', bpm: 66, obj: 'Leitura SATB.', passos: ['Toque a voz de soprano, depois contralto, tenor e baixo.', 'Respire só nos fins de frase (compassos 4 e 8).', 'Dinâmica suave e som redondo.'], crit: 'As quatro vozes sem erro a ♩ = 72.' },
      { nome: 'Preparação para o teste', dur: '20 min/dia', obj: 'Estar pronto para a avaliação.', passos: ['Escalas maiores e menores das tonalidades do hinário.', 'Leitura à primeira vista de hinos que você ainda não estudou (no seu hinário).', 'Afinação com o afinador e com outro músico.', 'Grave e ouça.'], crit: 'Lê um hino novo do começo ao fim sem parar e afinado.' },
    ],
    err: [['Tocar a voz errada ou trocar de voz no meio.', 'Marque a lápis qual pauta e qual voz você toca.'], ['Respirar fora dos sinais.', 'O hinário tem sinais de respiração: siga-os.'], ['Volume acima do conjunto.', 'Na orquestra, ninguém se destaca: o som deve se misturar.']],
    tempo: '30 minutos por dia.',
    crit: ['Toco as quatro vozes do coral sem erro.', 'Sei qual hinário (afinação) é o do meu instrumento.', 'Leio um hino novo do meu hinário sem parar.'],
    quiz: [
      { p: 'Quantos hinos tem o hinário nº 5?', o: ['640', '480', '524', '300'], c: 1 },
      { p: 'Desde quando o hinário nº 5 está em uso?', o: ['17 de março de 2013', '1922', '1999', '1985'], c: 0 },
      { p: 'No formato SATB, o tenor e o baixo ficam na…', o: ['clave de Sol', 'clave de Fá', 'clave de Dó', 'mesma pauta do soprano'], c: 1 },
      { p: 'Quem é o maestro da orquestra local?', o: ['o instrutor', 'o encarregado', 'o organista', 'o ancião'], c: 1 },
      { p: 'O ensino musical na CCB é…', o: ['pago', 'gratuito, nos GEM', 'só por internet', 'só em conservatório'], c: 1 },
    ],
    tarefa: 'Estude as quatro vozes do coral e um hino novo por semana no seu hinário, com seu instrutor.',
  });

  // =====================================================================
  C.mod({ n: 14, nivel: 'avancado', titulo: 'Repertório avançado', desc: 'Como estudar uma peça, métodos e estudos por nível, preparação de recital e audição.' });

  C.aula({
    id: '14-1', titulo: 'Como estudar uma peça do zero ao palco', tempo: 'projeto de 4–8 semanas',
    obj: 'Aplicar um método profissional de estudo de repertório.',
    apr: ['Escolha da peça', 'Análise e divisão', 'Estudo lento e progressivo', 'Interpretação', 'Memorização e performance'],
    teo: '<ol><li><b>Escolha:</b> uma peça um pouco acima do seu nível (desafiadora, não impossível).</li><li><b>Escuta:</b> ouça 3 gravações diferentes; anote o que gosta em cada.</li><li><b>Análise:</b> forma, tonalidades, frases, trechos difíceis, respirações.</li><li><b>Divisão:</b> trechos de 4–8 compassos; numere-os por dificuldade.</li><li><b>Estudo lento:</b> 60% do andamento final; suba 4 BPM por dia; trechos difíceis em laço, com ritmos variados.</li><li><b>Junção:</b> una os trechos; toque “de ponta a ponta” 1× por dia, sem parar.</li><li><b>Interpretação:</b> dinâmica, fraseado, vibrato, articulação de estilo.</li><li><b>Simulação:</b> toque para alguém, grave em vídeo, toque com roupa de apresentação.</li></ol>',
    pra: '<p>Escolha a peça na aba <a href="#repertorio">Repertório</a> (nível avançado) e marque como “estudando”. Escreva o cronograma: semanas 1–2 (análise e trechos), 3–4 (andamento), 5–6 (interpretação), 7–8 (simulações).</p>',
    exs: [{ nome: 'Diário da peça', dur: 'diário', obj: 'Acompanhamento.', passos: ['Anote o andamento atual de cada trecho.', 'Grave uma vez por semana.', 'Liste 1 problema a resolver por dia.'], crit: 'Peça no andamento final e gravada sem parar.' }],
    err: [['Tocar sempre do início.', 'O começo fica ótimo e o fim, ruim. Estude por trechos, começando pelos difíceis.'], ['Pular para o andamento final cedo.', 'Paciência: a velocidade é consequência da precisão.']],
    tempo: '4 a 8 semanas por peça.',
    crit: ['Peça avançada completa no andamento, gravada sem parar.', 'Apresentei a peça para pelo menos uma pessoa.'],
    quiz: [
      { p: 'Ao estudar uma peça, os trechos difíceis devem…', o: ['ser deixados para o fim', 'ser estudados primeiro e em laço', 'ser pulados', 'ser tocados rápido'], c: 1 },
      { p: 'Andamento inicial recomendado:', o: ['o final', 'cerca de 60% do final', 'o mais lento possível sempre', 'o dobro'], c: 1 },
    ],
    tarefa: 'Inicie o diário da sua peça avançada.',
  });

  C.aula({
    id: '14-2', titulo: 'Métodos e estudos por nível', tempo: '20 min',
    obj: 'Conhecer os métodos e estudos reconhecidos para o seu instrumento e montar seu plano de estudos técnicos.',
    apr: ['Métodos completos', 'Estudos técnicos e melódicos', 'Como usar um método sem decorar', 'Direitos autorais'],
    teo: (I) => `<p>Os métodos publicados são o resultado de gerações de professores. Este curso <b>não reproduz</b> esses métodos (respeite os direitos autorais: compre as edições ou use bibliotecas e escolas de música); ele indica quais estudar e quando. Os exercícios marcados como “original deste app” foram criados aqui.</p>
      <p>Principais referências para ${I.nomeMin}: ${por(I, { sax: 'H. Klosé (Méthode complète, 25 exercícios diários), Rubank (Elementary, Intermediate, Advanced), Universal Method (DeVille), Larry Teal (The Art of Saxophone Playing), Marcel Mule (24 Études faciles, 18 Exercices d’après Berbiguier, Ferling 48 Études), Joseph Viola (The Technique of the Saxophone), Lennie Niehaus (Jazz Conception), Sigurd Raschèr (Top-Tones), Jean-Marie Londeix (Exercices mécaniques, Hello! Mr. Sax).', clarinete: 'H. Klosé (Méthode complète), Rubank, Lazarus, Baermann (Op. 63), Cyrille Rose (32 e 40 Études), Jeanjean, Cavallini, Uhl.', trompete: 'Arban (Complete Conservatory Method), Clarke (Elementary e Technical Studies), Getchell, Irons, Schlossberg, Kopprasch, Colin, Brandt, Charlier.', trombone: 'Arban (edição para trombone), Remington, Fink, Bordogni/Rochut (Melodious Etudes), Tyrrell, Kopprasch, Blazhevich.' })}</p>`,
    pra: '<p>Monte seu “trio” de estudos: (1) um método técnico (escalas/mecanismo), (2) um livro de estudos melódicos, (3) um livro de estilo (jazz, choro…). Estude um pouco de cada por semana.</p>',
    exs: [{ nome: 'Plano técnico', dur: '20 min', obj: 'Organização.', passos: ['Escolha 3 livros (técnico, melódico, estilo) na aba Repertório.', 'Defina 1 exercício de cada por semana.'], crit: 'Plano escrito e livros adquiridos.' }],
    err: [['Pular de método em método.', 'Escolha um e avance de forma consistente.'], ['Usar cópias ilegais.', 'Valorize autores e editoras: compre ou use acervos legais.']],
    tempo: '20 minutos de planejamento.',
    crit: ['Tenho meu trio de livros e um plano semanal.'],
    quiz: [{ p: 'Por que este curso não reproduz os métodos publicados?', o: ['Porque são ruins', 'Por respeito a direitos autorais', 'Porque são fáceis', 'Porque são antigos'], c: 1 }],
    tarefa: 'Adquira (ou retire numa biblioteca) o primeiro livro do seu trio.',
  });

  C.aula({
    id: '14-3', titulo: 'Preparação de recitais e audições', tempo: 'projeto',
    obj: 'Preparar um recital ou audição: repertório, programa, ensaio com pianista, controle da ansiedade.',
    apr: ['Escolha e ordem do repertório', 'Ensaios com acompanhador', 'Preparação física e mental', 'Audições: lista de exigências, trechos orquestrais, leitura à primeira vista'],
    teo: '<p><b>Programa:</b> contraste (lento/rápido, períodos e estilos diferentes), comece com uma peça segura, coloque a mais difícil no meio, termine com uma brilhante.</p><p><b>Ensaios:</b> marque pelo menos 3 ensaios com o pianista; combine respirações, rits. e fermatas.</p><p><b>Ansiedade:</b> é normal. Reduza com: preparação além do necessário, simulações (tocar para pessoas), rotina pré-apresentação (aquecimento curto, respiração 4-4-8), foco na música e não no erro.</p><p><b>Audições</b> (orquestras, bandas, faculdades): leia o edital; prepare exatamente o pedido (peças, escalas, trechos); grave simulações completas; chegue cedo; aqueça bem, mas sem cansar.</p>',
    pra: '<p>Monte um mini-recital de 15 minutos: 3 peças contrastantes (uma erudita, uma brasileira, uma gospel ou jazz). Apresente para família, igreja ou amigos.</p>',
    exs: [{ nome: 'Simulação completa', dur: '15 min, 2×/semana', obj: 'Resistência e segurança.', passos: ['Toque o programa inteiro sem parar, gravando em vídeo.', 'Assista e anote 3 pontos.'], crit: '3 simulações sem parar antes do recital.' }],
    err: [['Estudar muito no dia da apresentação.', 'No dia, apenas aquecimento e uma passagem leve.'], ['Parar ao errar no palco.', 'Siga sempre: o público raramente percebe.']],
    tempo: 'Projeto de 4–8 semanas.',
    crit: ['Apresentei um mini-recital de 15 minutos.'],
    quiz: [{ p: 'No dia da apresentação, é melhor…', o: ['estudar 4 horas', 'só aquecer e fazer uma passagem leve', 'não tocar nada', 'mudar o repertório'], c: 1 }, { p: 'Um bom programa tem…', o: ['peças todas iguais', 'contraste de caráter e estilo', 'só peças rápidas', 'só peças lentas'], c: 1 }],
    tarefa: 'Marque a data do seu mini-recital.',
  });

  // =====================================================================
  C.mod({ n: 15, nivel: 'profissional', titulo: 'Performance profissional', desc: 'Ensaios, bandas, orquestras, estúdio, playback, tecnologia, palco e carreira.' });

  C.aula({
    id: '15-1', titulo: 'Ensaios, bandas, orquestras e leitura profissional', tempo: '30 min',
    obj: 'Funcionar como um profissional em ensaios de banda, big band, orquestra e grupos de igreja.',
    apr: ['Etiqueta de ensaio', 'Tocar em naipe', 'Leitura profissional e marcações a lápis', 'Comunicação musical'],
    teo: '<ul><li><b>Pontualidade:</b> chegue 15–20 minutos antes, montado e aquecido na hora marcada.</li><li><b>Preparo:</b> estude as partes antes; ensaio é para juntar, não para aprender notas.</li><li><b>Lápis sempre:</b> marque respirações, cortes, dinâmicas combinadas, repetições.</li><li><b>Naipe:</b> o 1º (lead) define articulação, dinâmica e fraseado; os outros seguem e equilibram (o 2º e o 3º tocam um pouco abaixo do 1º).</li><li><b>Silêncio entre músicas:</b> não fique “tocando solto” enquanto o regente fala.</li><li><b>Comunicação:</b> sinais de cabeça para entradas, contagem clara, contato visual.</li><li><b>Atitude:</b> aceite correções sem justificar; anote e corrija na próxima vez.</li></ul>',
    pra: '<p>Participe de um grupo (banda da igreja, banda municipal, big band, orquestra de escola). Leve: instrumento, palhetas/óleo, lápis, estante, afinador, garrafa de água.</p>',
    exs: [{ nome: 'Leitura de naipe', dur: '20 min', obj: 'Ler partes reais.', passos: ['Consiga partes de banda/big band (2º ou 3º sax/trompete/trombone/clarinete).', 'Leia à primeira vista e depois com gravação.'], crit: 'Lê partes de naipe acompanhando a gravação.' }],
    err: [['Chegar para aprender a parte no ensaio.', 'Estude antes.'], ['Tocar mais forte que o 1º do naipe.', 'Equilibre: o lead conduz.']],
    tempo: '30 minutos de estudo e participação semanal num grupo.',
    crit: ['Participo de um grupo regularmente.', 'Marco a parte a lápis em todo ensaio.'],
    quiz: [{ p: 'Quem define a articulação e a dinâmica do naipe?', o: ['o mais novo', 'o 1º (lead)', 'o baterista', 'cada um decide'], c: 1 }, { p: 'O ensaio serve para…', o: ['aprender as notas', 'juntar o grupo, com as partes já estudadas', 'conversar', 'improvisar sempre'], c: 1 }],
    tarefa: 'Entre num grupo ou marque ensaios regulares com músicos.',
  });

  C.aula({
    id: '15-2', titulo: 'Estúdio, playback e tecnologia', tempo: '45 min',
    obj: 'Gravar seu instrumento com qualidade, tocar com playback e usar tecnologia (MuseScore, gravação, análise, IA) no estudo.',
    apr: ['Gravação em casa', 'Posição do microfone', 'Tocar com click e playback', 'MuseScore e partituras digitais', 'Análise de áudio e IA como apoio'],
    teo: (I, H) => `<p><b>Gravar em casa:</b> celular já serve para estudo. Para qualidade: microfone USB ou interface + microfone condensador/dinâmico, fone fechado e um programa gratuito (Audacity, GarageBand, Reaper em avaliação).</p>
      ${H.tabela(['Instrumento', 'Posição do microfone (ponto de partida)'], [['Saxofone', 'a 20–40 cm, apontando entre a campana e as chaves de baixo (não só na campana: o som sai também pelos furos)'], ['Clarinete', 'a 30–50 cm, apontando para o meio do corpo (o som sai pelos furos, não só pela campana)'], ['Trompete', 'a 40–60 cm da campana, levemente fora do eixo (evita estalos e brilho excessivo)'], ['Trombone', 'a 40–60 cm da campana, levemente fora do eixo']])}
      <p><b>Estúdio:</b> chegue com a parte estudada; afine com a referência da sessão; use o click; grave várias tomadas; respeite o produtor.</p>
      <p><b>Partituras digitais:</b> <b>MuseScore</b> (gratuito) para escrever, transpor (botão “partitura de concerto”) e gerar partes; tablets com apps de leitura (forScore, MobileSheets) e pedal de virar página.</p>
      <p><b>Análise:</b> use a aba <a href="#afinador">Afinador</a> para medir afinação e estabilidade das suas gravações; use programas com visão espectral para ver harmônicos (timbre). <b>IA</b> pode ajudar a gerar acompanhamentos, explicar teoria, transcrever (com conferência) e planejar estudos — mas não substitui o ouvido e o professor: confira sempre.</p>`,
    pra: '<p>Grave uma música completa com playback: ajuste o volume do playback, use fone, grave 3 tomadas, escolha a melhor e analise afinação e ritmo.</p>',
    exs: [{ nome: 'Produção caseira', dur: '45 min', obj: 'Gravar com qualidade.', passos: ['Teste 3 posições de microfone e compare.', 'Grave com playback e fone.', 'Analise a gravação na aba Afinador.'], crit: 'Gravação limpa, sem estouros, com afinação média ±10 cents.' }, { nome: 'MuseScore', dur: '30 min', obj: 'Escrita digital.', passos: ['Escreva 16 compassos de uma melodia.', 'Alterne a partitura de concerto e gere a parte transposta.'], crit: 'Parte transposta correta para seu instrumento.' }],
    err: [['Microfone colado na campana.', 'Afaste e teste: o som do instrumento inteiro é mais bonito.'], ['Gravar sem fone (vaza o playback).', 'Use fone fechado.']],
    tempo: '45 minutos e prática contínua.',
    crit: ['Gravei uma música com playback com qualidade.', 'Escrevi e transpus uma parte no MuseScore.'],
    quiz: [{ p: 'No clarinete e no sax, o microfone colado na campana…', o: ['é o ideal', 'perde parte do som, que sai também pelos furos', 'melhora a afinação', 'é obrigatório'], c: 1 }, { p: 'A IA no estudo deve ser usada…', o: ['como substituta do ouvido', 'como apoio, conferindo sempre', 'nunca', 'só para jogos'], c: 1 }],
    tarefa: 'Grave uma música com playback e compartilhe com alguém de confiança para opinião.',
  });

  C.aula({
    id: '15-3', titulo: 'Palco, disciplina e carreira', tempo: '30 min',
    obj: 'Desenvolver postura de palco, disciplina profissional, saúde e organização de carreira.',
    apr: ['Postura de palco', 'Repertório profissional pronto', 'Saúde do músico', 'Organização: agenda, cachê, contratos, divulgação'],
    teo: '<ul><li><b>Palco:</b> entre com segurança, cumprimente, posicione-se de forma que o público veja seu rosto; agradeça os aplausos; não demonstre erros com expressões.</li><li><b>Repertório pronto:</b> mantenha uma lista de músicas prontas para tocar a qualquer momento (casamentos, cultos, eventos), com introduções e finais.</li><li><b>Saúde:</b> aquecimento e desaquecimento; pausas; postura; proteção auditiva (protetores de músico) em ensaios altos; hidratação; cuidado com lábios (lesões por excesso nos metais).</li><li><b>Carreira:</b> pontualidade e confiabilidade são as maiores “propagandas”; combine cachê e condições por escrito; tenha vídeos de boa qualidade; mantenha contato com músicos e regentes.</li></ul>',
    pra: '<p>Monte sua lista de repertório profissional (mínimo 30 músicas) com tonalidade de concerto, tonalidade escrita, introdução e final de cada uma.</p>',
    exs: [{ nome: 'Lista profissional', dur: 'contínuo', obj: 'Estar pronto.', passos: ['Liste 30 músicas por categoria (culto, casamento, jazz, brasileira…).', 'Marque as prontas.', 'Adicione 1 por semana.'], crit: '30 músicas prontas, com introdução e final.' }],
    err: [['Aceitar trabalhos sem condições combinadas.', 'Combine horário, repertório, cachê e equipamento por escrito.'], ['Tocar com dor.', 'Dor é sinal de alerta: pare e procure orientação.']],
    tempo: '30 minutos e organização contínua.',
    crit: ['Tenho 30 músicas prontas.', 'Uso proteção auditiva em ambientes altos.'],
    quiz: [{ p: 'A maior “propaganda” de um músico profissional é…', o: ['as redes sociais', 'pontualidade e confiabilidade', 'o instrumento caro', 'tocar alto'], c: 1 }],
    tarefa: 'Monte a lista de 30 músicas e grave um vídeo de apresentação.',
  });

  // =====================================================================
  C.mod({ n: 16, nivel: 'profissional', titulo: 'Identidade musical e domínio artístico', desc: 'Influências, som próprio, composição, projeto artístico e plano de estudo para a vida.' });

  C.aula({
    id: '16-1', titulo: 'Seu som e sua voz', tempo: 'contínuo',
    obj: 'Construir uma identidade sonora e musical própria, a partir de influências conscientes.',
    apr: ['Árvore de influências', 'Escuta ativa', 'Do imitar ao criar', 'Escolhas de equipamento, timbre e repertório'],
    teo: '<p>Todos os grandes começaram imitando. A identidade surge quando você <b>combina</b> influências de forma pessoal. Monte sua <b>árvore de influências</b>: 3 instrumentistas do seu instrumento, 2 de outros instrumentos, 1 cantor(a) e 1 compositor(a). Para cada um, liste o que você quer “herdar” (o timbre de um, o fraseado de outro, a articulação de um terceiro).</p><p>Ouça ativamente: a cada semana, uma gravação ouvida com atenção total, anotando o que acontece. Transcreva sempre. Com o tempo, filtre: fique com o que soa como você.</p>',
    pra: '<p>Grave a mesma melodia uma vez por mês durante 6 meses. Compare: o som está ficando mais “seu”?</p>',
    exs: [{ nome: 'Árvore de influências', dur: '30 min', obj: 'Clareza artística.', passos: ['Escreva sua árvore (7 nomes).', 'Para cada um, 1 característica a desenvolver.', 'Escolha uma gravação de cada para transcrever ao longo do ano.'], crit: 'Árvore escrita e plano anual de transcrições.' }],
    err: [['Imitar um único artista para sempre.', 'Combine várias influências.'], ['Buscar “originalidade” sem base.', 'Identidade nasce de muito vocabulário bem assimilado.']],
    tempo: 'Contínuo.',
    crit: ['Escrevi minha árvore de influências.', 'Tenho 6 gravações mensais para comparar meu som.'],
    quiz: [{ p: 'Como se forma uma identidade musical?', o: ['sem ouvir ninguém', 'combinando influências de forma pessoal a partir de muito vocabulário', 'copiando um só artista', 'trocando de equipamento'], c: 1 }],
    tarefa: 'Comece o plano anual de transcrições da sua árvore.',
  });

  C.aula({
    id: '16-2', titulo: 'Composição, projeto artístico e estudo para a vida', tempo: 'contínuo',
    obj: 'Compor, criar um projeto artístico próprio e manter um plano de desenvolvimento contínuo.',
    apr: ['Compor a partir de motivos', 'Projeto artístico (álbum, recital, ministério musical)', 'Plano anual de estudo', 'Ensinar como forma de aprender'],
    teo: '<p><b>Compor</b> usa tudo que você aprendeu: um motivo (aula 11.1), uma harmonia (módulo 8), uma forma (A-A-B-A, blues, rondó). Comece com peças curtas: um coral de 16 compassos, um blues, um choro em forma A-B-A, uma melodia gospel.</p><p><b>Projeto artístico:</b> defina um objetivo concreto de 6–12 meses — um EP gravado, um recital temático, um repertório instrumental para a igreja, um grupo próprio.</p><p><b>Estudo para a vida:</b> mantenha diariamente notas longas, escalas e leitura; renove repertório; faça as avaliações periódicas deste app; ensine alunos iniciantes (ensinar organiza o que você sabe).</p>',
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'coral' }) + '<p>Use o “Coral da Manhã” como modelo de forma (8 compassos, duas frases) e componha o seu coral. Escreva no MuseScore e toque com teclado.</p>',
    exs: [{ nome: 'Três composições', dur: 'um mês', obj: 'Criar.', passos: ['Um coral de 16 compassos.', 'Um blues de 12 compassos com tema e solo.', 'Uma peça livre no seu estilo favorito.'], crit: 'Três peças escritas e gravadas.' }, { nome: 'Projeto de 12 meses', dur: '1 hora', obj: 'Direção.', passos: ['Escreva o projeto: objetivo, repertório, prazo, parceiros, etapas mensais.'], crit: 'Projeto escrito com etapas mensais.' }],
    err: [['Esperar inspiração.', 'Compor é ofício: escreva um pouco todo dia.'], ['Parar de estudar o básico.', 'Notas longas e escalas são para sempre.']],
    tempo: 'Contínuo.',
    crit: ['Compus três peças.', 'Escrevi meu projeto artístico de 12 meses.', 'Faço avaliações periódicas no app.'],
    quiz: [{ p: 'O que manter diariamente por toda a vida musical?', o: ['nada', 'notas longas, escalas e leitura', 'só repertório', 'só improviso'], c: 1 }, { p: 'Ensinar ajuda porque…', o: ['dá dinheiro só', 'organiza e aprofunda o que você sabe', 'substitui o estudo', 'não ajuda'], c: 1 }],
    tarefa: 'Faça a avaliação semestral completa e recomece o ciclo com novas metas.',
  });
})();
