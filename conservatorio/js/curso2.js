/* Conservatório de Sopros — módulos 5 a 10 (Básico a Intermediário avançado) */
(function () {
  'use strict';
  const C = window.Curso;
  const por = (I, m) => window.H.por(I, m);
  const ton = (I) => (!I.grave ? 'C4' : 'Bb2');
  const nomeTon = (I) => (!I.grave ? 'Dó' : 'Si♭');

  // =====================================================================
  C.mod({ n: 5, nivel: 'basico', titulo: 'Escalas e tonalidades', desc: 'Tons e semitons, acidentes, escala maior, ciclo das quintas, armaduras, escalas menores e intervalos.' });

  C.aula({
    id: '5-1', titulo: 'Tons, semitons, acidentes e enarmonia', tempo: '40 min',
    obj: 'Entender a menor distância entre notas (semitom), os acidentes e as notas enarmônicas, e tocar a escala cromática.',
    apr: ['Semitom e tom', 'Sustenido, bemol, bequadro, dobrado sustenido e dobrado bemol', 'Acidente fixo × ocorrente', 'Enarmonia', 'Escala cromática'],
    teo: (I, H) => `<p>Na música ocidental, a oitava se divide em <b>12 semitons</b> iguais (o sistema de <b>temperamento igual</b>). O <b>semitom</b> é a menor distância entre duas notas (no piano, de uma tecla para a vizinha, branca ou preta). O <b>tom</b> é a soma de dois semitons.</p>
      <p>Entre as notas naturais, há semitom apenas entre <b>Mi–Fá</b> e <b>Si–Dó</b>; todas as outras vizinhas estão a um tom.</p>
      ${H.tabela(['Acidente', 'Símbolo', 'Efeito'], [['Sustenido', '♯', 'sobe ½ tom'], ['Bemol', '♭', 'abaixa ½ tom'], ['Bequadro', '♮', 'cancela o acidente anterior'], ['Dobrado sustenido', '𝄪', 'sobe 1 tom'], ['Dobrado bemol', '𝄫', 'abaixa 1 tom']])}
      <p><b>Acidente fixo</b> (na armadura de clave) vale para a música inteira, em todas as oitavas. <b>Acidente ocorrente</b> (escrito junto à nota) vale <b>até o fim do compasso</b>, apenas naquela altura. <b>Acidente de precaução</b> (às vezes entre parênteses) só lembra o leitor.</p>
      <p><b>Enarmonia:</b> notas com nomes diferentes e o mesmo som (no temperamento igual). Ex.: Dó♯ = Ré♭; Mi♯ = Fá; Si = Dó♭. O nome depende da função na tonalidade.</p>`,
    pra: (I, H) => `<p>${I.familia === 'metal' ? 'No seu instrumento, notas enarmônicas usam a mesma combinação de pistos/posição.' : 'No seu instrumento, notas enarmônicas têm o mesmo dedilhado. Mas algumas têm dedilhados alternativos que facilitam conforme o contexto (ex.: Si♭ e Lá♯ no sax: bis, “1 e 1” ou lateral).'} Escala cromática: sobe-se com sustenidos e desce-se com bemóis.</p>` +
      H.pauta({ tipo: 'escala', escala: 'cromatica', tonica: ton(I), oitavas: 1, dur: 2, titulo: 'Escala cromática em colcheias', bpm: 60 }),
    exs: [
      { nome: 'Mapa dos semitons', dur: '10 min', obj: 'Visualizar tons e semitons.', passos: ['Escreva Dó-Ré-Mi-Fá-Sol-Lá-Si-Dó e marque T ou S entre cada par.', 'Toque cada par e ouça a diferença entre tom e semitom.'], crit: 'Marca corretamente e ouve a diferença.' },
      { nome: 'Cromática diária', dur: '10 min', bpm: 60, obj: 'Domínio de todas as notas.', passos: ['Cromática de 1 oitava em colcheias, ligada.', 'Depois articulada.', 'Amplie para toda a extensão confortável.'], crit: 'Uma oitava em semicolcheias a ♩ = 80, ligada e articulada.' },
    ],
    met: [['Cromática em colcheias', 60, 120], ['Cromática em semicolcheias', 60, 80]],
    err: [['Esquecer que o acidente ocorrente vale até o fim do compasso.', 'Ao ler, marque mentalmente: “a partir daqui, todo Fá é Fá♯ neste compasso”.'], ['Achar que Mi♯ ou Si♯ não existem.', 'Existem: Mi♯ soa Fá. Aparecem em tonalidades com muitos sustenidos.'], ['Cromática irregular (dedos atropelando).', 'Devagar com metrônomo; use os dedilhados cromáticos (no sax: Fá♯ com o 6, Si♭ lateral).']],
    tempo: '40 minutos e a escala cromática todos os dias.',
    crit: ['Sei onde estão os semitons naturais.', 'Explico acidente fixo e ocorrente.', 'Toco a cromática de 1 oitava em semicolcheias a ♩ = 80.'],
    quiz: [
      { p: 'Entre quais notas naturais há semitom?', o: ['Dó–Ré e Fá–Sol', 'Mi–Fá e Si–Dó', 'Ré–Mi e Lá–Si', 'Sol–Lá e Dó–Ré'], c: 1 },
      { p: 'Um sustenido escrito no 1º tempo vale…', o: ['só naquela nota', 'até o fim do compasso, naquela altura', 'até o fim da música', 'para todas as oitavas da música'], c: 1 },
      { p: 'Fá♯ é enarmônico de…', o: ['Sol♭', 'Mi♯', 'Sol♯', 'Fá♭'], c: 0 },
      { p: 'Dobrado sustenido sobe…', o: ['½ tom', '1 tom', '1½ tom', '2 tons'], c: 1 },
    ],
    tarefa: 'Toque a cromática todos os dias e registre o andamento máximo limpo na aba Escalas.',
  });

  C.aula({
    id: '5-2', titulo: 'A escala maior', tempo: '40 min + 15 min por dia',
    obj: 'Construir qualquer escala maior pela fórmula e tocar as primeiras escalas maiores de memória.',
    apr: ['Fórmula T-T-S-T-T-T-S', 'Graus da escala e seus nomes', 'Como construir em qualquer nota', 'Tocar de memória com metrônomo'],
    teo: (I, H) => `<p>A <b>escala maior</b> é formada por 7 notas com a sequência de distâncias <b>Tom – Tom – Semitom – Tom – Tom – Tom – Semitom</b>. Dó maior é a única só com notas naturais. Para construir em outra nota, aplique a fórmula e acrescente os acidentes necessários, usando <b>cada letra uma vez</b>.</p>
      ${H.tabela(['Grau', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'], [['Nome', 'Tônica', 'Supertônica', 'Mediante', 'Subdominante', 'Dominante', 'Superdominante', 'Sensível'], ['Em Dó', 'Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'], ['Em Sol', 'Sol', 'Lá', 'Si', 'Dó', 'Ré', 'Mi', 'Fá♯']])}
      <p>A <b>sensível</b> (VII) fica a meio tom da tônica e “pede” resolução — é o que dá o sentido de conclusão.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'maior', tonica: ton(I), oitavas: 2, dur: 4, bpm: 60 }) +
      H.pauta({ tipo: 'escala', escala: 'maior', tonica: !I.grave ? 'G4' : 'F3', oitavas: 1, dur: 4, bpm: 60 }) +
      H.pauta({ tipo: 'escala', escala: 'maior', tonica: !I.grave ? 'F4' : 'Eb3', oitavas: 1, dur: 4, bpm: 60 }) +
      `<p>Estude as escalas <b>de memória</b>, sem olhar a partitura, pensando no nome das notas. Use a aba <a href="#escalas">Escalas</a> para gerar qualquer outra.</p>`,
    exs: (I) => [
      { nome: 'Construção no papel', dur: '10 min', obj: 'Aplicar a fórmula.', passos: ['Escreva as escalas de Sol, Ré, Fá e Si♭ maior aplicando T-T-S-T-T-T-S.', 'Confira na aba Escalas.'], crit: '4 escalas corretas.' },
      { nome: `Escalas de ${nomeTon(I)}, ${!I.grave ? 'Sol e Fá' : 'Fá e Mi♭'} maior`, dur: '15 min/dia', bpm: 60, obj: 'Tocar de memória.', passos: ['Semínimas, ligado, depois articulado.', 'Suba 4 BPM a cada 3 execuções limpas.', 'Depois colcheias.'], crit: 'As três escalas, de memória, em colcheias a ♩ = 100.' },
    ],
    met: [['Escala em semínimas', 60, 120], ['Escala em colcheias', 60, 100]],
    err: [['Esquecer o acidente no meio da escala.', 'Antes de tocar, diga a armadura (“Sol maior: Fá♯”).'], ['Repetir letras (ex.: Sol♭ e Sol na mesma escala).', 'Cada letra aparece uma vez.'], ['Correr e perder a regularidade.', 'Regularidade > velocidade.']],
    tempo: '40 minutos e 15 minutos por dia.',
    crit: ['Construo qualquer escala maior no papel.', 'Toco três escalas maiores de memória em colcheias a ♩ = 100.'],
    quiz: [
      { p: 'Qual é a fórmula da escala maior?', o: ['T-S-T-T-S-T-T', 'T-T-S-T-T-T-S', 'S-T-T-T-S-T-T', 'T-T-T-S-T-T-S'], c: 1 },
      { p: 'Quais acidentes tem Ré maior?', o: ['Fá♯', 'Fá♯ e Dó♯', 'Si♭', 'Si♭ e Mi♭'], c: 1 },
      { p: 'O VII grau a meio tom da tônica chama-se…', o: ['dominante', 'sensível', 'mediante', 'subdominante'], c: 1 },
      { p: 'Qual escala maior tem um bemol (Si♭)?', o: ['Sol', 'Fá', 'Ré', 'Mi'], c: 1 },
    ],
    tarefa: 'Aprenda mais uma escala maior por semana seguindo o ciclo das quintas (próxima aula).',
  });

  C.aula({
    id: '5-3', titulo: 'Ciclo das quintas, armaduras e tonalidade', tempo: '45 min',
    obj: (I) => `Dominar o ciclo das quintas, as 15 armaduras e a diferença entre tonalidade escrita e tonalidade real${I.transp.s ? ' no ' + I.curto.toLowerCase() : ''}.`,
    apr: ['Ordem dos sustenidos e bemóis', 'Ciclo das quintas', 'Como descobrir a tonalidade pela armadura', 'Tonalidade escrita × real'],
    teo: (I, H) => {
      const M = window.Musica;
      return `<p>Seguindo de 5ª em 5ª a partir de Dó (Dó → Sol → Ré → Lá…), cada nova escala maior ganha <b>um sustenido</b>. Seguindo de 4ª em 4ª (Dó → Fá → Si♭ → Mi♭…), cada uma ganha <b>um bemol</b>. Esse círculo é o <b>ciclo das quintas</b>.</p>
        <p><b>Ordem dos sustenidos:</b> Fá – Dó – Sol – Ré – Lá – Mi – Si. <b>Ordem dos bemóis:</b> Si – Mi – Lá – Ré – Sol – Dó – Fá (a ordem inversa).</p>
        <p><b>Descobrir a tonalidade maior:</b> com sustenidos, o último sustenido é a sensível — a tônica é meio tom acima (último ♯ = Dó♯ → Ré maior). Com bemóis, a tônica é o <b>penúltimo bemol</b> (Si♭, Mi♭ → Si♭ maior); com um só bemol, Fá maior.</p>
        ${H.tabela(['Concerto', 'Armadura'], M.CICLO.map((t) => { const n = M.parse(t + '4'); return [M.nomeBR(n) + ' maior', M.descArmadura(n)]; }))}
        <p>${I.transp.s ? `<b>Tonalidade escrita × real:</b> o que está na sua partitura é a tonalidade <b>escrita</b>. A banda, o teclado e o cantor pensam na tonalidade <b>real</b> (de concerto). Quando o tecladista diz “vamos em Mi♭”, você precisa saber que vai ler em <b>${M.nomeBR(M.tomEscrito(M.parse('Eb4'), 'maior', I).tonica)} maior</b>. Use a tabela da aba Transpositor.` : 'No trombone, a tonalidade escrita é a real. Mas para conversar com saxofonistas, clarinetistas e trompetistas, saiba que eles leem em outra tonalidade (veja o Transpositor).'}</p>`;
    },
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'maior', tonica: 'Eb4', concerto: true, oitavas: 1, dur: 4, titulo: 'Mi♭ maior de concerto — como ela aparece para você', bpm: 72 }) +
      H.pauta({ tipo: 'escala', escala: 'maior', tonica: 'Bb4', concerto: true, oitavas: 1, dur: 4, titulo: 'Si♭ maior de concerto — tom muito comum em bandas e igrejas', bpm: 72 }),
    exs: [
      { nome: 'Ciclo de memória', dur: '10 min', obj: 'Decorar o ciclo.', passos: ['Escreva o ciclo (Dó, Sol, Ré, Lá, Mi, Si, Fá♯ / Fá, Si♭, Mi♭, Lá♭, Ré♭, Sol♭).', 'Ao lado, o número de acidentes.', 'Diga em voz alta em 30 segundos.'], crit: 'Recita o ciclo inteiro em menos de 30 s.' },
      { nome: 'Escala da semana', dur: '15 min/dia', bpm: 60, obj: 'Avançar uma tonalidade por semana.', passos: ['Siga o ciclo a partir das escalas que já sabe.', 'Toque em semínimas, colcheias e com arpejo.'], crit: 'Cada nova escala em colcheias a ♩ = 100 de memória.' },
    ],
    met: [['Escala da semana', 60, 120]],
    err: [['Confundir a tonalidade escrita com a real em ensaios.', 'Pergunte sempre “de concerto?” e converta.'], ['Achar que armadura igual = mesma música.', 'A mesma armadura serve a uma tonalidade maior e à sua relativa menor (próxima aula).']],
    tempo: '45 minutos e uma nova escala por semana.',
    crit: ['Recito a ordem dos sustenidos e bemóis.', 'Identifico a tonalidade maior pela armadura em 5 segundos.', 'Sei em que tonalidade escrita toco quando a banda diz o tom de concerto.'],
    quiz: (I) => {
      const M = window.Musica;
      const r = M.tomEscrito(M.parse('Bb4'), 'maior', I).tonica;
      return [
        { p: 'Qual a ordem dos sustenidos?', o: ['Si Mi Lá Ré', 'Fá Dó Sol Ré Lá Mi Si', 'Dó Ré Mi Fá', 'Sol Ré Lá Mi'], c: 1 },
        { p: 'Armadura com 3 bemóis indica…', o: ['Si♭ maior', 'Mi♭ maior', 'Lá♭ maior', 'Fá maior'], c: 1 },
        { p: 'Armadura com 4 sustenidos indica…', o: ['Lá maior', 'Mi maior', 'Si maior', 'Ré maior'], c: 1 },
        { p: 'A banda vai tocar em Si♭ maior (concerto). Você lê em…', o: [M.nomeBR(r) + ' maior', 'Si♭ maior', 'Mi♭ maior', 'Fá maior'].filter((x, i, a) => a.indexOf(x) === i).concat(['Lá maior']).slice(0, 4), c: 0 },
      ];
    },
    tarefa: 'Pergunte ao músico de teclado da sua igreja/grupo os tons mais usados e converta todos para o seu instrumento.',
  });

  C.aula({
    id: '5-4', titulo: 'Escalas menores: natural, harmônica e melódica', tempo: '45 min + 15 min por dia',
    obj: 'Construir e tocar os três tipos de escala menor e entender relativas e homônimas.',
    apr: ['Menor natural', 'Menor harmônica (7º grau elevado)', 'Menor melódica (6º e 7º elevados na subida)', 'Relativa e homônima'],
    teo: (I, H) => `<p>A <b>menor natural</b> segue a fórmula T-S-T-T-S-T-T. Ela começa no <b>6º grau</b> da escala maior: Lá menor usa as mesmas notas de Dó maior. Por isso Lá menor é a <b>relativa</b> de Dó maior (mesma armadura). A relativa menor fica uma <b>3ª menor abaixo</b> da maior.</p>
      <p>A <b>menor harmônica</b> eleva o 7º grau, criando a <b>sensível</b> (Sol♯ em Lá menor) e o som “árabe/cigano” do intervalo de 2ª aumentada entre o 6º e o 7º graus. É a base da harmonia menor (o acorde V maior).</p>
      <p>A <b>menor melódica</b> eleva o 6º e o 7º graus na <b>subida</b> (para suavizar a 2ª aumentada) e, na tradição clássica, <b>desce como a natural</b>. No jazz, ela é usada igual na subida e na descida (“menor melódica jazz”).</p>
      <p><b>Homônimas</b> são escalas com a mesma tônica e modos diferentes (Dó maior e Dó menor).</p>
      ${H.tabela(['Tipo', 'Lá menor', 'Graus alterados'], [['Natural', 'Lá Si Dó Ré Mi Fá Sol', '—'], ['Harmônica', 'Lá Si Dó Ré Mi Fá <b>Sol♯</b>', '7º elevado'], ['Melódica (subindo)', 'Lá Si Dó Ré Mi <b>Fá♯ Sol♯</b>', '6º e 7º elevados']])}`,
    pra: (I, H) => {
      const t = !I.grave ? 'A4' : 'G2';
      return ['menorNat', 'menorHarm', 'menorMel'].map((e) => H.pauta({ tipo: 'escala', escala: e, tonica: t, oitavas: 1, dur: 4, bpm: 60 })).join('');
    },
    exs: [
      { nome: 'Três menores', dur: '15 min/dia', bpm: 60, obj: 'Diferenciar os três tipos de ouvido e nos dedos.', passos: ['Toque a natural, a harmônica e a melódica em sequência.', 'Cante (ou ouça) e perceba a diferença no 6º e 7º graus.', 'Toque a relativa maior em seguida.'], crit: 'Três tipos de memória em colcheias a ♩ = 92.' },
      { nome: 'Relativas', dur: '5 min', obj: 'Ligar maior e menor.', passos: ['Para cada escala maior que você sabe, ache a relativa (3ª menor abaixo).', 'Toque as duas em sequência.'], crit: 'Encontra a relativa em 5 segundos.' },
    ],
    met: [['Menor harmônica', 60, 100], ['Menor melódica', 60, 100]],
    err: [['Tocar a melódica descendo com 6º e 7º elevados (no contexto clássico).', 'Na tradição clássica, ela desce natural. No jazz, não.'], ['Confundir relativa com homônima.', 'Relativa = mesma armadura; homônima = mesma tônica.']],
    tempo: '45 minutos e 15 minutos por dia.',
    crit: ['Construo os três tipos de menor no papel.', 'Toco os três tipos em uma tonalidade, de memória, a ♩ = 92 em colcheias.', 'Encontro a relativa de qualquer escala maior.'],
    quiz: [
      { p: 'A relativa menor de Fá maior é…', o: ['Ré menor', 'Fá menor', 'Lá menor', 'Dó menor'], c: 0 },
      { p: 'Na menor harmônica, qual grau é elevado?', o: ['3º', '6º', '7º', '5º'], c: 2 },
      { p: 'A menor melódica (clássica) na descida…', o: ['mantém 6º e 7º elevados', 'volta à forma natural', 'eleva o 3º', 'não existe'], c: 1 },
      { p: 'Dó maior e Dó menor são…', o: ['relativas', 'homônimas', 'enarmônicas', 'iguais'], c: 1 },
    ],
    tarefa: 'Junto com a escala maior da semana, estude a relativa menor nas três formas.',
  });

  C.aula({
    id: '5-5', titulo: 'Intervalos', tempo: '45 min',
    obj: 'Classificar, construir e reconhecer intervalos — a base de harmonia, percepção e improvisação.',
    apr: ['Intervalo numérico e qualidade', 'Justos, maiores, menores, aumentados e diminutos', 'Inversão de intervalos', 'Intervalos melódicos e harmônicos'],
    teo: (I, H) => `<p><b>Intervalo</b> é a distância entre duas notas. Conta-se o número de letras incluindo as duas pontas (Dó–Mi: Dó, Ré, Mi = <b>3ª</b>). A <b>qualidade</b> vem do número de semitons.</p>
      ${H.tabela(['Intervalo', 'Semitons', 'Exemplo a partir de Dó'], [['2ª menor', '1', 'Dó–Ré♭'], ['2ª maior', '2', 'Dó–Ré'], ['3ª menor', '3', 'Dó–Mi♭'], ['3ª maior', '4', 'Dó–Mi'], ['4ª justa', '5', 'Dó–Fá'], ['4ª aumentada / 5ª diminuta (trítono)', '6', 'Dó–Fá♯ / Dó–Sol♭'], ['5ª justa', '7', 'Dó–Sol'], ['6ª menor', '8', 'Dó–Lá♭'], ['6ª maior', '9', 'Dó–Lá'], ['7ª menor', '10', 'Dó–Si♭'], ['7ª maior', '11', 'Dó–Si'], ['8ª justa', '12', 'Dó–Dó']])}
      <p><b>Justos:</b> 1ª, 4ª, 5ª e 8ª. <b>Maiores/menores:</b> 2ª, 3ª, 6ª, 7ª. Aumentado = 1 semitom a mais que o justo/maior; diminuto = 1 a menos que o justo/menor.</p>
      <p><b>Inversão:</b> some a nota de baixo uma oitava acima. Os números somam 9 (3ª ↔ 6ª, 2ª ↔ 7ª) e as qualidades trocam (maior ↔ menor, aumentado ↔ diminuto, justo continua justo).</p>
      <p><b>Melódico</b>: notas uma após a outra. <b>Harmônico</b>: notas juntas (como num acorde, ou em duo com outro instrumento).</p>`,
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'maior', tonica: ton(I), padrao: 'tercas', oitavas: 1, dur: 2, titulo: 'Escala maior por terças', bpm: 60 }) +
      '<p>Toque também os intervalos a partir da tônica: 1–2, 1–3, 1–4… 1–8, cantando por dentro antes de tocar. Depois treine na aba <a href="#ouvido">Treino auditivo</a>.</p>',
    exs: [
      { nome: 'Construir intervalos', dur: '15 min', obj: 'Fluência teórica.', passos: ['Escreva, a partir de Ré, Fá e Si♭: 3ª maior, 3ª menor, 5ª justa, 6ª maior e 7ª menor.', 'Toque cada um.'], crit: '15 intervalos corretos.' },
      { nome: 'Ouvido', dur: '10 min/dia', obj: 'Reconhecer intervalos.', passos: ['Aba Treino auditivo → Intervalos (básico).', 'Use as músicas de referência.'], crit: '80% de acerto no nível básico.' },
      { nome: 'Escala por terças', dur: '10 min/dia', bpm: 60, obj: 'Técnica e ouvido.', passos: ['Toque a escala por terças em colcheias.', 'Faça nas escalas que já sabe.'], crit: 'Em colcheias a ♩ = 92 de memória.' },
    ],
    met: [['Escala por terças', 60, 100]],
    err: [['Contar intervalos sem incluir a primeira nota.', 'Dó–Mi é 3ª: conte Dó (1), Ré (2), Mi (3).'], ['Classificar só pelo número.', 'Qualidade depende dos semitons: Dó–Mi (4) é maior; Dó–Mi♭ (3) é menor.']],
    tempo: '45 minutos e 10 minutos diários de ouvido.',
    crit: ['Classifico qualquer intervalo até a 8ª.', 'Reconheço de ouvido 2ª M, 3ª M, 4ª J, 5ª J e 8ª J com 80% de acerto.', 'Toco a escala por terças a ♩ = 92 em colcheias.'],
    quiz: [
      { p: 'Dó–Sol é…', o: ['4ª justa', '5ª justa', '6ª maior', '5ª aumentada'], c: 1 },
      { p: 'Quantos semitons tem uma 3ª menor?', o: ['2', '3', '4', '5'], c: 1 },
      { p: 'A inversão de uma 3ª maior é…', o: ['6ª menor', '6ª maior', '5ª justa', '3ª menor'], c: 0 },
      { p: 'O trítono tem…', o: ['5 semitons', '6 semitons', '7 semitons', '3 tons e meio'], c: 1 },
    ],
    tarefa: 'Faça o treino de intervalos todos os dias até atingir 80% no nível completo.',
  });

  // =====================================================================
  C.mod({ n: 6, nivel: 'basico', titulo: 'Desenvolvimento da técnica', desc: 'Articulações, dupla e tripla articulação, escalas em todas as tonalidades, arpejos, flexibilidade e velocidade.' });

  C.aula({
    id: '6-1', titulo: 'Articulações: staccato, legato, tenuto, marcato e acentos', tempo: '20 min por dia',
    obj: 'Executar com clareza os principais sinais de articulação e saber quando cada um é usado.',
    apr: ['Legato', 'Staccato e staccatíssimo', 'Tenuto', 'Acento e marcato', 'Combinações (portato, ligado-destacado)'],
    teo: (I, H) => H.tabela(['Sinal', 'Nome', 'Como tocar'], [
      ['curva sobre notas diferentes', 'Legato', 'Só a primeira nota com língua; o ar não para entre as notas.'],
      ['ponto acima/abaixo', 'Staccato', 'Nota curta e leve (cerca de metade). Língua para a nota, apoio continua.'],
      ['cunha ▾', 'Staccatíssimo', 'Mais curto e incisivo.'],
      ['traço —', 'Tenuto', 'Valor inteiro, com língua suave (“du”); notas quase ligadas.'],
      ['&gt;', 'Acento', 'Início mais forte (mais ar no ataque), depois volta ao volume.'],
      ['^', 'Marcato', 'Forte, curto e marcado — acento mais intenso.'],
      ['ponto + curva', 'Portato (meio-staccato)', 'Notas separadas por pouquíssimo silêncio, com “du”.'],
    ]) + `<p>Articulação é <b>estilo</b>: no clássico, o staccato é leve; no jazz, as colcheias são ligadas em grupos e acentuadas no contratempo; no frevo e no funk, as notas curtas são “estaladas” e precisas.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'maior', tonica: ton(I), oitavas: 1, dur: 2, titulo: 'Escala para aplicar os 5 padrões de articulação', bpm: 72 }) +
      `<ol><li>Tudo ligado.</li><li>Tudo staccato.</li><li>Tudo tenuto.</li><li>2 ligadas + 2 destacadas.</li><li>Acento a cada 3 notas (desloca o acento — ótimo para controle).</li></ol>`,
    exs: [
      { nome: 'Cinco articulações', dur: '15 min', bpm: 72, obj: 'Clareza e controle.', passos: ['Escala de 1 oitava em colcheias.', 'Aplique um padrão por vez.', 'Grave e confira se as diferenças são audíveis.'], crit: 'Quem ouve a gravação consegue dizer qual padrão foi tocado.' },
      { nome: 'Staccato rápido', dur: '5 min', bpm: 72, obj: 'Leveza.', passos: ['Mesma nota, colcheias em staccato.', 'Suba até semicolcheias.'], crit: 'Semicolcheias em staccato a ♩ = 100, iguais e leves.' },
    ],
    met: [['Escala com padrões de articulação', 72, 120], ['Staccato em semicolcheias (uma nota)', 72, 100]],
    err: [['Staccato curto com a garganta (“hut”).', 'A língua termina a nota tocando de novo a palheta (ou dentes); a garganta fica aberta.'], ['Acento que muda a afinação.', 'O acento é ar, não pressão de lábio.'], ['Legato com “buracos” nas trocas de nota.', 'Dedos (ou vara) rápidos e ar constante; no trombone, legato com língua “du” suave.']],
    tempo: '20 minutos por dia.',
    crit: ['Toco os 5 padrões de articulação com diferenças audíveis na gravação.', 'Faço staccato em semicolcheias a ♩ = 100.'],
    quiz: [
      { p: 'O tenuto indica…', o: ['nota curta', 'valor inteiro com ataque suave', 'nota muito forte', 'glissando'], c: 1 },
      { p: 'O marcato (^) é…', o: ['mais suave que o acento', 'um acento forte e marcado', 'um tipo de legato', 'um trinado'], c: 1 },
      { p: 'No staccato, a garganta…', o: ['fecha para cortar o som', 'fica aberta; a língua faz o corte', 'não importa', 'empurra o ar'], c: 1 },
    ],
    tarefa: 'Aplique os 5 padrões à escala da semana todos os dias.',
  });

  C.aula({
    id: '6-2', titulo: 'Dupla e tripla articulação', tempo: '10–15 min por dia',
    obj: 'Desenvolver dupla (tu-ku) e tripla (tu-tu-ku) articulação para passagens rápidas.',
    apr: ['Por que usar dupla/tripla', 'Sílabas tu-ku e du-gu', 'Equalizar o “ku” com o “tu”', 'Aplicação em escalas e notas repetidas'],
    teo: (I) => `<p>A língua simples (“tu-tu-tu”) tem um limite de velocidade. A <b>dupla articulação</b> alterna a ponta da língua (“tu”) com o meio/fundo da língua no céu da boca (“ku”), dobrando a velocidade possível. A <b>tripla</b> usa “tu-tu-ku” ou “tu-ku-tu”, para grupos de 3 (tercinas, 6/8).</p>
      <p>${I.familia === 'metal' ? 'Nos metais, a dupla e a tripla são técnicas essenciais (presentes no Arban desde o século XIX).' : 'Nos instrumentos de palheta, a dupla é mais difícil porque o “ku” não toca a palheta. Saxofonistas e clarinetistas avançados a usam em passagens muito rápidas; por isso ela aparece aqui como técnica de longo prazo.'}</p>
      <p>O segredo é deixar o “ku” <b>igual ao “tu”</b> em ataque e volume.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'notas', notas: !I.grave ? 'G4:2 G4:2 G4:2 G4:2 G4:2 G4:2 G4:2 G4:2 A4:2 A4:2 A4:2 A4:2 A4:2 A4:2 A4:2 A4:2 G4:2 G4:2 G4:2 G4:2 G4:2 G4:2 G4:2 G4:2 G4:16' : 'F3:2 F3:2 F3:2 F3:2 F3:2 F3:2 F3:2 F3:2 G3:2 G3:2 G3:2 G3:2 G3:2 G3:2 G3:2 G3:2 F3:2 F3:2 F3:2 F3:2 F3:2 F3:2 F3:2 F3:2 F3:16', tom: !I.grave ? 'C' : 'Bb', titulo: 'Colcheias repetidas: tu-ku-tu-ku', bpm: 60 }),
    exs: [
      { nome: 'Só o “ku”', dur: '3 min', bpm: 60, obj: 'Fortalecer a sílaba fraca.', passos: ['Toque 8 notas só com “ku”.', 'Até soar quase igual ao “tu”.'], crit: '“Ku” com ataque limpo.' },
      { nome: 'Tu-ku lento', dur: '5 min', bpm: 60, obj: 'Igualdade.', passos: ['Colcheias “tu-ku” a ♩ = 60.', 'Suba 4 BPM por dia.'], crit: 'Indistinguível do “tu-tu” na gravação.' },
      { nome: 'Tripla', dur: '5 min', bpm: 60, obj: 'Tercinas rápidas.', passos: ['Tercinas “tu-tu-ku” numa nota.', 'Depois em escala.'], crit: 'Tercinas iguais a ♩ = 100.' },
    ],
    met: [['Dupla em colcheias', 60, 120], ['Dupla em semicolcheias', 60, 120, 'nível avançado'], ['Tripla em tercinas', 60, 120]],
    err: [['“Ku” mais fraco e atrasado.', 'Pratique o “ku” sozinho e acentue-o no início.'], ['Mudar a garganta (fechar) no “ku”.', 'Mantenha a vogal “u” aberta.']],
    tempo: '10–15 minutos por dia, por meses. É técnica de longo prazo.',
    crit: ['Faço “tu-ku” igual em colcheias a ♩ = 100.', 'Faço tercinas com tripla a ♩ = 100.'],
    quiz: [
      { p: 'A dupla articulação alterna…', o: ['tu e du', 'tu e ku', 'ta e da', 'ku e gu'], c: 1 },
      { p: 'O principal desafio é…', o: ['tocar forte', 'igualar o “ku” ao “tu”', 'respirar', 'afinar'], c: 1 },
      { p: 'A tripla serve principalmente para…', o: ['notas longas', 'grupos de três (tercinas, 6/8)', 'legato', 'vibrato'], c: 1 },
    ],
    tarefa: 'Inclua 5 minutos de dupla articulação no bloco de articulação da rotina.',
  });

  C.aula({
    id: '6-3', titulo: 'Escalas em todas as tonalidades e padrões', tempo: '20–30 min por dia',
    obj: 'Dominar as 12 escalas maiores e menores, de memória, com padrões por terças, quartas, grupos de 4 e outros.',
    apr: ['Plano das 12 tonalidades', 'Padrões intervalares', 'Método do metrônomo progressivo', 'Registro do progresso'],
    teo: (I, H) => `<p>Escalas são o “vocabulário” técnico: quase todas as passagens das músicas são pedaços de escalas e arpejos. O objetivo não é velocidade a qualquer custo, mas <b>regularidade, som igual e afinação</b> em todas as tonalidades.</p>
      <h4>Programa</h4>${H.tabela(['Etapa', 'Conteúdo', 'Meta'], [['1', '12 maiores (ciclo das quintas), 1–2 oitavas', 'colcheias a ♩ = 120'], ['2', '12 menores harmônicas e melódicas', 'colcheias a ♩ = 120'], ['3', 'Padrões: terças, grupos de 4, 1-2-3-5, quartas', 'colcheias a ♩ = 100'], ['4', 'Toda a extensão do instrumento (escala “do grave ao agudo”)', 'semicolcheias a ♩ = 100'], ['5', 'Modos, pentatônicas e blues (módulos 11–12)', 'semicolcheias a ♩ = 120']])}
      <p><b>Método do metrônomo:</b> comece onde está 100% limpo; a cada 3 execuções perfeitas, +4 BPM; errou, −8 BPM. Registre o andamento máximo na aba <a href="#escalas">Escalas</a> — a tabela das 12 tonalidades mostra seu mapa de progresso.</p>`,
    pra: (I, H) => ['tercas', 'grupos4', 'p1235', 'quartas'].map((p) => H.pauta({ tipo: 'escala', escala: 'maior', tonica: ton(I), padrao: p, oitavas: 1, dur: 2, bpm: 72 })).join(''),
    exs: [
      { nome: 'Escala + padrão do dia', dur: '20 min/dia', bpm: 60, obj: 'Cobrir todas as tonalidades.', passos: ['Segunda: Dó e Lá m; terça: Sol e Mi m; … siga o ciclo (2 tonalidades por dia).', 'Cada uma: reta, terças, grupos de 4.', 'Registre o andamento máximo limpo.'], crit: 'Mapa das 12 tonalidades preenchido com ♩ ≥ 100.' },
    ],
    met: [['Escala reta em colcheias', 60, 132], ['Terças em colcheias', 60, 112], ['Grupos de 4 em semicolcheias', 50, 96]],
    err: [['Estudar sempre as mesmas tonalidades fáceis.', 'Siga o ciclo; dedique mais tempo às difíceis (Si, Fá♯, Ré♭).'], ['Ritmo irregular (“galopando”).', 'Pratique em ritmos pontuados (longa-curta e curta-longa) para igualar os dedos.'], ['Olhar a partitura em vez de pensar.', 'Escalas são de memória: diga o nome das notas mentalmente.']],
    tempo: '20–30 minutos por dia durante todo o curso.',
    crit: ['Toco as 12 escalas maiores de memória a ♩ = 100 em colcheias.', 'Toco 3 padrões em 6 tonalidades a ♩ = 92.'],
    quiz: [
      { p: 'No método do metrônomo, quando subir o andamento?', o: ['Após cada execução', 'Após 3 execuções limpas seguidas', 'Uma vez por mês', 'Quando der vontade'], c: 1 },
      { p: 'Ritmos pontuados servem para…', o: ['enfeitar', 'igualar os dedos e corrigir irregularidades', 'tocar jazz', 'afinar'], c: 1 },
      { p: 'O objetivo principal das escalas é…', o: ['velocidade máxima', 'regularidade, som igual e afinação em todas as tonalidades', 'decorar partituras', 'impressionar'], c: 1 },
    ],
    tarefa: 'Preencha o mapa das 12 tonalidades na aba Escalas ao longo das próximas semanas.',
  });

  C.aula({
    id: '6-4', titulo: 'Arpejos: tríades, tétrades e inversões', tempo: '20 min por dia',
    obj: 'Tocar arpejos maiores, menores, diminutos, aumentados e de sétima, com inversões, em várias tonalidades.',
    apr: ['O que é arpejo', 'Tríades maior, menor, diminuta e aumentada', 'Tétrades (7M, 7, m7, m7♭5, °7)', 'Inversões', 'Arpejos diatônicos'],
    teo: (I, H) => `<p><b>Arpejo</b> é um acorde tocado nota por nota. Para instrumentos de sopro (que tocam uma nota por vez) os arpejos são a forma de “tocar a harmonia” — fundamentais para solos, contracantos e improvisação.</p>
      ${H.tabela(['Arpejo', 'Fórmula (a partir da fundamental)', 'Exemplo em Dó'], [['Maior', '3ª M + 3ª m (1-3-5)', 'Dó Mi Sol'], ['Menor', '3ª m + 3ª M (1-♭3-5)', 'Dó Mi♭ Sol'], ['Diminuto', '3ª m + 3ª m (1-♭3-♭5)', 'Dó Mi♭ Sol♭'], ['Aumentado', '3ª M + 3ª M (1-3-♯5)', 'Dó Mi Sol♯'], ['Sétima maior (7M)', '1-3-5-7', 'Dó Mi Sol Si'], ['Dominante (7)', '1-3-5-♭7', 'Dó Mi Sol Si♭'], ['Menor com 7ª (m7)', '1-♭3-5-♭7', 'Dó Mi♭ Sol Si♭'], ['Meio-diminuto (m7♭5)', '1-♭3-♭5-♭7', 'Dó Mi♭ Sol♭ Si♭'], ['Diminuto (°7)', '1-♭3-♭5-𝄫7', 'Dó Mi♭ Sol♭ Si𝄫 (=Lá)']])}
      <p><b>Inversão:</b> começar o arpejo pela 3ª (1ª inversão), pela 5ª (2ª inversão) ou pela 7ª (3ª inversão).</p>`,
    pra: (I, H) => ['M', 'm', 'd7', 'dim7'].map((a) => H.pauta({ tipo: 'arpejo', acorde: a, tonica: ton(I), dur: 2, bpm: 72 })).join('') + H.pauta({ tipo: 'escala', escala: 'maior', tonica: ton(I), padrao: 'triades', dur: 2, titulo: 'Tríades diatônicas da escala maior', bpm: 72 }),
    exs: [
      { nome: 'Arpejos da escala da semana', dur: '10 min/dia', bpm: 60, obj: 'Ligar escala e harmonia.', passos: ['Arpejo maior e menor da tônica, 2 oitavas se possível.', 'Tríades diatônicas.', 'Arpejo de 7ª da dominante (V7).'], crit: 'Colcheias a ♩ = 100 de memória.' },
      { nome: 'Inversões', dur: '10 min/dia', bpm: 60, obj: 'Flexibilidade.', passos: ['Arpejo maior nas 3 posições (fundamental, 1ª e 2ª inversão).', 'Ouça como cada inversão muda o “peso”.'], crit: 'Sem hesitar na troca de inversão.' },
    ],
    met: [['Arpejos de tríade', 60, 120], ['Tétrades', 60, 108]],
    err: [['Saltos com notas “quebrando” (falhas de ar).', 'Mantenha o ar constante e prepare a embocadura/garganta para a nota de chegada.'], ['Pensar só em dedos, sem ouvir o acorde.', 'Cante o arpejo antes de tocar.']],
    tempo: '20 minutos por dia.',
    crit: ['Toco arpejos maior, menor, diminuto e aumentado em 6 tonalidades.', 'Toco as tétrades 7M, 7, m7 e m7♭5 de Dó, Fá e Sol.'],
    quiz: [
      { p: 'O arpejo de Dó7 tem…', o: ['Dó Mi Sol Si', 'Dó Mi Sol Si♭', 'Dó Mi♭ Sol Si♭', 'Dó Mi♭ Sol♭ Lá'], c: 1 },
      { p: 'Tríade diminuta = …', o: ['3ª M + 3ª m', '3ª m + 3ª m', '3ª M + 3ª M', '3ª m + 3ª M'], c: 1 },
      { p: 'A 1ª inversão começa pela…', o: ['fundamental', '3ª', '5ª', '7ª'], c: 1 },
    ],
    tarefa: 'Junte ao estudo da escala da semana seus arpejos de tônica e dominante.',
  });

  C.aula({
    id: '6-5', titulo: 'Flexibilidade, velocidade e sincronização', tempo: '15–20 min por dia',
    obj: (I) => I.familia === 'metal' ? 'Desenvolver flexibilidade labial (ligaduras entre harmônicos) e sincronização entre língua e pistos/vara.' : 'Desenvolver harmônicos, flexibilidade de embocadura e sincronização entre dedos e língua.',
    apr: (I) => I.familia === 'metal' ? ['Ligaduras labiais', 'Velocidade do ar e vogais', 'Sincronização língua–pistos/vara', 'Dedos/vara relaxados em velocidade'] : ['Harmônicos (overtones)', 'Flexibilidade da garganta', 'Sincronização dedos–língua', 'Dedos relaxados em velocidade'],
    teo: (I) => por(I, {
      sax: '<p><b>Harmônicos (overtones):</b> com o dedilhado do Si♭ grave, sem mudar os dedos, é possível tocar Si♭ uma oitava acima, Fá, Si♭, Ré… só mudando a velocidade do ar e a forma da garganta (vogais “ô → i”). Esse exercício desenvolve o controle interno que dá som cheio, flexibilidade e, no futuro, o registro altíssimo.</p>',
      clarinete: '<p><b>Harmônicos e 12ªs:</b> no clarinete, os harmônicos do Mi grave (mesmo dedilhado, sem chave de registro) são Si (12ª), Sol♯ (17ª)… Tocar “12ªs ligadas” (Mi grave → Si médio com registro, e depois sem registro, só com a garganta) desenvolve a mesma flexibilidade e prepara o registro agudo.</p>',
      metal: '<p><b>Ligaduras labiais (lip slurs):</b> mantendo os mesmos pistos/posição, passe de um harmônico a outro usando só o ar e a forma interna da boca (vogais “tô → ti” ou “ô → i”). É o principal exercício de flexibilidade dos metais (Arban, Irons, Colin).</p>',
    }) + `<p><b>Sincronização:</b> nas passagens rápidas, ${I.sub === 'trombone' ? 'a vara deve chegar à posição exatamente quando a língua solta a nota' : 'os dedos devem se mover exatamente no instante em que a língua solta a nota'}. Atraso dos dedos causa “notas fantasma” entre as notas.</p>
      <p><b>Relaxamento:</b> velocidade vem de movimentos curtos e dedos/braço soltos. Tensão é o maior inimigo da velocidade.</p>`,
    pra: (I, H) => por(I, {
      sax: H.pauta({ tipo: 'notas', notas: 'Bb3:8 Bb4:8 Bb3:8 Bb4:8 Bb3:8 F5:8 Bb4:8 Bb3:8', tom: 'C', titulo: 'Harmônicos sobre o Si♭ grave (mesmo dedilhado o tempo todo)', bpm: 60 }),
      clarinete: H.pauta({ tipo: 'notas', notas: 'E3:8 B4:8 E3:8 B4:8 F3:8 C5:8 F3:8 C5:8 G3:8 D5:8 G3:16', tom: 'C', titulo: '12ªs ligadas (com e sem a chave de registro)', bpm: 60 }),
      trompete: H.pauta({ tipo: 'notas', notas: 'C4:4 G4:4 C5:4 G4:4 C4:8 r:8 B3:4 F#4:4 B4:4 F#4:4 B3:8 r:8 Bb3:4 F4:4 Bb4:4 F4:4 Bb3:8 r:8', tom: 'C', titulo: 'Ligaduras labiais (0, 2, 1)', bpm: 60 }),
      trombone: H.pauta({ tipo: 'notas', notas: 'Bb2:4 F3:4 Bb3:4 F3:4 Bb2:8 r:8 A2:4 E3:4 A3:4 E3:4 A2:8 r:8 Ab2:4 Eb3:4 Ab3:4 Eb3:4 Ab2:8 r:8', tom: 'Bb', titulo: 'Ligaduras labiais (1ª, 2ª e 3ª posições)', bpm: 60 }),
    }) + H.pauta({ tipo: 'escala', escala: 'maior', tonica: ton(I), padrao: 'grupos4', dur: 1, titulo: 'Velocidade: grupos de 4 em semicolcheias', bpm: 60 }),
    exs: (I) => [
      { nome: I.familia === 'metal' ? 'Ligaduras labiais' : 'Harmônicos', dur: '10 min/dia', bpm: 60, obj: 'Flexibilidade e controle interno.', passos: ['Toque o exemplo devagar, sem mexer dedos/vara.', 'Use as vogais “ô” (grave) e “i” (agudo).', 'Repita em todas as posições/dedilhados graves.'], crit: 'Troca de harmônico limpa, sem “escorregar”, a ♩ = 72.' },
      { nome: 'Ritmos pontuados', dur: '5 min/dia', bpm: 60, obj: 'Sincronização.', passos: ['Pegue uma escala em semicolcheias.', 'Toque em longa-curta, depois curta-longa.', 'Volte ao ritmo igual.'], crit: 'Ritmo igual mais limpo depois dos pontuados.' },
      { nome: 'Rajadas', dur: '5 min/dia', obj: 'Velocidade com relaxamento.', passos: ['Toque 4 notas rápidas e pare na 5ª (longa).', 'Depois 8 notas e pare.', 'Sempre relaxado.'], crit: 'Rajadas limpas sem tensão nos ombros.' },
    ],
    met: [[I_LABEL(), 60, 92], ['Grupos de 4 em semicolcheias', 60, 108]],
    err: (I) => [[I.familia === 'metal' ? 'Mudar de harmônico com pressão do bocal.' : 'Morder para subir de harmônico.', 'Velocidade de ar e vogais. A pressão deve ser a mesma.'], ['Dedos levantando muito.', 'Dedos perto das chaves/pistos; movimentos mínimos.'], ['Estudar rápido sempre.', '80% do tempo devagar e perfeito; 20% testando velocidade.']],
    tempo: '15–20 minutos por dia.',
    crit: (I) => [I.familia === 'metal' ? 'Faço ligaduras labiais em 3 posições/combinações a ♩ = 72.' : 'Toco pelo menos 3 harmônicos/12ªs com controle.', 'Toco grupos de 4 em semicolcheias a ♩ = 100 numa escala.'],
    quiz: (I) => [
      { p: I.familia === 'metal' ? 'Na ligadura labial…' : 'No exercício de harmônicos…', o: ['os dedos/posição mudam a cada nota', 'os dedos/posição ficam iguais; muda o ar e as vogais', 'só se toca forte', 'usa-se a língua em todas as notas'], c: 1 },
      { p: 'Ritmos pontuados ajudam a…', o: ['afinar', 'sincronizar e igualar os dedos', 'respirar', 'aumentar o volume'], c: 1 },
      { p: 'Qual a principal inimiga da velocidade?', o: ['A partitura', 'A tensão', 'O metrônomo', 'A palheta'], c: 1 },
    ],
    tarefa: 'Inclua flexibilidade no bloco técnico da rotina diária.',
  });
  function I_LABEL() { return 'Flexibilidade (harmônicos/ligaduras)'; }

  // =====================================================================
  C.mod({ n: 7, nivel: 'intermediario', titulo: 'Leitura intermediária e avançada', desc: 'Dinâmica, expressão, ornamentos, estrutura da partitura, compassos irregulares e leitura à primeira vista.' });

  C.aula({
    id: '7-1', titulo: 'Dinâmica, expressão, andamento e fermata', tempo: '30 min',
    obj: 'Interpretar todos os sinais de dinâmica, expressão e mudanças de andamento que aparecem nas partituras.',
    apr: ['Dinâmicas e sinais de crescendo/diminuendo', 'sfz, fp, subito', 'Termos de caráter (dolce, cantabile…)', 'rit., rall., accel., a tempo, rubato', 'Fermata e respirações na partitura'],
    teo: (I, H) => H.tabela(['Sinal/termo', 'Significado'], [
      ['pp, p, mp, mf, f, ff', 'pianíssimo a fortíssimo'], ['cresc. / &lt;', 'crescendo'], ['dim. / decresc. / &gt;', 'diminuendo'],
      ['sfz (sforzando)', 'acento súbito e forte numa nota'], ['fp (fortepiano)', 'ataque forte e imediatamente piano'], ['subito p / f', 'mudança repentina'],
      ['dolce', 'doce'], ['cantabile', 'cantado'], ['espressivo (espr.)', 'expressivo'], ['legato / leggiero', 'ligado / leve'], ['maestoso', 'majestoso'], ['con brio', 'com vivacidade'],
      ['rit. (ritardando) / rall. (rallentando)', 'atrasando gradualmente'], ['accel. (accelerando)', 'acelerando'], ['a tempo / tempo I', 'volta ao andamento'], ['rubato', 'andamento flexível, expressivo'],
      ['𝄐 fermata', 'sustentar além do valor, a critério do regente/solista'], [', ou ✓ (vírgula)', 'respiração'], ['// (cesura)', 'corte/pausa breve'],
    ]),
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'graca' }) + `<p>Toque “Amazing Grace” três vezes: (1) tudo em <i>mf</i>; (2) com um plano dinâmico — 1ª frase <i>p</i>, crescendo até o ápice (o Dó agudo do compasso 7) em <i>f</i>, diminuindo no fim; (3) com um <i>rit.</i> nos dois últimos compassos e fermata na nota final. Grave as três versões e compare.</p>`,
    exs: [{ nome: 'Plano dinâmico', dur: '20 min', obj: 'Transformar sinais em música.', passos: ['Escolha uma melodia lenta.', 'Escreva a lápis um plano: onde cresce, onde é o ápice, onde respira.', 'Grave e confira se o plano é audível.'], crit: 'Diferença clara entre a versão plana e a versão interpretada.' }],
    err: [['Tocar tudo em mf.', 'A dinâmica é metade da expressão. Exagere no estudo; dose na apresentação.'], ['Rit. que vira parada.', 'Atrase de forma gradual e proporcional.'], ['Desafinar nas dinâmicas extremas.', 'Estude notas longas em pp e ff com afinador (aula 2.3).']],
    tempo: '30 minutos.',
    crit: ['Sei o significado de todos os termos da tabela.', 'Toco uma melodia com plano dinâmico audível na gravação.'],
    quiz: [
      { p: 'fp significa…', o: ['forte e depois piano imediatamente', 'fortíssimo', 'pouco forte', 'fermata'], c: 0 },
      { p: 'a tempo significa…', o: ['acelerar', 'voltar ao andamento original', 'tocar livre', 'parar'], c: 1 },
      { p: 'Rubato é…', o: ['um ornamento', 'flexibilidade expressiva do andamento', 'uma dinâmica', 'um tipo de compasso'], c: 1 },
    ],
    tarefa: 'Escreva planos dinâmicos para duas músicas do seu repertório.',
  });

  C.aula({
    id: '7-2', titulo: 'Ornamentos: trinado, apojatura, mordente, grupeto e glissando', tempo: '30 min + 10 min por dia',
    obj: 'Ler e executar os ornamentos mais comuns com o estilo adequado.',
    apr: ['Trinado (tr)', 'Apojatura e apojatura breve (acciaccatura)', 'Mordente superior e inferior', 'Grupeto', 'Glissando e efeitos de estilo'],
    teo: (I, H) => H.tabela(['Ornamento', 'Escrita', 'Execução'], [
      ['Trinado', 'tr~~ sobre a nota', 'Alternância rápida entre a nota e a de cima (da escala). No Barroco costuma começar pela nota de cima.'],
      ['Apojatura (longa)', 'nota pequena sem corte', 'Rouba parte do valor da nota principal (geralmente metade).'],
      ['Apojatura breve (acciaccatura)', 'nota pequena cortada', 'Muito rápida, quase junto com a nota principal.'],
      ['Mordente superior', '𝆝 (sem traço)', 'Nota – nota de cima – nota, rápido.'],
      ['Mordente inferior', '𝆝 com traço', 'Nota – nota de baixo – nota.'],
      ['Grupeto', '∾', 'Nota de cima – nota – nota de baixo – nota.'],
      ['Glissando', 'linha ondulada/reta entre notas', I.sub === 'trombone' ? 'Natural no trombone: deslize a vara mantendo o ar.' : I.familia === 'metal' ? 'Meio-pistos e lábio; ou série rápida de notas.' : I.sub === 'clarinete' ? 'Com dedos deslizando e garganta (ex.: abertura da “Rhapsody in Blue”).' : 'Com cromática rápida ou garganta (“bend”) no sax.'],
    ]) + `<p>Ornamentos dependem do <b>estilo</b>: no Barroco seguem convenções específicas; no choro, as apojaturas e mordentes são parte da linguagem; no gospel e no soul, o equivalente são os <b>bends, falls e scoops</b> (módulo 12).</p>`,
    pra: (I, H) => H.pauta({ tipo: 'notas', notas: !I.grave ? 'E4:2 F4:2 E4:2 F4:2 E4:2 F4:2 E4:2 F4:2 E4:8 G4:2 F4:2 E4:2 F4:2 G4:8 C5:16' : 'D3:2 Eb3:2 D3:2 Eb3:2 D3:2 Eb3:2 D3:2 Eb3:2 D3:8 F3:2 Eb3:2 D3:2 Eb3:2 F3:8 Bb3:16', tom: !I.grave ? 'C' : 'Bb', titulo: 'Trinado medido (escrito) e grupeto', bpm: 60 }) + `<p>Estude o trinado primeiro <b>medido</b> (colcheias, semicolcheias) e só depois livre. Use o dedilhado de trinado mais confortável (aba ${I.sub === 'trombone' ? 'Posições: trinado labial entre harmônicos vizinhos' : 'Dedilhados → alternativas'}).</p>`,
    exs: [{ nome: 'Trinado medido', dur: '10 min/dia', bpm: 60, obj: 'Trinado regular.', passos: ['Escolha 3 pares de notas.', 'Alternância em colcheias, tercinas e semicolcheias.', 'Depois livre, acelerando.'], crit: 'Trinado regular em semicolcheias a ♩ = 100.' }],
    err: [['Trinado irregular (dedos tensos).', 'Medido primeiro, relaxado; acelere aos poucos.'], ['Apojatura breve lenta demais.', 'Ela é quase simultânea à nota principal.'], ['Ornamentar fora de estilo.', 'Ouça gravações do estilo antes de decidir.']],
    tempo: '30 minutos e 10 minutos por dia.',
    crit: ['Leio e executo os 6 ornamentos da tabela.', 'Faço trinado regular em semicolcheias a ♩ = 100.'],
    quiz: [
      { p: 'O grupeto é…', o: ['nota–cima–nota', 'cima–nota–baixo–nota', 'nota longa', 'um trinado lento'], c: 1 },
      { p: 'A apojatura breve (cortada) é…', o: ['longa', 'rapidíssima, quase junto da nota', 'uma pausa', 'um acorde'], c: 1 },
      { p: 'O trinado alterna a nota com…', o: ['a nota de cima da escala', 'a oitava', 'a quinta', 'a nota de baixo sempre'], c: 0 },
    ],
    tarefa: 'Encontre ornamentos em uma peça do seu repertório e escreva como executá-los.',
  });

  C.aula({
    id: '7-3', titulo: 'Leitura à primeira vista, estrutura e compassos irregulares', tempo: '30 min + 10 min por dia',
    obj: 'Ler partituras novas com fluência, entendendo a estrutura (repetições, D.C., D.S., Coda), compassos irregulares, mudanças de compasso e leitura em várias tonalidades.',
    apr: ['Método de varredura (30 segundos)', 'Ritornelo, casas 1 e 2, D.C., D.S., Coda, Fine', 'Compassos irregulares (5/4, 7/8) e mudanças de compasso', 'Leitura de acidentes e tonalidades distantes'],
    teo: (I, H) => `<h4>Varredura antes de tocar (30 s)</h4><ol><li>Tonalidade (armadura) e se é maior ou menor.</li><li>Compasso e mudanças de compasso.</li><li>Andamento e caráter.</li><li>Estrutura: repetições, saltos.</li><li>Ritmos difíceis (síncopes, quiálteras).</li><li>Notas fora da sua zona de conforto, acidentes, mudanças de clave.</li><li>Dinâmicas e respirações.</li></ol>
      <p>Durante a leitura: <b>nunca pare</b>. Mantenha o pulso; se errar, siga em frente. Olhe sempre um pouco à frente do que está tocando.</p>
      ${H.tabela(['Sinal', 'Significado'], [['Ritornelo 𝄆 𝄇', 'repete o trecho entre os sinais'], ['Casas 1 e 2', 'na repetição, pule a casa 1 e vá para a 2'], ['D.C. (Da Capo)', 'volta ao início'], ['D.S. (Dal Segno) 𝄋', 'volta ao sinal'], ['al Fine', 'até a palavra Fine'], ['al Coda 𝄌', 'ao chegar ao sinal de Coda, salta para a Coda'], ['%', 'repetir o compasso anterior']])}
      <p><b>Compassos irregulares:</b> 5/4 se agrupa em 3+2 ou 2+3; 7/8 em 2+2+3, 2+3+2 ou 3+2+2. Conte os grupos (“1-2 1-2 1-2-3”). Mudanças de compasso: o valor da colcheia normalmente se mantém.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'ritmo', ritmo: '4 4 4 4 4 4 4 4 4 4 6 2 4 4 4', compasso: '5/4', titulo: '5/4 agrupado em 3 + 2', bpm: 80 }) +
      H.pauta({ tipo: 'ritmo', ritmo: '2 2 2 2 2 2 2 4 2 4 2 2 2 2 2 2 2 2 6', compasso: '7/8', titulo: '7/8 (2 + 2 + 3)', bpm: 72 }) +
      '<p>Leitura diária: use hinários (4 vozes: leia soprano, contralto, tenor e baixo transpondo), métodos de outros instrumentos, coleções de estudos de leitura. Leia algo <b>novo</b> todos os dias.</p>',
    exs: [
      { nome: 'Uma leitura nova por dia', dur: '10 min/dia', obj: 'Fluência.', passos: ['Escolha 8–16 compassos novos.', 'Varredura de 30 s.', 'Toque uma vez sem parar com metrônomo lento.', 'Anote os erros; não repita mais que 2 vezes (senão vira estudo, não leitura).'], crit: 'Lê 16 compassos de nível básico sem parar o pulso.' },
      { nome: 'Leitura em outras tonalidades', dur: '10 min', obj: 'Transposição à primeira vista.', passos: ['Pegue uma melodia simples em Dó.', 'Toque transpondo para Fá e Sol (mentalmente).'], crit: '8 compassos transpostos sem parar.' },
    ],
    met: [['Leitura nova (andamento confortável)', 60, 100], ['5/4 e 7/8', 60, 100]],
    err: [['Parar a cada erro.', 'Leitura é fluxo: mantenha o pulso, corrija depois.'], ['Não fazer a varredura.', '30 segundos de análise evitam metade dos erros.'], ['Esquecer as casas 1 e 2 na repetição.', 'Marque com o olhar o caminho completo antes de começar.']],
    tempo: '30 minutos e 10 minutos por dia, para sempre.',
    crit: ['Faço a varredura em 30 segundos.', 'Leio 16 compassos novos sem parar o pulso.', 'Sigo D.S. al Coda e casas sem me perder.', 'Conto e toco 5/4 e 7/8.'],
    quiz: [
      { p: 'D.S. al Coda significa…', o: ['voltar ao início e ir até o fim', 'voltar ao sinal e, no sinal de Coda, saltar para a Coda', 'repetir o compasso', 'tocar mais forte'], c: 1 },
      { p: '7/8 pode ser agrupado como…', o: ['4+3 semínimas', '2+2+3 colcheias', '7 semínimas', '3+3+3'], c: 1 },
      { p: 'Ao errar na leitura à primeira vista…', o: ['pare e volte', 'mantenha o pulso e siga', 'toque mais forte', 'diminua o andamento no meio'], c: 1 },
    ],
    tarefa: 'Crie o hábito: leitura nova todos os dias (10 minutos).',
  });

  // =====================================================================
  C.mod({ n: 8, nivel: 'intermediario', titulo: 'Harmonia musical', desc: 'Acordes, campo harmônico, funções, cadências, II–V–I, dominantes secundárias, empréstimo modal, tensões e rearmonização.' });

  C.aula({
    id: '8-1', titulo: 'Formação de acordes e cifragem', tempo: '45 min',
    obj: 'Formar e ler cifras de tríades e tétrades e relacioná-las aos arpejos no instrumento.',
    apr: ['Tríades e tétrades', 'Cifragem popular (C, Cm, C7, C7M…)', 'Acordes invertidos (C/E)', 'Acorde × arpejo no instrumento'],
    teo: (I, H) => `<p><b>Acorde</b> é a combinação de 3 ou mais notas soando juntas. A <b>tríade</b> empilha duas terças (1-3-5); a <b>tétrade</b> acrescenta a 7ª (1-3-5-7).</p>
      ${H.tabela(['Cifra', 'Nome', 'Notas (em Dó)'], [['C', 'Dó maior', 'Dó Mi Sol'], ['Cm', 'Dó menor', 'Dó Mi♭ Sol'], ['C° ou Cdim', 'Dó diminuto', 'Dó Mi♭ Sol♭'], ['C+ ou C(♯5)', 'Dó aumentado', 'Dó Mi Sol♯'], ['C7M (Cmaj7, CΔ)', 'Dó com 7ª maior', 'Dó Mi Sol Si'], ['C7', 'Dó com 7ª (dominante)', 'Dó Mi Sol Si♭'], ['Cm7', 'Dó menor com 7ª', 'Dó Mi♭ Sol Si♭'], ['Cm7(♭5) ou Cø', 'meio-diminuto', 'Dó Mi♭ Sol♭ Si♭'], ['C°7', 'diminuto com 7ª diminuta', 'Dó Mi♭ Sol♭ Lá'], ['C6, Cm6', 'com 6ª', 'Dó Mi Sol Lá'], ['Csus4', 'com 4ª suspensa', 'Dó Fá Sol'], ['C/E', 'Dó com Mi no baixo (inversão)', 'baixo Mi']])}
      <p class="aviso">${I.transp.s ? `<b>Cifras também transpõem!</b> Se o teclado toca C7, para você é <b>${window.Musica.nomeInt(window.Musica.concertoParaEscrita(window.Musica.parse('C4'), I))}7</b>. Partituras para ${I.tom} já trazem a cifra transposta; cifras de site/folheto de louvor estão em concerto.` : 'No trombone, a cifra que você lê é a mesma do teclado e do violão.'}</p>`,
    pra: (I, H) => ['M7', 'd7', 'm7', 'm7b5'].map((a) => H.pauta({ tipo: 'arpejo', acorde: a, tonica: !I.grave ? 'C4' : 'C3', dur: 2, bpm: 80 })).join(''),
    exs: [{ nome: 'Cifra → arpejo', dur: '15 min', bpm: 60, obj: 'Ler cifras como arpejos.', passos: ['Pegue uma cifra de música (transponha se necessário).', 'Toque o arpejo de cada acorde, na ordem, 1 compasso cada.'], crit: 'Arpeja uma sequência de 8 acordes sem parar a ♩ = 72.' }],
    err: [['Confundir C7 com C7M.', '7 sozinho = 7ª menor (dominante). 7M/maj7/Δ = 7ª maior.'], ['Não transpor cifras de concerto.', 'Converta sempre (aba Transpositor aceita cifras).']],
    tempo: '45 minutos.',
    crit: ['Leio e formo todas as cifras da tabela.', 'Arpejo uma sequência de 8 acordes cifrados a ♩ = 72.'],
    quiz: [
      { p: 'Quais notas tem Gm7?', o: ['Sol Si Ré Fá', 'Sol Si♭ Ré Fá', 'Sol Si♭ Ré♭ Fá', 'Sol Si Ré Fá♯'], c: 1 },
      { p: 'D7M é…', o: ['Ré Fá♯ Lá Dó', 'Ré Fá♯ Lá Dó♯', 'Ré Fá Lá Dó', 'Ré Fá Lá♭ Dó'], c: 1 },
      { p: 'C/E significa…', o: ['Dó e Mi alternados', 'acorde de Dó com Mi no baixo', 'Dó menor', 'Mi maior'], c: 1 },
    ],
    tarefa: 'Pegue a cifra de 3 louvores/canções e escreva os arpejos transpostos para você.',
  });

  C.aula({
    id: '8-2', titulo: 'Campo harmônico, funções e cadências', tempo: '50 min',
    obj: 'Montar o campo harmônico maior e menor, entender as funções tônica, subdominante e dominante e reconhecer cadências.',
    apr: ['Campo harmônico maior (tríades e tétrades)', 'Campo harmônico menor', 'Funções T, SD, D', 'Cadências perfeita, plagal, de engano e meia cadência'],
    teo: (I, H) => `<p><b>Campo harmônico</b> são os acordes formados sobre cada grau da escala, usando só as notas da escala.</p>
      ${H.tabela(['Grau', 'I', 'IIm', 'IIIm', 'IV', 'V', 'VIm', 'VII°'], [['Tétrade', 'I7M', 'IIm7', 'IIIm7', 'IV7M', 'V7', 'VIm7', 'VIIm7(♭5)'], ['Em Dó', 'C7M', 'Dm7', 'Em7', 'F7M', 'G7', 'Am7', 'Bm7(♭5)'], ['Função', 'T', 'SD', 'T', 'SD', 'D', 'T', 'D']])}
      <p><b>Funções:</b> <b>Tônica</b> (repouso: I, VIm, IIIm), <b>Subdominante</b> (afastamento: IV, IIm), <b>Dominante</b> (tensão que pede resolução: V7, VII°). A tensão do V7 vem do <b>trítono</b> entre a 3ª e a 7ª (em G7: Si–Fá), que resolve em Dó–Mi.</p>
      <p><b>Campo menor (harmônico):</b> Im – II° – ♭III – IVm – <b>V7</b> – ♭VI – VII°. Usa-se a menor harmônica para ter o V7 (com sensível).</p>
      ${H.tabela(['Cadência', 'Acordes', 'Efeito'], [['Perfeita (autêntica)', 'V → I', 'conclusão total'], ['Plagal', 'IV → I', '“Amém” dos hinos'], ['De engano', 'V → VIm', 'surpresa, adia o fim'], ['Meia cadência', '… → V', 'suspensão, “vírgula”']])}`,
    pra: (I, H) => H.pauta({ tipo: 'escala', escala: 'maior', tonica: ton(I), padrao: 'tetrades', dur: 2, titulo: 'Tétrades do campo harmônico maior', bpm: 72 }) + H.pauta({ tipo: 'mel', id: 'coral' }) + '<p>Analise o “Coral da Manhã”: as cifras mostram onde há cadência plagal ou perfeita? Onde está a meia cadência?</p>',
    exs: [{ nome: 'Campo em 4 tonalidades', dur: '20 min', obj: 'Fluência harmônica.', passos: ['Escreva o campo harmônico (tétrades) de Dó, Sol, Fá e Si♭.', 'Toque as tétrades em arpejo.'], crit: 'Escreve sem consultar e toca a ♩ = 72.' }],
    err: [['Esquecer que o VII é meio-diminuto.', 'No campo maior, VII = m7(♭5).'], ['Usar a menor natural para o V.', 'Na harmonia menor, o V é maior (com sensível), da menor harmônica.']],
    tempo: '50 minutos.',
    crit: ['Monto o campo harmônico maior e menor em qualquer tonalidade.', 'Identifico função e cadências numa cifra.'],
    quiz: [
      { p: 'Em Sol maior, o V7 é…', o: ['G7', 'D7', 'C7', 'Am7'], c: 1 },
      { p: 'IV → I chama-se cadência…', o: ['perfeita', 'plagal', 'de engano', 'meia'], c: 1 },
      { p: 'O trítono do G7 é…', o: ['Sol–Ré', 'Si–Fá', 'Sol–Si', 'Ré–Fá'], c: 1 },
      { p: 'A função do IIm é…', o: ['tônica', 'subdominante', 'dominante', 'nenhuma'], c: 1 },
    ],
    tarefa: 'Analise as funções de 3 músicas do seu repertório (escreva T, SD, D acima das cifras).',
  });

  C.aula({
    id: '8-3', titulo: 'II–V–I, dominantes secundárias, empréstimo modal e modulação', tempo: '60 min',
    obj: 'Reconhecer e tocar sobre II–V–I maiores e menores, dominantes secundárias, acordes de empréstimo e modulações.',
    apr: ['II–V–I maior e menor', 'Dominantes secundárias (V7/x)', 'Empréstimo modal (IVm, ♭VII, ♭VI)', 'Modulação'],
    teo: (I, H) => `<p><b>II–V–I</b> é a progressão mais importante do jazz, da bossa nova e muito presente no gospel: Dm7 – G7 – C7M. Em menor: Dm7(♭5) – G7(♭9) – Cm.</p>
      <p><b>Dominante secundária</b> é um acorde dominante que resolve num acorde que não é o I. Ex.: em Dó, <b>A7</b> é o V7 de Dm (V7/II); <b>E7</b> é o V7 de Am (V7/VI); <b>C7</b> é o V7 de F (V7/IV). Elas criam movimento e “puxam” para o acorde seguinte.</p>
      <p><b>Empréstimo modal:</b> usar acordes da tonalidade homônima menor dentro do maior: <b>Fm</b> (IVm) em Dó maior é o famoso acorde “emocionante” dos finais de louvor; também <b>B♭</b> (♭VII) e <b>A♭</b> (♭VI).</p>
      <p><b>Modulação:</b> mudança de tonalidade. A mais comum na música popular e gospel é subir <b>meio tom ou um tom</b> no último refrão, muitas vezes preparada pelo V7 da nova tonalidade.</p>
      ${H.tabela(['Recurso', 'Exemplo em Dó', 'O que tocar'], [['II–V–I', 'Dm7 G7 C7M', 'arpejos, notas-guia (Fá–Si–Mi)'], ['V7/VI', 'E7 → Am', 'Sol♯ (3ª de E7) resolvendo em Lá'], ['IVm', 'F → Fm → C', 'Lá♭ (3ª de Fm) descendo para Sol'], ['Modulação +1 tom', 'C … D7 → D', 'prepare-se para ler a nova armadura']])}`,
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'iiVI' }) + H.pauta({ tipo: 'mel', id: 'guia' }) + '<p><b>Notas-guia</b> são a 3ª e a 7ª de cada acorde. Elas definem a harmonia e se movem por graus conjuntos: a 7ª de um acorde desce meio tom para a 3ª do seguinte.</p>',
    exs: [
      { nome: 'II–V–I em 4 tonalidades', dur: '20 min', bpm: 72, obj: 'Fluência.', passos: ['Arpeje Dm7–G7–C7M.', 'Transponha para Fá, Si♭ e Sol (escritos).', 'Depois toque só as notas-guia.'], crit: 'II–V–I em 4 tonalidades a ♩ = 100.' },
      { nome: 'Empréstimo na prática', dur: '10 min', obj: 'Ouvir o IVm.', passos: ['Toque o arpejo de F, depois Fm, depois C (relativos ao seu tom escrito).', 'Ouça o efeito do Lá♭.'], crit: 'Reconhece o som do IVm.' },
    ],
    met: [['Estudo II–V–I nº 1', 80, 140], ['Notas-guia', 60, 120]],
    err: [['Tratar o dominante secundário como se fosse do tom.', 'A7 em Dó tem Dó♯: a 3ª do acorde manda.'], ['Ignorar a modulação na leitura.', 'Na varredura, procure novas armaduras e acidentes recorrentes.']],
    tempo: '60 minutos.',
    crit: ['Arpejo II–V–I em 4 tonalidades a ♩ = 100.', 'Toco a linha de notas-guia de memória.', 'Identifico dominantes secundárias e IVm numa cifra.'],
    quiz: [
      { p: 'Em Fá maior, o II–V–I é…', o: ['Gm7 C7 F7M', 'Dm7 G7 C7M', 'Am7 D7 G7M', 'Cm7 F7 B♭7M'], c: 0 },
      { p: 'E7 em Dó maior funciona como…', o: ['V7 do tom', 'V7/VI (resolve em Am)', 'IVm', 'tônica'], c: 1 },
      { p: 'Fm em Dó maior é um…', o: ['erro', 'empréstimo modal (IVm)', 'dominante', 'acorde diminuto'], c: 1 },
      { p: 'Notas-guia são…', o: ['fundamental e 5ª', '3ª e 7ª', '9ª e 13ª', 'as notas do baixo'], c: 1 },
    ],
    tarefa: 'Procure II–V–I e IVm em três músicas (jazz, bossa, louvor) e anote os compassos.',
  });

  C.aula({
    id: '8-4', titulo: 'Tensões, substituições e rearmonização', tempo: '60 min',
    obj: 'Conhecer as tensões disponíveis, a substituição de trítono e as técnicas básicas de rearmonização, aplicadas ao jazz, ao gospel e à música popular.',
    apr: ['Tensões 9, 11, 13 e alteradas', 'Tensões disponíveis por tipo de acorde', 'Substituição de trítono', 'Acordes de passagem gospel e rearmonização'],
    teo: (I, H) => `<p><b>Tensões</b> são as notas acima da 7ª: 9ª (= 2ª), 11ª (= 4ª), 13ª (= 6ª). Elas enriquecem o acorde sem mudar a função.</p>
      ${H.tabela(['Acorde', 'Tensões disponíveis', 'Evite'], [['7M', '9, ♯11, 13', '11 natural (choca com a 3ª)'], ['m7', '9, 11, 13 (no IIm)', '♭13 no IIm'], ['7 (dominante)', '9, 13; alteradas ♭9, ♯9, ♯11, ♭13', '11 natural (exceto sus4)'], ['m7(♭5)', '11, ♭13, (9)', '♭9'], ['°7', 'notas a 1 tom acima de cada nota do acorde', '—']])}
      <p><b>Substituição de trítono:</b> um dominante pode ser trocado pelo dominante a um trítono de distância — G7 ↔ D♭7 — porque compartilham o trítono (Si–Fá = Dó♭–Fá). Resultado: baixo cromático (Dm7 – D♭7 – C).</p>
      <p><b>Harmonia gospel (práticas comuns):</b> números de grau (sistema Nashville: “1-4-5”); passagens <b>1 → 1/3 → 4</b> (C – C/E – F); <b>4 → 4♯° → 1/5</b> (F – F♯° – C/G); cadências <b>2-5-1</b>; acordes com 9 e sus; “turnarounds” que voltam ao 1; modulações ascendentes no final.</p>
      <p><b>Rearmonizar</b> é trocar acordes de uma melodia mantendo a melodia. Técnicas: inserir II–V antes de um acorde-alvo, dominantes secundárias, substituição de trítono, acordes de passagem diminutos, empréstimo modal.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'arpejo', acorde: 'd7', tonica: !I.grave ? 'G4' : 'G2', dur: 2, titulo: 'G7 (escrito) — base para as tensões 9 e 13', bpm: 80 }) + '<p>Toque a escala <b>mixolídia</b> sobre o dominante (todas as tensões naturais) e depois as alteradas (♭9, ♯9) usando a <b>diminuta semitom–tom</b> (aba Escalas).</p>' + H.pauta({ tipo: 'escala', escala: 'dimST', tonica: !I.grave ? 'G4' : 'G2', oitavas: 1, dur: 2, bpm: 72 }),
    exs: [{ nome: 'Rearmonize um hino', dur: '30 min', obj: 'Aplicar as técnicas.', passos: ['Escolha um hino simples (I–IV–V).', 'Insira um II–V antes do IV e do V.', 'Coloque um IVm antes do acorde final.', 'Toque os arpejos da nova harmonia.'], crit: 'Hino com pelo menos 3 recursos de rearmonização.' }],
    err: [['Usar tensão que choca (ex.: 11 natural no 7M).', 'Consulte a tabela de tensões disponíveis.'], ['Rearmonizar a ponto de esconder a melodia.', 'A melodia manda: o acorde precisa conter ou suportar a nota da melodia.']],
    tempo: '60 minutos.',
    crit: ['Sei as tensões disponíveis para 7M, m7 e 7.', 'Explico a substituição de trítono.', 'Rearmonizei um hino com 3 recursos.'],
    quiz: [
      { p: 'A substituição de trítono de G7 é…', o: ['D7', 'D♭7', 'C7', 'F7'], c: 1 },
      { p: 'Qual tensão evitar no 7M?', o: ['9', '11 natural', '13', '♯11'], c: 1 },
      { p: 'No sistema de números (Nashville), “1-4-5” em Ré é…', o: ['D G A', 'D F G', 'C F G', 'D E F♯'], c: 0 },
    ],
    tarefa: 'Rearmonize um segundo hino e mostre a um tecladista: ouçam juntos.',
  });

  // =====================================================================
  C.mod({ n: 9, nivel: 'intermediario', titulo: 'Percepção musical e treinamento auditivo', desc: 'Intervalos, acordes, tonalidades, progressões, ditados, memorização, transcrição e afinação auditiva.' });

  C.aula({
    id: '9-1', titulo: 'Notas e intervalos de ouvido', tempo: '15 min por dia',
    obj: 'Reconhecer intervalos melódicos e harmônicos e cantar notas de referência.',
    apr: ['Cantar antes de tocar', 'Intervalos ascendentes e descendentes', 'Intervalos harmônicos', 'Músicas de referência pessoais'],
    teo: '<p>Percepção não é “dom”: é treino. O ouvido aprende por comparação e repetição. O caminho mais eficiente é <b>cantar</b>: se você consegue cantar um intervalo, consegue reconhecê-lo e tocá-lo.</p><p>Associe cada intervalo a uma música que você conhece (tabela na aba Treino auditivo). Com o tempo, o intervalo passa a ter uma “cor” própria e a música de referência deixa de ser necessária.</p>',
    pra: '<p>Antes de tocar qualquer frase, <b>cante-a por dentro</b>. Toque uma nota no instrumento, cante a 3ª, 5ª e 8ª acima e confira tocando. No treino auditivo, comece pelo nível básico e só avance com 80% de acerto.</p>',
    exs: [{ nome: 'Rotina de intervalos', dur: '15 min/dia', obj: 'Reconhecimento automático.', passos: ['Treino auditivo → Intervalos (ascendentes) até 80%.', 'Depois descendentes.', 'Depois harmônicos.'], crit: '80% no nível completo nas três direções.' }],
    err: [['Adivinhar rápido.', 'Repita o som, cante, compare com a referência e só então responda.'], ['Treinar uma vez por semana.', 'Percepção pede frequência: 10–15 minutos todo dia.']],
    tempo: '15 minutos por dia.',
    crit: ['80% de acerto em intervalos ascendentes (completo).', '80% em descendentes.', '70% em harmônicos.'],
    quiz: [
      { p: 'A forma mais eficiente de treinar percepção é…', o: ['só ouvir', 'cantar e comparar com referências', 'decorar teoria', 'tocar rápido'], c: 1 },
      { p: '“Brilha, brilha estrelinha” começa com qual intervalo (bri-lha)?', o: ['3ª maior', '4ª justa', '5ª justa', '8ª'], c: 2 },
      { p: 'Para avançar de nível no treino, a meta é…', o: ['50%', '80%', '100% sempre', 'não há meta'], c: 1 },
    ],
    tarefa: 'Crie sua lista pessoal de referências (uma música para cada intervalo).',
  });

  C.aula({
    id: '9-2', titulo: 'Acordes, tonalidades e progressões de ouvido', tempo: '15 min por dia',
    obj: 'Identificar qualidade de acordes, modo (maior/menor), escalas e progressões comuns.',
    apr: ['Maior × menor × diminuto × aumentado', 'Tétrades de ouvido', 'Escalas e modos', 'Progressões I–IV–V–I, II–V–I, I–VI–IV–V'],
    teo: '<p><b>Maior</b> soa aberto/estável; <b>menor</b> soa mais escuro; <b>diminuto</b> tenso e instável; <b>aumentado</b> “suspenso”, misterioso. Nas tétrades, a <b>7ª maior</b> é suave e sofisticada; o <b>7</b> (dominante) pede resolução; o <b>m7</b> é macio; o <b>°7</b> é dramático.</p><p><b>Progressões:</b> ouça o baixo. Ele costuma revelar o grau (I, IV, V…). Cante a fundamental de cada acorde junto com a música.</p>',
    pra: '<p>Treino auditivo → Acordes e Escalas. Para progressões: escolha músicas conhecidas e tente escrever os graus (1, 4, 5…) cantando o baixo. Confira com a cifra.</p>',
    exs: [{ nome: 'Baixo das músicas', dur: '15 min', obj: 'Ouvir a harmonia.', passos: ['Escolha um louvor ou canção simples.', 'Cante a nota do baixo em cada acorde.', 'Ache a nota no instrumento e escreva os graus.', 'Confira com a cifra.'], crit: 'Acerta os graus de 2 músicas simples.' }],
    err: [['Ouvir só a melodia.', 'Treine ouvir camadas: baixo, acordes, melodia.']],
    tempo: '15 minutos por dia.',
    crit: ['80% em tríades (básico).', '70% em tétrades.', 'Escrevo os graus de 2 músicas simples de ouvido.'],
    quiz: [
      { p: 'Qual acorde soa mais instável e pede resolução?', o: ['7M', 'dominante (7)', 'maior', 'm7'], c: 1 },
      { p: 'Para identificar a progressão, é melhor ouvir…', o: ['a bateria', 'o baixo', 'a letra', 'o volume'], c: 1 },
      { p: 'A progressão I–VI–IV–V em Dó é…', o: ['C Am F G', 'C Dm G C', 'C F G C', 'Am F C G'], c: 0 },
    ],
    tarefa: 'Escreva os graus de 3 músicas de ouvido esta semana.',
  });

  C.aula({
    id: '9-3', titulo: 'Ditado melódico, ditado rítmico e memorização', tempo: '15–20 min por dia',
    obj: 'Escrever melodias e ritmos ouvidos e memorizar melodias com rapidez.',
    apr: ['Ditado por graus', 'Ditado rítmico', 'Técnica de memorização por frases', 'Tirar melodias de ouvido no instrumento'],
    teo: '<p>No <b>ditado melódico</b>, primeiro identifique a tônica; depois pense em <b>graus</b> (1, 2, 3…) em vez de nomes de notas — assim o ouvido trabalha em qualquer tonalidade. No <b>ditado rítmico</b>, marque o pulso e escreva primeiro onde caem os tempos.</p><p><b>Memorização:</b> divida em frases; cante cada frase; toque; feche os olhos e toque de novo; junte as frases. Memorizar pela <b>estrutura</b> (forma, harmonia, graus) é mais estável que memorizar dedos.</p>',
    pra: '<p>Treino auditivo → Ditado melódico (graus) e Ditado rítmico. Depois, escolha uma melodia simples que você conhece de cor (um hino, uma canção infantil) e toque-a no instrumento sem partitura, começando em notas diferentes.</p>',
    exs: [
      { nome: 'Ditados diários', dur: '10 min/dia', obj: 'Escrita auditiva.', passos: ['5 ditados melódicos.', '5 ditados rítmicos.'], crit: '80% de acerto no nível completo.' },
      { nome: 'Tirar de ouvido', dur: '10 min/dia', obj: 'Ouvido → dedos.', passos: ['Escolha uma melodia conhecida.', 'Toque começando em Dó, depois em Fá e em Sol (escritos).'], crit: '3 melodias em 3 tonalidades cada.' },
    ],
    err: [['Tentar acertar todas as notas de uma vez.', 'Primeiro o contorno (sobe/desce), depois os graus.'], ['Decorar só os dedos.', 'Decore a melodia cantando; os dedos seguem.']],
    tempo: '15–20 minutos por dia.',
    crit: ['80% em ditado melódico de 5 notas.', '80% em ditado rítmico.', 'Toco 3 melodias de ouvido em 3 tonalidades.'],
    quiz: [
      { p: 'No ditado melódico, é melhor pensar em…', o: ['nomes absolutos sempre', 'graus da escala', 'dedilhados', 'acordes'], c: 1 },
      { p: 'O primeiro passo no ditado rítmico é…', o: ['escrever as pausas', 'marcar o pulso', 'adivinhar o andamento', 'tocar'], c: 1 },
    ],
    tarefa: 'Toque de ouvido uma melodia que você ouviu na semana.',
  });

  C.aula({
    id: '9-4', titulo: 'Transcrição e afinação auditiva', tempo: '30 min por dia (projeto)',
    obj: 'Transcrever solos e frases de gravações e identificar desafinação pelo ouvido.',
    apr: ['Método de transcrição', 'Ferramentas para desacelerar sem mudar a altura', 'Batimentos e afinação justa', 'Identificar se você está alto ou baixo'],
    teo: (I) => `<h4>Método de transcrição</h4><ol><li>Ouça o trecho muitas vezes até conseguir <b>cantar</b> junto.</li><li>Encontre a primeira nota e a tonalidade.</li><li>Toque junto, frase a frase, com a gravação desacelerada (Transcribe!, Amazing Slow Downer, ou a velocidade 0,5× do YouTube/VLC — todos mantêm a altura).</li><li>Escreva (papel ou MuseScore) — ${I.transp.s ? 'lembre: o que você toca é a nota escrita do seu instrumento; a gravação está em concerto' : 'na clave de Fá, sons reais'}.</li><li>Toque junto com a gravação imitando articulação, vibrato e respiração.</li><li>Analise: que notas são do acorde? que recursos o solista usa?</li></ol>
      <h4>Afinação auditiva</h4><p>Quando duas notas quase iguais soam juntas, surge uma ondulação: os <b>batimentos</b>. Quanto mais rápidos, mais longe da afinação. Afinar é eliminar os batimentos. Em acordes, a afinação “bonita” (justa) é levemente diferente do afinador: a <b>3ª maior</b> de um acorde soa melhor cerca de 14 cents <b>mais baixa</b>; a <b>3ª menor</b>, cerca de 16 cents <b>mais alta</b>; a 5ª, cerca de 2 cents mais alta.</p>`,
    pra: '<p>Use a nota de referência da aba Afinador com a opção “nota + 3ª maior”: toque a 3ª do acorde e ajuste até os batimentos sumirem. Repare que fica um pouco abaixo do afinador. Faça o teste “alto ou baixo?” no treino auditivo.</p>',
    exs: [
      { nome: 'Primeira transcrição', dur: '30 min/dia por 1–2 semanas', obj: 'Transcrever 16 compassos.', passos: ['Escolha uma melodia lenta de um instrumentista que você admira.', 'Siga o método de 6 passos.', 'Toque junto com a gravação.'], crit: '16 compassos transcritos e tocados junto com a gravação.' },
      { nome: 'Alto ou baixo?', dur: '5 min/dia', obj: 'Sensibilidade de afinação.', passos: ['Treino auditivo → Afinação.'], crit: '80% no nível completo (diferenças de 6–15 cents).' },
    ],
    err: [['Transcrever sem cantar antes.', 'Se não canta, ainda não ouviu de verdade.'], ['Copiar só as notas.', 'O estilo está na articulação, no vibrato e no tempo.']],
    tempo: '30 minutos por dia durante o projeto de transcrição.',
    crit: ['Transcrevi e toquei junto 16 compassos de uma gravação.', '80% no teste “alto ou baixo?”.', 'Elimino batimentos com a nota de referência.'],
    quiz: [
      { p: 'Batimentos rápidos indicam…', o: ['afinação perfeita', 'notas mais distantes da afinação', 'volume alto', 'vibrato'], c: 1 },
      { p: 'Em um acorde maior, a 3ª soa melhor…', o: ['exatamente no afinador', 'um pouco mais baixa (~14 cents)', 'um pouco mais alta', 'meio tom abaixo'], c: 1 },
      { p: 'Ferramentas de desacelerar servem para…', o: ['mudar a tonalidade', 'ouvir devagar sem mudar a altura', 'afinar', 'gravar'], c: 1 },
    ],
    tarefa: 'Comece um caderno de transcrições: um trecho novo por mês.',
  });

  // =====================================================================
  C.mod({ n: 10, nivel: 'intAvancado', titulo: 'Sonoridade e interpretação', desc: 'Timbre, ressonância, harmônicos, vibrato, subtone, flexibilidade, afinação em toda a extensão e fraseado.' });

  C.aula({
    id: '10-1', titulo: 'Timbre, ressonância, harmônicos e projeção', tempo: '20 min por dia',
    obj: 'Desenvolver um som encorpado, ressonante e projetado, e começar a construir seu timbre próprio.',
    apr: ['O que forma o timbre', 'Ressonância: garganta, boca, corpo', 'Exercícios de harmônicos', 'Projeção × volume'],
    teo: (I) => `<p>O <b>timbre</b> depende dos <b>harmônicos</b> presentes no som. Você controla esses harmônicos com o <b>equipamento</b>, a <b>embocadura</b> e, principalmente, com a <b>forma interna da boca e da garganta</b> (o “trato vocal”). Garganta aberta e língua baixa (vogal “ô”) = som mais escuro e cheio; língua alta (vogal “i”) = som mais brilhante e focado.</p>
      <p><b>Ressonância</b> é o som “vibrar inteiro”. Um som ressonante não é necessariamente forte: é cheio mesmo em piano. <b>Projeção</b> é o som chegar ao fundo da sala com clareza — vem do foco e do ar, não de tocar mais alto.</p>
      <p>${I.familia === 'metal' ? 'Nos metais, os exercícios de ligadura labial e buzz no bocal são o principal caminho para um som aberto e centralizado.' : 'Nos instrumentos de palheta, o exercício de harmônicos (overtones) é a ferramenta mais poderosa para a sonoridade: tocar a nota com o dedilhado normal e depois com o dedilhado “do grave” (como harmônico), igualando os dois timbres.'}</p>`,
    pra: (I, H) => por(I, {
      sax: H.pauta({ tipo: 'notas', notas: 'Bb4:8 Bb4:8 B4:8 B4:8 C5:8 C5:8 C#5:16', tom: 'C', titulo: 'Igualar timbre: 1ª nota com dedilhado normal, 2ª como harmônico (dedilhado uma oitava abaixo, sem chave de oitava)', bpm: 60 }),
      clarinete: H.pauta({ tipo: 'notas', notas: 'B4:8 B4:8 C5:8 C5:8 D5:8 D5:8 E5:16', tom: 'C', titulo: 'Igualar timbre: 1ª com registro; 2ª só com a garganta (sem registro, dedilhado da 12ª abaixo)', bpm: 60 }),
      metal: H.pauta({ tipo: 'notas', notas: I.sub === 'trompete' ? 'G4:8 C5:8 E5:8 G5:8 E5:8 C5:8 G4:16' : 'F3:8 Bb3:8 D4:8 F4:8 D4:8 Bb3:8 F3:16', tom: I.sub === 'trompete' ? 'C' : 'Bb', titulo: 'Ligaduras na série harmônica, som cheio em todas', bpm: 60 }),
    }),
    exs: [
      { nome: 'Vogais', dur: '5 min', bpm: 60, obj: 'Controle do timbre interno.', passos: ['Nota longa pensando “ô”, depois “a”, depois “i”.', 'Grave e ouça as diferenças.', 'Escolha a vogal que dá o som que você quer.'], crit: 'Diferença audível entre as vogais.' },
      { nome: 'Som em piano', dur: '5 min', bpm: 60, obj: 'Ressonância sem volume.', passos: ['Notas longas em p, procurando o mesmo “corpo” do mf.'], crit: 'Piano cheio, não soprado nem fino.' },
      { nome: 'Igualar harmônicos', dur: '10 min', bpm: 60, obj: 'Timbre homogêneo.', passos: ['Exemplo desta aula.', 'Alterne normal/harmônico até soarem iguais.'], crit: 'Normal e harmônico com timbre parecido na gravação.' },
    ],
    err: [['Confundir som grande com som forte.', 'Grave-se em p e f: o som grande existe nas duas dinâmicas.'], ['Fechar a garganta no agudo.', 'Mantenha o espaço interno; mude só a velocidade do ar.']],
    tempo: '20 minutos por dia, dentro do bloco de notas longas.',
    crit: ['Controlo o timbre com as vogais.', 'Toco piano com som cheio.', 'Igualo pelo menos 3 pares normal/harmônico.'],
    quiz: [
      { p: 'O que mais controla o timbre no dia a dia?', o: ['A cor do instrumento', 'A forma interna da boca e garganta, embocadura e ar', 'O estojo', 'A partitura'], c: 1 },
      { p: 'Projeção vem de…', o: ['tocar mais forte', 'foco e ar bem direcionado', 'morder a palheta/apertar o bocal', 'microfone'], c: 1 },
    ],
    tarefa: 'Grave a mesma frase com 3 timbres diferentes. Qual deles é “você”?',
  });

  C.aula({
    id: '10-2', titulo: 'Vibrato, subtone, dinâmica extrema e flexibilidade', tempo: '15–20 min por dia',
    obj: 'Desenvolver vibrato controlado e adequado ao estilo, e técnicas de cor como o subtone.',
    apr: (I) => ['Tipos de vibrato', 'Vibrato medido com metrônomo', I.familia === 'metal' ? 'Efeitos: surdinas e cores' : 'Subtone', 'Quando usar e quando não usar'],
    teo: (I) => por(I, {
      sax: '<p><b>Vibrato no sax</b> é feito com a <b>mandíbula</b>: um movimento suave e regular para baixo e para cima (como dizer “iá-iá-iá” sem som), variando a altura ligeiramente abaixo da nota. Erudito francês: vibrato regular (~4–5 ondulações por segundo); jazz e gospel: vibrato mais lento, frequentemente no fim das notas longas.</p><p><b>Subtone:</b> som suave, aveludado, com ar, usado em baladas e jazz (Ben Webster, Stan Getz no tenor; muito usado no gospel). Técnica: menos lábio inferior sobre a palheta (a palheta vibra só na ponta), mandíbula um pouco mais baixa, ar mais lento. Funciona melhor no registro grave.</p>',
      clarinete: '<p><b>No clarinete erudito</b>, tradicionalmente <b>não</b> se usa vibrato (a escola alemã e a maioria das orquestras), embora alguns solistas o usem pontualmente. No <b>jazz</b>, no <b>choro</b> e no <b>klezmer</b>, o vibrato é comum, feito com a mandíbula (como no sax). Estude o vibrato como recurso de estilo.</p><p><b>Subtone</b> no clarinete: som suave e “respirado” no chalumeau, usado no jazz (Jimmy Giuffre) e em baladas.</p>',
      trompete: '<p><b>Vibrato no trompete</b> pode ser feito com a <b>mão direita</b> (balançar levemente o instrumento pelos pistos — o mais comum no jazz e na música popular), com o <b>lábio/mandíbula</b> ou com o ar. Use com moderação: no repertório orquestral, pouco ou nenhum.</p><p><b>Cores:</b> surdinas (straight, cup, harmon — o som de Miles Davis), flutter tongue (frullato), meio-pistos.</p>',
      trombone: '<p><b>Vibrato no trombone</b>: com a <b>vara</b> (pequeno movimento de vai-e-vem — o vibrato clássico das big bands, Tommy Dorsey), com a mandíbula ou com o ar. Erudito: pouco ou nenhum na orquestra; mais em solos.</p><p><b>Cores:</b> surdinas (straight, cup, plunger — o “wah-wah”), glissando, frullato.</p>',
    }) + '<p>Vibrato não pode esconder afinação ruim nem ser constante e igual em tudo: ele é <b>expressão</b>. Comece notas sem vibrato e acrescente na metade (“vibrato tardio”), como cantores fazem.</p>',
    pra: (I, H) => H.pauta({ tipo: 'notas', notas: !I.grave ? 'G4:16 G4:16 A4:16 G4:16' : 'F3:16 F3:16 G3:16 F3:16', tom: !I.grave ? 'C' : 'Bb', titulo: 'Notas para o vibrato medido', bpm: 72 }) + '<p><b>Vibrato medido:</b> metrônomo a ♩ = 72. Faça 2 ondulações por tempo (colcheias), depois 3 (tercinas), depois 4 (semicolcheias). Depois volte ao 3 e deixe-o natural.</p>',
    exs: (I) => [
      { nome: 'Vibrato medido', dur: '10 min/dia', bpm: 72, obj: 'Controle da velocidade e profundidade.', passos: ['2, 3 e 4 ondulações por tempo.', 'Profundidade pequena: a nota não pode desafinar.'], crit: 'Ondulações regulares nos três ritmos (confira com o afinador: oscilação simétrica).' },
      { nome: I.familia === 'metal' ? 'Cores' : 'Subtone', dur: '5 min/dia', obj: 'Ampliar a paleta.', passos: I.familia === 'metal' ? ['Se tiver surdina, toque uma melodia lenta com ela.', 'Experimente frullato (“trrr” com a língua).'] : ['No registro grave, notas longas em subtone.', 'Alterne som normal / subtone na mesma nota.'], crit: I.familia === 'metal' ? 'Melodia com surdina afinada.' : 'Subtone sem perder a afinação.' },
    ],
    met: [['Vibrato em colcheias / tercinas / semicolcheias', 72, 72, 'mesma velocidade, mude a subdivisão']],
    err: [['Vibrato rápido e nervoso (“cabra”).', 'Vibrato medido lento; profundidade pequena.'], ['Vibrato em tudo, sempre igual.', 'Escolha onde: notas longas, finais de frase, conforme o estilo.'], ['Vibrato que desafina para cima.', 'No sax/clarinete, o vibrato de mandíbula oscila logo abaixo da nota e volta a ela.']],
    tempo: '15–20 minutos por dia.',
    crit: ['Faço vibrato medido em 2, 3 e 4 ondulações por tempo a ♩ = 72.', 'Escolho com critério onde usar vibrato numa melodia.'],
    quiz: (I) => [
      { p: 'O vibrato deve…', o: ['esconder a desafinação', 'ser um recurso expressivo, escolhido conforme o estilo', 'estar em todas as notas', 'ser sempre rápido'], c: 1 },
      I.sub === 'clarinete' ? { p: 'No clarinete erudito (tradição orquestral)…', o: ['vibrato é obrigatório', 'tradicionalmente não se usa vibrato', 'vibrato é com a mão', 'vibrato é com a vara'], c: 1 } : I.sub === 'sax' ? { p: 'O vibrato do sax é feito principalmente com…', o: ['o diafragma', 'a mandíbula', 'os dedos', 'a cabeça'], c: 1 } : { p: I.sub === 'trombone' ? 'O vibrato clássico das big bands no trombone é feito com…' : 'O vibrato mais comum do trompete no jazz é com…', o: I.sub === 'trombone' ? ['os dedos', 'a vara', 'o pé', 'a cabeça'] : ['a mão direita balançando o instrumento', 'os pés', 'a vara', 'a palheta'], c: I.sub === 'trombone' ? 1 : 0 },
      { p: '“Vibrato tardio” é…', o: ['vibrato que chega atrasado do ritmo', 'começar a nota sem vibrato e acrescentá-lo depois', 'vibrato lento demais', 'não usar vibrato'], c: 1 },
    ],
    tarefa: 'Toque uma melodia lenta duas vezes: sem vibrato e com vibrato escolhido. Grave e compare.',
  });

  C.aula({
    id: '10-3', titulo: 'Afinação em toda a extensão e em conjunto', tempo: '20 min por dia',
    obj: 'Conhecer as tendências de afinação do seu instrumento e afinar em conjunto, em todas as dinâmicas.',
    apr: ['Mapa de afinação pessoal', 'Tendências típicas do instrumento', 'Correções (embocadura, dedilhados alternativos, gatilhos, vara)', 'Afinar em conjunto e em acordes'],
    teo: (I, H) => `<p>Nenhum instrumento é perfeitamente afinado em todas as notas. Cada modelo (e cada exemplar) tem <b>tendências</b>. O profissional conhece as suas e corrige antes de o ouvinte perceber.</p>` + por(I, {
      sax: H.tabela(['Região', 'Tendência comum', 'Correção'], [['Dó♯5 (sem dedos)', 'instável, som fino', 'garganta aberta; alguns tocam com dedos da mão direita abaixados'], ['Registro com chave de oitava, palma', 'tende a subir, especialmente em forte', 'garganta aberta, sem morder'], ['Graves em piano', 'podem subir e falhar', 'mais ar, menos mordida'], ['Notas em forte', 'tendem a descer se a embocadura relaxa', 'apoio, embocadura estável']]),
      clarinete: H.tabela(['Região', 'Tendência comum', 'Correção'], [['Garganta (Sol4–Si♭4)', 'som fraco, muitas vezes alto', 'dedos da mão direita abaixados (dedilhados de ressonância)'], ['Clarim agudo', 'tende a subir', 'garganta aberta, não morder'], ['Chalumeau em piano', 'pode subir', 'ar e embocadura estáveis'], ['Diferença entre registros', 'varia por instrumento', 'ajustar barrilete e junta do meio']]),
      trompete: H.tabela(['Nota/combinação', 'Tendência', 'Correção'], [['1-3 e 1-2-3 (Ré4, Dó♯4, Sol3, Fá♯3)', 'muito altas', 'gatilho do 3º pisto (e do 1º)'], ['5º harmônico (Mi5, Mi♭5, Ré5…)', 'baixos', 'pensar mais alto; dedilhados alternativos'], ['Ré5 e Dó♯5 (1, 1-2)', 'altos', 'gatilho do 1º pisto ou lábio'], ['Agudo forte', 'pode subir', 'ar, não pressão']]),
      trombone: H.tabela(['Nota/harmônico', 'Tendência', 'Correção'], [['5º harmônico (Ré4 na 1ª, Ré♭4 na 2ª…)', 'baixo', 'posição levemente mais curta'], ['6º harmônico (Fá4…)', 'levemente alto', 'posição levemente mais longa'], ['7º harmônico (Lá♭4 na 1ª)', 'muito baixo', 'evitar ou usar 3ª posição'], ['Posições alternativas', 'variam', 'afinar cada uma com o afinador']]),
    }) + `<p><b>Em conjunto:</b> afine sempre com a mesma referência do grupo (teclado, nota da banda: geralmente Si♭ de concerto). Em acordes, lembre a afinação justa (aula 9.4): 3ª maior um pouco mais baixa, 3ª menor um pouco mais alta. Em uníssono com outros sopros, ouça e “encaixe” seu som no do colega (sem batimentos).</p>`,
    pra: '<p><b>Faça seu mapa:</b> com o <a href="#afinador">afinador</a> (ou gravando e analisando), toque cada nota da extensão em mf, sem corrigir de propósito, e anote o desvio. Repita em p e em f. Esse mapa mostra exatamente onde você precisa corrigir.</p>',
    exs: [{ nome: 'Mapa de afinação', dur: '30 min (uma vez por mês)', obj: 'Conhecer suas tendências.', passos: ['Cromática lenta, 2 tempos por nota, gravando.', 'Envie na aba Afinador e copie a tabela de desvios.', 'Marque notas fora de ±15 cents e estude a correção.'], crit: 'Mapa feito e plano de correção para as 5 piores notas.' }, { nome: 'Uníssono', dur: '10 min', obj: 'Afinar com outro som.', passos: ['Toque com a nota de referência (ou com outro músico).', 'Elimine os batimentos.'], crit: 'Batimentos eliminados em até 2 s.' }],
    err: [['Confiar só no afinador.', 'O afinador ensina; o ouvido executa. Em grupo, afine com o grupo.'], ['Corrigir tudo com a embocadura.', 'Use também dedilhados alternativos, gatilhos ou posições.']],
    tempo: '20 minutos por dia e um mapa completo por mês.',
    crit: ['Fiz meu mapa de afinação em 3 dinâmicas.', 'Corrijo minhas 5 notas mais desafinadas.', 'Afino em uníssono sem batimentos em até 2 segundos.'],
    quiz: [
      { p: 'Para que serve o mapa de afinação?', o: ['Para decorar notas', 'Para conhecer as tendências do seu instrumento e corrigi-las', 'Para escolher repertório', 'Para limpar o instrumento'], c: 1 },
      { p: 'Em grupo, a referência de afinação é…', o: ['o seu afinador sempre', 'a referência do grupo (teclado, nota da banda)', 'a nota mais aguda', 'nenhuma'], c: 1 },
    ],
    tarefa: 'Faça o mapa de afinação e repita todo mês para comparar.',
  });

  C.aula({
    id: '10-4', titulo: 'Fraseado e interpretação', tempo: '30 min por dia',
    obj: 'Construir frases musicais com direção, respiração e intenção, e interpretar com estilo.',
    apr: ['O que é uma frase', 'Ápice e direção', 'Respiração dentro do fraseado', 'Interpretar como um cantor'],
    teo: '<p>Uma <b>frase</b> musical é como uma frase falada: tem começo, desenvolvimento, <b>ápice</b> (ponto culminante) e conclusão. Frases geralmente têm 2, 4 ou 8 compassos e terminam em cadências.</p><ul><li><b>Direção:</b> toda nota vai para algum lugar. Notas longas crescem ou diminuem; notas curtas conduzem às longas.</li><li><b>Ápice:</b> geralmente a nota mais aguda ou a mais longa; prepare-o.</li><li><b>Respiração:</b> respire onde um cantor respiraria (fim de ideia), nunca no meio de uma palavra musical.</li><li><b>Hierarquia:</b> nem todas as notas têm o mesmo peso. Tempos fortes, notas longas e dissonâncias recebem mais; notas de passagem, menos.</li><li><b>Fale com o instrumento:</b> cante a melodia com a letra (ou uma letra inventada) e imite a fala no instrumento.</li></ul>',
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'graca' }) + '<p>Marque a lápis: frases (arcos sobre 4 compassos), ápices, respirações e a dinâmica de cada frase. Toque como se estivesse cantando a letra.</p>',
    exs: [{ nome: 'Cante, depois toque', dur: '15 min', obj: 'Fraseado vocal.', passos: ['Cante a melodia com a letra.', 'Toque imitando o seu canto: respirações, ênfases, dinâmica.', 'Grave as duas versões.'], crit: 'A versão tocada tem as mesmas respirações e ênfases do canto.' }, { nome: 'Três interpretações', dur: '15 min', obj: 'Escolhas conscientes.', passos: ['Toque a mesma melodia de 3 formas: íntima, solene, alegre.', 'Mude dinâmica, articulação, vibrato e andamento.'], crit: 'Um ouvinte identifica as três intenções.' }],
    err: [['Tocar todas as notas iguais (“máquina de escrever”).', 'Defina a hierarquia das notas e a direção de cada frase.'], ['Respirar onde acaba o ar, não onde acaba a frase.', 'Planeje as respirações a lápis.']],
    tempo: '30 minutos por dia aplicados ao repertório.',
    crit: ['Marco frases, ápices e respirações numa melodia.', 'Toco a mesma melodia com 3 intenções reconhecíveis.'],
    quiz: [
      { p: 'O ápice de uma frase costuma ser…', o: ['a primeira nota', 'a nota mais aguda ou mais importante, preparada', 'a pausa', 'qualquer nota'], c: 1 },
      { p: 'Onde respirar?', o: ['quando acabar o ar', 'no fim de ideias musicais, como um cantor', 'a cada compasso', 'nunca'], c: 1 },
    ],
    tarefa: 'Escolha uma peça do repertório e escreva o mapa de fraseado completo.',
  });
})();
