/* Conservatório de Sopros — conteúdo do curso, módulos 1 a 4 (Iniciante).
   Cada campo pode ser texto ou função (I, H) => texto, onde I é o instrumento escolhido. */
window.Curso = window.Curso || { modulos: [], aulas: {} };
window.Curso.mod = function (m) { m.aulas = []; this.modulos.push(m); };
window.Curso.aula = function (a) {
  a.mod = +a.id.split('-')[0];
  this.aulas[a.id] = a;
  this.modulos.find((m) => m.n === a.mod).aulas.push(a.id);
};

(function () {
  'use strict';
  const C = window.Curso;
  const por = (I, m) => window.H.por(I, m);

  // =====================================================================
  C.mod({ n: 1, nivel: 'iniciante', titulo: 'Conhecendo o instrumento e primeiros sons', desc: 'História, família, partes, montagem, cuidados, equipamento, transposição e o primeiro som.' });

  C.aula({
    id: '1-1', titulo: 'O instrumento, sua história e sua família', tempo: '30 min',
    obj: (I) => `Entender de onde vem o ${I.nomeMin}, como ele produz som e qual é o seu lugar dentro da família de instrumentos.`,
    apr: (I) => ['Quem criou o instrumento e quando', 'Como o som é produzido (palheta ou vibração dos lábios)', 'Os membros da família e suas diferenças', `Por que o ${I.curto.toLowerCase()} soa como soa`],
    teo: (I, H) => por(I, {
      sax: `<p>O saxofone foi criado pelo belga <b>Adolphe Sax</b> (1814–1894), fabricante de instrumentos e clarinetista, na década de 1840. Ele registrou a patente em Paris em <b>1846</b>. A ideia era um instrumento com a agilidade das madeiras e a potência dos metais, para bandas militares e orquestras.</p>
        <p>Apesar de ser feito de metal (latão), o saxofone é um instrumento de <b>madeira</b> (família dos sopros de palheta): o som nasce da <b>palheta simples</b> vibrando contra a boquilha. O tubo é <b>cônico</b> (vai alargando até a campana). Por isso o sax “oitava” (a chave de oitava faz a mesma posição soar uma 8ª acima) e tem todos os harmônicos da série, pares e ímpares — o que dá o timbre redondo e vocal.</p>
        <p>Sax criou duas séries: uma em Fá e Dó (para orquestra, praticamente abandonada) e outra em <b>Mi♭ e Si♭</b> (para banda), que é a usada hoje. O <b>Dó melody</b> (sax em Dó) existiu no início do século XX e é raro.</p>`,
      clarinete: `<p>O clarinete nasceu do <b>chalumeau</b>, um instrumento barroco de palheta simples com extensão curta. Por volta de <b>1700</b>, o fabricante <b>Johann Christoph Denner</b>, de Nuremberg, acrescentou a chave de registro, que permite tocar um registro mais agudo. Ao longo do século XVIII ganhou mais chaves; Mozart escreveu para ele obras-primas (Concerto K. 622, Quinteto K. 581).</p>
        <p>O sistema mais usado hoje é o <b>Boehm</b>, adaptado ao clarinete por <b>Hyacinthe Klosé</b> e pelo fabricante <b>Louis-Auguste Buffet</b> por volta de 1839–1843. Na Alemanha e na Áustria usa-se o sistema <b>Oehler</b>, com dedilhados diferentes.</p>
        <p>O tubo do clarinete é <b>cilíndrico</b> e fechado de um lado pela palheta. Por isso ele se comporta como um tubo fechado: favorece os <b>harmônicos ímpares</b> e a chave de registro não leva a nota à oitava, e sim à <b>12ª</b> (oitava + quinta). É por isso que o Mi grave e o Si médio têm o mesmo dedilhado (mais a chave de registro), e é daí que vem o timbre “escuro e oco” do registro grave.</p>`,
      trompete: `<p>Trompetes existem há milênios como instrumentos de sinal e cerimônia. O <b>trompete natural</b> (sem válvulas) do Barroco só tocava as notas da série harmônica — Bach e Händel escreveram partes virtuosísticas no registro agudo, onde os harmônicos ficam próximos.</p>
        <p>As <b>válvulas</b> foram inventadas por volta de <b>1814–1818</b> por <b>Heinrich Stölzel</b> e <b>Friedrich Blühmel</b> (patente de 1818). Em 1838, <b>François Périnet</b> aperfeiçoou o <b>pisto</b> usado até hoje. Cada pisto acrescenta um trecho de tubo e abaixa a série harmônica: o 2º em meio tom, o 1º em um tom, o 3º em um tom e meio.</p>
        <p>O som nasce da <b>vibração dos lábios</b> dentro do bocal (o “buzz”). O tubo é em grande parte cilíndrico, com a parte final cônica até a campana, o que dá o brilho característico.</p>`,
      trombone: `<p>O trombone descende da <b>sacabuxa</b> (sackbut), usada desde o século XV. É um dos instrumentos mais antigos ainda em uso praticamente com a mesma mecânica: a <b>vara</b> alonga o tubo e abaixa a série harmônica em semitons, como os pistos fazem no trompete, mas de forma contínua.</p>
        <p>O som nasce da <b>vibração dos lábios</b> no bocal. Com a vara toda fechada (1ª posição), o trombone tenor toca a série harmônica de <b>Si♭</b>. Cada uma das <b>7 posições</b> abaixa meio tom. Como a vara é contínua, o trombonista ajusta a afinação com o braço — e precisa de ouvido muito atento.</p>
        <p>No Brasil, as bandas de música também usaram muito o <b>trombone de pisto</b>, com o mesmo princípio do trompete. Hoje o mais comum é o <b>trombone tenor de vara</b>, às vezes com <b>rotor de Fá</b> (gatilho que acrescenta tubo e facilita o registro grave).</p>`,
    }),
    pra: (I, H) => por(I, {
      sax: H.tabela(['Saxofone', 'Afinação', 'Soa em relação ao escrito', 'Uso típico'], [
        ['Sopranino', 'Mi♭', '3ª menor acima', 'raro; música contemporânea'],
        ['<b>Soprano</b>', 'Si♭', '2ª maior abaixo', 'jazz, quarteto, solo; som próximo do oboé'],
        ['<b>Alto</b>', 'Mi♭', '6ª maior abaixo', 'o mais usado para iniciar; banda, jazz, igreja, erudito'],
        ['Tenor', 'Si♭', '9ª maior abaixo', 'jazz, rock, soul; som mais grave e “rouco”'],
        ['Barítono', 'Mi♭', '8ª + 6ª maior abaixo', 'base grave de naipes e big bands'],
        ['Baixo', 'Si♭', '2 oitavas + 2ª maior abaixo', 'raro'],
      ]) + `<p>Ponto essencial: <b>todos os saxofones usam o mesmo dedilhado escrito</b>. Um Dó escrito tem a mesma posição no soprano, alto, tenor e barítono — muda apenas o som real. Por isso as partes são escritas transpostas. ${I.id === 'alto' ? 'No seu sax alto, o Dó escrito soa Mi♭.' : 'No seu sax soprano, o Dó escrito soa Si♭. O soprano costuma ser reto (alguns modelos são curvos) e exige embocadura mais firme e precisa que o alto.'}</p>`,
      clarinete: H.tabela(['Clarinete', 'Afinação', 'Soa em relação ao escrito', 'Uso típico'], [
        ['Requinta', 'Mi♭', '3ª menor acima', 'banda e orquestra, agudos brilhantes'],
        ['<b>Clarinete em Si♭</b>', 'Si♭', '2ª maior abaixo', 'o mais comum: banda, orquestra, choro, jazz, igreja'],
        ['Clarinete em Lá', 'Lá', '3ª menor abaixo', 'orquestra (tonalidades com sustenidos)'],
        ['Clarinete alto', 'Mi♭', '6ª maior abaixo', 'banda'],
        ['Clarone (baixo)', 'Si♭', '9ª maior abaixo', 'banda, orquestra, música de câmara'],
      ]) + '<p>Todos usam o mesmo dedilhado escrito. Neste curso você estuda o <b>clarinete em Si♭</b>, sistema Boehm.</p>',
      trompete: H.tabela(['Instrumento', 'Afinação', 'Soa em relação ao escrito', 'Uso típico'], [
        ['<b>Trompete em Si♭</b>', 'Si♭', '2ª maior abaixo', 'o mais comum: banda, jazz, popular, igreja'],
        ['Trompete em Dó', 'Dó', 'como escrito', 'orquestra sinfônica'],
        ['Trompete piccolo', 'Si♭/Lá', '7ª menor acima (em Si♭)', 'Barroco, agudíssimo'],
        ['Cornet (cornetim)', 'Si♭', '2ª maior abaixo', 'bandas; som mais aveludado'],
        ['Flugelhorn', 'Si♭', '2ª maior abaixo', 'jazz e baladas; som escuro e macio'],
      ]) + '<p>Trompete em Si♭, cornet e flugelhorn usam os mesmos pistos para as mesmas notas escritas.</p>',
      trombone: H.tabela(['Trombone', 'Afinação', 'Leitura', 'Uso típico'], [
        ['Alto', 'Mi♭', 'clave de Dó (3ª linha) ou Fá', 'música antiga e clássica'],
        ['<b>Tenor</b>', 'Si♭', 'clave de Fá, sons reais', 'o mais comum'],
        ['Tenor com rotor de Fá', 'Si♭/Fá', 'clave de Fá', 'orquestra, jazz, facilita o grave'],
        ['Baixo', 'Si♭/Fá/(Sol ou Mi♭)', 'clave de Fá', 'naipe de orquestra e big band'],
        ['Trombone de pisto', 'Si♭', 'clave de Fá ou Sol (Si♭)', 'bandas de música brasileiras'],
      ]) + '<p>O trombone tenor é “afinado em Si♭” (a 1ª posição é a série harmônica de Si♭), mas <b>lê em sons reais</b> na clave de Fá. Você vai aprender também a leitura em Si♭ na clave de Sol, comum em algumas bandas e igrejas.</p>',
    }),
    ex: (I) => por(I, {
      sax: '<p>Ouça e compare (procure em plataformas de streaming): <b>Marcel Mule</b> (som erudito francês), <b>Charlie Parker</b> e <b>Cannonball Adderley</b> (jazz no alto), <b>Paul Desmond</b> (alto suave, “Take Five”), <b>John Coltrane</b> e <b>Sidney Bechet</b> no soprano, <b>Kenny G</b> (soprano pop). Anote em uma frase como é o som de cada um.</p>',
      clarinete: '<p>Ouça e compare: o Concerto K. 622 de Mozart (qualquer gravação de orquestra), <b>Benny Goodman</b> (swing), <b>Artie Shaw</b>, <b>Abel Ferreira</b> (“Chorando Baixinho”) e <b>Paulo Moura</b> (choro e música brasileira). Anote como o timbre muda entre o registro grave e o agudo.</p>',
      trompete: '<p>Ouça e compare: <b>Louis Armstrong</b> (“West End Blues”), <b>Miles Davis</b> (“So What”), <b>Chet Baker</b>, <b>Wynton Marsalis</b> (Haydn e jazz) e um frevo pernambucano (“Vassourinhas”). Anote diferenças de brilho, vibrato e articulação.</p>',
      trombone: '<p>Ouça e compare: <b>J. J. Johnson</b> (bebop), <b>Tommy Dorsey</b> (legato cantado), <b>Curtis Fuller</b> (“Blue Train”), <b>Raul de Souza</b> (música brasileira) e o solo de trombone do <b>Bolero</b> de Ravel. Anote como cada um usa o glissando e o legato.</p>',
    }),
    exs: (I) => [
      { nome: 'Ficha do instrumento', dur: '10 min', obj: 'Fixar os dados básicos do seu instrumento.', passos: ['Escreva num caderno: nome, afinação, família, como o som é produzido, quem criou/aperfeiçoou.', `Escreva: “Quando leio Dó, soa ${I.transp.s ? window.Musica.nomeBR(window.Musica.escritaParaConcerto(window.Musica.parse('C4'), I)) : 'Dó'}”.`, 'Explique em voz alta, em 1 minuto, como o som nasce no seu instrumento.'], crit: 'Você explica sem consultar.' },
      { nome: 'Escuta comparada', dur: '15 min', obj: 'Começar a formar sua referência de som.', passos: ['Ouça 3 gravações da lista de exemplos.', 'Para cada uma, anote 3 adjetivos para o som (ex.: escuro, brilhante, aveludado, áspero).', 'Escolha a que você mais gostaria de soar e guarde a gravação: ela será sua referência.'], crit: 'Três gravações anotadas e uma referência escolhida.' },
    ],
    err: (I) => [
      [`Achar que o ${I.curto.toLowerCase()} “é igual” a outro membro da família.`, 'O dedilhado escrito pode ser o mesmo, mas a nota real, a embocadura e o repertório mudam. Sempre confira para qual instrumento a partitura foi escrita.'],
      ['Estudar sem ouvir bons instrumentistas.', 'Ouvir é metade do estudo: você só produz o som que consegue imaginar. Ouça 15 minutos por dia de referência.'],
    ],
    tempo: '30 minutos de leitura e escuta, em um ou dois dias.',
    crit: (I) => ['Sei explicar como o som é produzido no meu instrumento.', 'Sei dizer a afinação do meu instrumento e o que ela significa.', 'Ouvi pelo menos três gravações de referência e escolhi uma.'],
    quiz: (I) => {
      const q = por(I, {
        sax: [{ p: 'Quem inventou o saxofone?', o: ['Theobald Boehm', 'Adolphe Sax', 'Johann Denner', 'Hyacinthe Klosé'], c: 1, e: 'Adolphe Sax, belga, patente em 1846.' },
          { p: 'O saxofone é classificado como instrumento de…', o: ['metal, porque é feito de latão', 'madeira, porque o som vem de uma palheta', 'percussão', 'cordas'], c: 1, e: 'A classificação segue a forma de produzir o som (palheta), não o material.' },
          { p: 'O tubo do saxofone é…', o: ['cilíndrico', 'cônico', 'quadrado', 'igual ao do clarinete'], c: 1, e: 'Cônico — por isso “oitava” com a chave de oitava.' }],
        clarinete: [{ p: 'O clarinete descende de qual instrumento?', o: ['Oboé', 'Chalumeau', 'Flauta doce', 'Fagote'], c: 1, e: 'Denner acrescentou a chave de registro ao chalumeau por volta de 1700.' },
          { p: 'A chave de registro do clarinete leva a nota a…', o: ['uma oitava acima', 'uma 12ª acima (oitava + quinta)', 'uma quinta acima', 'uma 4ª acima'], c: 1, e: 'Tubo cilíndrico fechado: favorece harmônicos ímpares; o 1º acima da fundamental é a 12ª.' },
          { p: 'O sistema de chaves mais usado no Brasil é o…', o: ['Oehler', 'Boehm', 'Albert', 'Müller'], c: 1, e: 'Boehm, adaptado por Klosé e Buffet.' }],
        trompete: [{ p: 'O que os pistos fazem?', o: ['Abrem furos no tubo', 'Acrescentam tubo e abaixam a série harmônica', 'Mudam a palheta', 'Aumentam o volume'], c: 1, e: '2º pisto: ½ tom; 1º: 1 tom; 3º: 1 tom e ½.' },
          { p: 'Como nasce o som do trompete?', o: ['De uma palheta', 'Da vibração dos lábios no bocal', 'Do ar batendo numa aresta', 'Dos pistos'], c: 1, e: 'É o “buzz” labial.' },
          { p: 'Em qual época surgiram as válvulas?', o: ['Século XV', 'Início do século XIX (1814–1818)', 'Século XX', 'Barroco'], c: 1, e: 'Stölzel e Blühmel, patente de 1818.' }],
        trombone: [{ p: 'Quantas posições tem a vara do trombone?', o: ['3', '5', '7', '12'], c: 2, e: 'Sete posições, cada uma meio tom abaixo da anterior.' },
          { p: 'Na 1ª posição, o trombone tenor toca a série harmônica de…', o: ['Dó', 'Fá', 'Si♭', 'Mi♭'], c: 2, e: 'Por isso se diz que é “afinado em Si♭”.' },
          { p: 'Na clave de Fá, o trombone tenor lê…', o: ['transposto uma 2ª acima', 'em sons reais', 'uma 6ª acima', 'uma 9ª acima'], c: 1, e: 'Não transpõe na clave de Fá.' }],
      });
      return q.concat([{ p: 'Qual frase está correta?', o: ['Instrumentos da mesma família sempre soam a mesma nota com o mesmo dedilhado', 'Instrumentos da mesma família podem ter o mesmo dedilhado escrito e soar notas diferentes', 'Transposição é um erro de impressão', 'Só instrumentos de metal transpõem'], c: 1, e: 'É exatamente isso que a transposição resolve.' }]);
    },
    tarefa: 'Leia a aula 1.2 e separe o instrumento, o estojo e um pano macio. Na próxima aula você vai montar e desmontar o instrumento do jeito certo.',
  });

  C.aula({
    id: '1-2', titulo: 'Partes do instrumento, montagem e desmontagem', tempo: '30 min + 5 min por dia',
    obj: 'Conhecer cada parte pelo nome e montar e desmontar o instrumento com segurança, sem entortar chaves nem danificar peças.',
    apr: ['Nome e função de cada parte', 'Ordem correta de montagem', 'Ajuste da palheta (instrumentos de palheta) ou do bocal (metais)', 'Postura e forma de segurar'],
    teo: (I, H) => por(I, {
      sax: H.tabela(['Parte', 'Função'], [
        ['Boquilha', 'Onde a palheta vibra. Sua câmara e abertura definem muito do timbre.'],
        ['Palheta', 'Lâmina de cana (ou sintética) que vibra e gera o som.'],
        ['Abraçadeira', 'Prende a palheta na boquilha. Firme, sem esmagar.'],
        ['Tudel (pescoço)', 'Tubo curvo que liga a boquilha ao corpo; tem a cortiça e uma das chaves de oitava.'],
        ['Corpo', 'Tubo cônico com as chaves e sapatilhas que abrem e fecham os furos.'],
        ['Chaves e sapatilhas', 'Alavancas que fecham os furos; as sapatilhas (couro) vedam o furo.'],
        ['Campana', 'A saída do som. Nunca apoie o sax pela campana com força.'],
        ['Correia (talabarte)', 'Sustenta o peso. Regule para a boquilha chegar à boca sem você abaixar ou levantar a cabeça.'],
        ['Chave de oitava', 'Acionada pelo polegar esquerdo; abre os furos de oitava.'],
      ]),
      clarinete: H.tabela(['Parte', 'Função'], [
        ['Boquilha', 'Onde a palheta vibra.'], ['Palheta e abraçadeira', 'A palheta vibra; a abraçadeira a prende.'],
        ['Barrilete', 'Liga a boquilha ao corpo; puxá-lo ajusta a afinação geral.'],
        ['Corpo superior', 'Mão esquerda: polegar (furo e chave de registro), chave de Lá, Sol♯ e furos 1–3.'],
        ['Corpo inferior', 'Mão direita: furos 4–6, chaves laterais e chaves dos mínimos. Tem o apoio do polegar direito.'],
        ['Ponte', 'Ligação mecânica entre os corpos. É a peça que mais se entorta na montagem errada.'],
        ['Campana', 'Melhora as notas graves e a projeção.'],
      ]),
      trompete: H.tabela(['Parte', 'Função'], [
        ['Bocal', 'Onde os lábios vibram. Taça e borda definem conforto e timbre.'],
        ['Tubo de entrada (leadpipe)', 'Recebe o bocal; acumula sujeira — limpe sempre.'],
        ['Bomba geral (de afinação)', 'Puxar abaixa a afinação; empurrar sobe.'],
        ['Pistos 1, 2 e 3', 'Acrescentam tubo. Numerados: não troque de lugar.'],
        ['Bombas dos pistos e gatilhos', 'Ajustam a afinação de cada pisto; os gatilhos (1º e 3º) corrigem notas altas.'],
        ['Chave d’água', 'Esvazia a condensação.'], ['Campana', 'Projeta o som.'],
      ]),
      trombone: H.tabela(['Parte', 'Função'], [
        ['Bocal', 'Onde os lábios vibram. Perna fina (small shank) ou grossa (large shank) — deve combinar com o instrumento.'],
        ['Vara (interna e externa)', 'Desliza para mudar de posição. É a peça mais delicada.'],
        ['Trava da vara', 'Prende a vara fechada quando você não está tocando.'],
        ['Campana e bomba de afinação', 'A bomba ajusta a afinação geral.'], ['Chave d’água', 'Na ponta da vara; esvazia a condensação.'],
        ['Rotor de Fá (se houver)', 'Acionado pelo polegar esquerdo; acrescenta tubo.'],
      ]),
    }),
    pra: (I) => por(I, {
      sax: `<ol><li>Coloque a correia no pescoço. Abra o estojo na horizontal, no chão ou na mesa.</li>
        <li>Retire o corpo segurando pela parte de baixo (perto da campana), nunca pelas hastes das chaves. Prenda na correia.</li>
        <li>Afrouxe o parafuso do encaixe. Encaixe o tudel girando de leve, <b>segurando-o pela parte de baixo</b>, sem apertar a chave de oitava. Alinhe a boquilha ao centro do corpo e aperte o parafuso.</li>
        <li>Passe um pouco de graxa na cortiça do tudel se estiver seca. Encaixe a boquilha girando, cobrindo cerca de metade a dois terços da cortiça (ajuste fino com o afinador, na aula 1.5).</li>
        <li>Molhe a palheta na boca por 30 segundos. Coloque-a centralizada sobre a mesa da boquilha, com a ponta da palheta <b>praticamente rente</b> à ponta da boquilha (deixe aparecer só um fio da boquilha).</li>
        <li>Coloque a abraçadeira e aperte os parafusos o suficiente para a palheta não se mexer. Apertar demais abafa o som.</li>
        <li><b>Postura:</b> sentado na ponta da cadeira, costas retas; o sax alto vai ao lado direito do corpo (ou à frente, entre as pernas, se for mais confortável); o sax tenor, maior e mais pesado, vai quase sempre ao lado direito, com a correia bem regulada (de pé, ele fica à frente, levemente inclinado); o soprano vai à frente, inclinado uns 30–45° em relação ao corpo. A cabeça fica reta: o instrumento vem até você.</li></ol>`,
      clarinete: `<ol><li>Passe graxa nas cortiças se estiverem secas.</li><li>Encaixe a campana no corpo inferior girando de leve.</li>
        <li>Segure o corpo superior <b>pressionando o anel do 3º furo</b> (isso levanta a meia-ponte). Segure o corpo inferior pela parte de baixo, sem apertar as chaves laterais. Gire para encaixar e <b>alinhe a ponte</b>: as duas metades devem ficar alinhadas, sem se tocar com força.</li>
        <li>Encaixe o barrilete e, por último, a boquilha (com a parte achatada alinhada ao apoio do polegar direito, por baixo).</li>
        <li>Molhe a palheta, centralize, ponta rente à ponta da boquilha; abraçadeira firme, sem esmagar.</li>
        <li><b>Postura:</b> instrumento a cerca de 30–40° do corpo, cotovelos soltos, polegar direito sob o apoio, cabeça reta. Não aperte o clarinete para cima com o polegar.</li></ol>`,
      trompete: `<ol><li>Segure o trompete pelos pistos com a mão esquerda.</li><li>Encaixe o bocal com <b>um leve giro</b> — nunca bata nem force (o bocal entalado só sai com ferramenta).</li>
        <li>Confira se os pistos estão nas posições certas (números para o bocal) e se sobem livres. Se estiverem secos, aplique óleo de pisto.</li>
        <li>Puxe a bomba geral cerca de 1 cm (ajuste fino com o afinador).</li>
        <li><b>Postura:</b> mão esquerda envolvendo os pistos (dedo anelar no anel da 3ª bomba), mão direita com a <b>ponta dos dedos</b> sobre os pistos (dedos curvos, como se segurasse uma bola), mínimo <b>fora</b> do gancho (o gancho é para virar a página, não para fazer força). Trompete apontado para a frente e levemente para baixo.</li></ol>`,
      trombone: `<ol><li>Pegue a vara pela parte das travessas (braços), com ela travada. Apoie a ponta no chão sobre um pano, se necessário.</li>
        <li>Encaixe a campana na vara formando um ângulo de cerca de 90° e aperte a porca sem força excessiva.</li><li>Encaixe o bocal com um leve giro.</li>
        <li>Destrave a vara e teste: ela deve deslizar livre. Se estiver presa, aplique creme ou óleo de vara e borrife água.</li>
        <li><b>Postura:</b> a mão esquerda sustenta todo o peso (indicador sobre o bocal ou no apoio, polegar ao redor do tubo ou no rotor); a mão direita só <b>conduz</b> a vara com o polegar e dois dedos, com o pulso solto. Não aperte a vara.</li></ol>`,
    }),
    exs: (I) => [
      { nome: 'Montagem cronometrada', dur: '5 min/dia', obj: 'Montar com segurança, sem pressa e sem forçar.', passos: ['Monte o instrumento seguindo os passos, devagar, dizendo o nome de cada peça em voz alta.', 'Desmonte na ordem inversa e guarde no estojo.', 'Repita 3 vezes.'], crit: 'Monta e desmonta em menos de 2 minutos, sem tocar nas hastes das chaves (ou na vara) com força.' },
      { nome: 'Postura no espelho', dur: '5 min', obj: 'Criar uma postura que não gere tensão.', passos: ['De pé, em frente ao espelho, com o instrumento em posição de tocar.', 'Verifique: ombros baixos, pescoço reto, cotovelos soltos, punhos alinhados.', 'Fique 1 minuto parado assim, respirando fundo. Depois repita sentado.'], crit: 'Consegue ficar 1 minuto em posição sem tensão nos ombros.' },
    ],
    err: (I) => por(I, {
      palheta: [['Segurar o corpo pelas chaves ao montar.', 'Segure pelas partes sem mecanismo (campana, tubos, parte inferior do corpo). Chaves tortas causam vazamentos.'],
        ['Palheta desalinhada ou com a ponta muito abaixo/acima da boquilha.', 'Centralize e deixe a ponta da palheta rente à ponta da boquilha. Teste girando um pouco e compare o som.'],
        ['Apertar demais a abraçadeira.', 'Firme o suficiente para não mexer. Aperto excessivo abafa o som e dificulta os graves.'],
        ['Abaixar a cabeça para alcançar a boquilha.', 'Ajuste a correia (sax) ou o ângulo do instrumento (clarinete): o instrumento vai até você.']],
      metal: [['Bater o bocal para encaixar.', 'Encaixe com um leve giro. Se entalar, procure um técnico com sacador de bocal — não use alicate.'],
        ['Fazer força com a mão direita (trompete: mínimo no gancho; trombone: apertar a vara).', 'A mão esquerda sustenta o peso. A mão direita fica leve, para dedos ou vara se moverem livres.'],
        ['Guardar o instrumento molhado e sem esvaziar a água.', 'Esvazie pela chave d’água e deixe secar antes de fechar o estojo.']],
    }),
    tempo: 'Uma sessão de 30 minutos e depois 5 minutos por dia, até automatizar.',
    crit: ['Sei o nome e a função de cada parte.', 'Monto e desmonto sem forçar nenhuma peça.', 'Consigo ficar em posição de tocar sem tensão nos ombros e no pescoço.'],
    quiz: (I) => por(I, {
      sax: [{ p: 'Onde fica a ponta da palheta em relação à boquilha?', o: ['1 cm abaixo', 'Praticamente rente à ponta da boquilha', 'Acima da ponta', 'Tanto faz'], c: 1 }, { p: 'Como o tudel deve ser segurado ao encaixar?', o: ['Pela chave de oitava', 'Pela parte de baixo, sem apertar a chave', 'Pela boquilha', 'Pela cortiça'], c: 1, e: 'A chave de oitava do tudel entorta com facilidade.' }, { p: 'A cabeça, ao tocar, deve…', o: ['inclinar para baixo até a boquilha', 'ficar reta: o instrumento vem até a boca', 'virar para o lado', 'inclinar para trás'], c: 1 }],
      clarinete: [{ p: 'Por que se aperta o anel do 3º furo ao montar o corpo superior?', o: ['Para afinar', 'Para levantar a meia-ponte e não entortá-la', 'Para limpar', 'Não é necessário'], c: 1 }, { p: 'O que o barrilete faz, além de ligar as peças?', o: ['Nada', 'Ajusta a afinação geral', 'Muda o registro', 'Prende a palheta'], c: 1 }, { p: 'O polegar direito…', o: ['empurra o clarinete para cima com força', 'apoia sob o suporte, sem forçar', 'fica no furo', 'segura a campana'], c: 1 }],
      trompete: [{ p: 'Como encaixar o bocal?', o: ['Batendo com a palma', 'Com um leve giro', 'Com alicate', 'Molhado'], c: 1 }, { p: 'Para que serve o gancho do 1º pisto?', o: ['Para apoiar o mínimo e fazer força', 'Para virar a página ou usar surdina; o mínimo fica fora', 'Para afinar', 'Para segurar o trompete'], c: 1 }, { p: 'A bomba geral, quando puxada…', o: ['sobe a afinação', 'abaixa a afinação', 'não muda nada', 'muda os pistos'], c: 1 }],
      trombone: [{ p: 'Qual mão sustenta o peso do trombone?', o: ['Direita', 'Esquerda', 'As duas igualmente', 'Nenhuma: apoia no ombro'], c: 1 }, { p: 'O ângulo entre vara e campana é de aproximadamente…', o: ['45°', '90°', '180°', '0°'], c: 1 }, { p: 'Se a vara está presa…', o: ['force mais', 'aplique creme/óleo de vara e borrife água; se continuar, técnico', 'use sabão', 'bata de leve'], c: 1 }],
    }),
    tarefa: 'Monte e desmonte o instrumento todos os dias até a próxima aula. Fotografe sua postura (de frente e de lado) e compare com a descrição desta aula.',
  });

  C.aula({
    id: '1-3', titulo: 'Cuidados, limpeza e manutenção', tempo: '25 min',
    obj: 'Manter o instrumento em condição de tocar bem e identificar problemas mecânicos antes que atrapalhem seu estudo.',
    apr: ['Limpeza diária e periódica', 'Armazenamento correto', 'Lubrificação (cortiças, pistos, vara, bombas)', 'Como identificar problemas mecânicos', 'Quando procurar um técnico'],
    teo: (I) => `<p>A umidade do sopro, a saliva e a gordura das mãos são os maiores inimigos do instrumento. Sem limpeza, ${I.familia === 'metal' ? 'o tubo acumula resíduos que estreitam a passagem de ar, os pistos/vara ficam lentos e a laca se desgasta' : 'as sapatilhas apodrecem e passam a vazar, as palhetas mofam e a boquilha acumula calcário'}. Um instrumento com defeito faz você culpar sua técnica por um problema que é mecânico.</p>
      <p><b>Revisão preventiva:</b> leve o instrumento a um técnico especializado em sopros (luthier de sopros) <b>uma vez por ano</b>, ou sempre que notar algum dos sinais abaixo.</p>`,
    pra: (I, H) => por(I, {
      sax: `<h4>Depois de cada estudo</h4><ul><li>Retire a palheta, seque e guarde num porta-palhetas (estojo que mantém a palheta plana).</li><li>Passe o puxador (pano com cordão) pelo corpo, entrando pela campana, 2–3 vezes. Seque o tudel com um puxador próprio.</li><li>Seque a boquilha por dentro com um pano macio (não passe o puxador do corpo nela).</li><li>Se uma sapatilha grudar, coloque papel de seda/sapatilha entre ela e o furo, feche a chave e puxe o papel.</li></ul>
        <h4>Semanal</h4><ul><li>Lave a boquilha com água morna (não quente) e sabão neutro, com escova macia.</li><li>Limpe as partes externas com pano seco (pano de microfibra). Não use produtos de prata em sax laqueado.</li></ul>
        <h4>Sinais de problema</h4>${H.tabela(['Sintoma', 'Causa provável'], [['Notas graves não saem ou guincham', 'Sapatilha vazando (muitas vezes a do Sol♯, do Mi♭ ou das graves) ou tudel mal encaixado'], ['Ré médio e notas agudas falham', 'Chave de oitava do tudel ou do corpo não abre/fecha bem'], ['Barulho de metal ao apertar as chaves', 'Feltros e cortiças gastos'], ['Chave não volta sozinha', 'Mola solta ou quebrada'], ['Todas as notas difíceis de repente', 'Palheta rachada/empenada; teste com outra antes de culpar o sax']])}`,
      clarinete: `<h4>Depois de cada estudo</h4><ul><li>Retire a palheta e guarde num porta-palhetas.</li><li>Desmonte e passe o puxador em cada parte, sempre no sentido do barrilete para a campana.</li><li>Seque as cortiças e o interior dos encaixes.</li></ul>
        <h4>Clarinete de madeira</h4><ul><li>A madeira (geralmente granadilha) pode <b>rachar</b> com mudança brusca de temperatura. Em dia frio, aqueça o instrumento nas mãos ou debaixo do braço antes de tocar; nos primeiros minutos, toque em volume moderado.</li><li>Nunca deixe no sol, no carro ou perto de ar-condicionado.</li><li>Lubrificação do furo com óleo: apenas conforme orientação do fabricante ou do técnico.</li></ul>
        <h4>Sinais de problema</h4>${H.tabela(['Sintoma', 'Causa provável'], [['Notas graves guincham', 'Vazamento em sapatilha ou ponte desalinhada'], ['Si médio (passagem) não sai', 'Vazamento no corpo inferior ou nas chaves dos mínimos; ou dedos não tampando os anéis'], ['Rachadura visível', 'Procure o técnico imediatamente: rachaduras podem ser seladas com pinos'], ['Cortiça solta ou encaixe frouxo', 'Troca de cortiça']])}`,
      trompete: `<h4>Depois de cada estudo</h4><ul><li>Esvazie a água pela chave d’água (e pelas bombas, se necessário).</li><li>Limpe o bocal por dentro com a escova de bocal 1× por semana (ou diariamente, se comer antes de tocar).</li></ul>
        <h4>Mensal: banho</h4><ol><li>Desmonte pistos e bombas (anote a posição de cada pisto). Coloque o corpo numa banheira com água morna e sabão neutro (nunca quente demais, para não danificar a laca).</li><li>Passe o escovão flexível pelos tubos e o escovão de pisto nas camisas.</li><li>Enxágue, seque, lubrifique: <b>óleo</b> nos pistos, <b>graxa</b> nas bombas.</li></ol>
        <h4>Sinais de problema</h4>${H.tabela(['Sintoma', 'Causa provável'], [['Pisto lento ou preso', 'Sujeira ou falta de óleo; pisto amassado (técnico)'], ['Som abafado em uma combinação de pistos', 'Pisto montado no lugar errado ou girado'], ['Bomba não se move', 'Graxa seca; não force com alicate'], ['Amassado no tubo de entrada ou na campana', 'Altera resposta e afinação: técnico']])}`,
      trombone: `<h4>Depois de cada estudo</h4><ul><li>Esvazie a água pela chave d’água da vara.</li><li>Trave a vara antes de guardar.</li></ul>
        <h4>Vara</h4><ul><li>Use creme ou óleo próprio de vara em pouca quantidade e borrife água para deslizar.</li><li>Limpe a vara interna com pano macio; a externa com vareta de limpeza e pano (técnico pode ensinar).</li><li>A vara entorta com qualquer pancada. Nunca apoie o trombone pela vara destravada.</li></ul>
        <h4>Mensal: banho</h4><p>Igual ao trompete: água morna com sabão neutro, escovão flexível, enxágue, seque, lubrifique bombas com graxa e o rotor (se houver) com óleo de rotor.</p>
        ${H.tabela(['Sintoma', 'Causa provável'], [['Vara pesada em um ponto', 'Vara empenada ou amassada: técnico'], ['Vara pesada no todo', 'Falta de lubrificação ou sujeira'], ['Rotor lento', 'Óleo de rotor; cordinha/haste desajustada']])}`,
    }),
    exs: [
      { nome: 'Kit de manutenção', dur: '15 min', obj: 'Ter tudo de que precisa à mão.', passos: ['Monte seu kit e guarde no estojo.', 'Faça uma limpeza completa conforme a aula.', 'Agende na agenda do celular a limpeza semanal/mensal.'], crit: 'Kit completo e limpeza feita.' },
      { nome: 'Inspeção visual', dur: '10 min', obj: 'Conhecer o estado do seu instrumento.', passos: ['Com boa luz, observe cada chave/pisto/vara.', 'Abra e feche cada chave (ou pisto) e ouça ruídos.', 'Anote qualquer anormalidade da tabela de sinais.'], crit: 'Lista de verificação concluída e anotada.' },
    ],
    err: (I) => [
      ['Guardar o instrumento molhado.', 'Sempre seque e esvazie a água. A umidade presa no estojo destrói sapatilhas, feltros e cria mau cheiro.'],
      ['Tentar consertar sozinho com alicate.', 'Fora a limpeza e a lubrificação, deixe com o técnico. Um ajuste errado pode custar mais caro.'],
      [I.familia === 'metal' ? 'Comer ou tomar refrigerante antes de tocar.' : 'Tocar logo depois de comer doce.', 'Escove os dentes ou enxágue a boca antes de tocar. Açúcar e resíduos vão direto para o instrumento.'],
    ],
    tempo: '25 minutos para a primeira limpeza completa; 3 minutos depois de cada estudo.',
    crit: ['Faço a limpeza diária sem precisar consultar a aula.', 'Sei identificar pelo menos três sinais de problema mecânico.', 'Tenho um kit de manutenção completo.'],
    quiz: (I) => [
      { p: 'Com que frequência é recomendada uma revisão com técnico?', o: ['Nunca, se o instrumento é novo', 'Uma vez por ano ou ao notar defeitos', 'Toda semana', 'A cada 10 anos'], c: 1 },
      { p: I.familia === 'metal' ? 'Qual a temperatura da água no banho do instrumento?' : 'Como lavar a boquilha?', o: I.familia === 'metal' ? ['Fervendo', 'Morna, com sabão neutro', 'Gelada com álcool', 'Com água sanitária'] : ['Água fervente', 'Água morna e sabão neutro', 'Álcool puro', 'Detergente forte e palha de aço'], c: 1 },
      { p: 'Notas graves que guincham de repente costumam indicar…', o: ['falta de talento', I.familia === 'metal' ? 'bocal errado' : 'vazamento em sapatilha ou palheta danificada', 'que está calor', 'que precisa tocar mais forte'], c: I.familia === 'metal' ? 1 : 1, e: I.familia === 'metal' ? 'Nos metais, um problema repentino geralmente é sujeira, pisto/vara ou bocal; teste o equipamento antes de culpar a técnica.' : 'Sempre teste outra palheta e verifique vazamentos antes de culpar a técnica.' },
    ],
    tarefa: 'Faça a limpeza diária durante toda a semana. Na próxima aula você vai escolher (ou avaliar) seu equipamento.',
  });

  C.aula({
    id: '1-4', titulo: (function () { return 'Escolhendo o equipamento'; })(), tempo: '30 min',
    obj: (I) => `Entender como ${I.familia === 'metal' ? 'o bocal' : 'a boquilha e a palheta'} influenciam o som e escolher o equipamento certo para o seu nível e objetivo.`,
    apr: (I) => I.familia === 'metal' ? ['Partes do bocal e o que cada uma muda', 'Numeração dos bocais', 'Bocal de estudo × bocal para estilo específico', 'Quando trocar de equipamento'] : ['Como a boquilha influencia o timbre', 'Numeração das palhetas', 'Palhetas de cana × sintéticas', 'Como selecionar e conservar palhetas'],
    teo: (I, H) => por(I, {
      palheta: `<p><b>Boquilha:</b> o que mais muda o som é a <b>abertura</b> (distância entre a ponta da palheta e a ponta da boquilha), o <b>comprimento da mesa</b> (facing) e a <b>câmara</b> (o espaço interno). Abertura maior = mais volume e flexibilidade, mas exige mais controle e palheta mais macia. Câmara grande e defletor (rampa) baixo = som escuro (erudito); câmara menor e defletor alto = som brilhante (pop, funk).</p>
        <p><b>Palheta:</b> é numerada pela <b>dureza</b>, geralmente de 1½ a 5. Quanto maior o número, mais dura. As escalas <b>não são iguais entre marcas</b>: uma Vandoren 2 é mais dura que uma Rico 2. Palheta dura demais = som soprado e cansaço; macia demais = som fino e “ventado”, afinação baixa e agudo fechado.</p>
        ${H.tabela(['Tipo', 'Vantagens', 'Desvantagens'], [['Cana (natural)', 'Timbre mais rico e flexível; padrão em escolas', 'Varia de uma para outra; dura algumas semanas; sensível ao clima'], ['Sintética (ex.: Légère, Fiberreed)', 'Consistente, dura meses, pronta para tocar', 'Timbre um pouco diferente; custo inicial maior'], ['Corte francês (filed)', 'Resposta mais rápida, som mais claro', '—'], ['Corte americano (unfiled)', 'Som mais encorpado', 'Pode responder um pouco mais devagar']])}`,
      metal: `<p>O bocal tem quatro partes: <b>borda</b> (onde os lábios apoiam), <b>taça</b> (cup), <b>garganta</b> (o furo estreito) e <b>contrataça</b> (backbore). Borda larga = mais resistência e apoio, menos flexibilidade; taça funda = som escuro e graves fáceis; taça rasa = som brilhante e agudos mais fáceis (mas som mais fino).</p>
        <p><b>Numeração Bach</b> (a mais conhecida): o <b>número</b> indica o diâmetro (número menor = bocal maior) e a <b>letra</b> indica a profundidade da taça (A funda, C média, E rasa). ${I.sub === 'trompete' ? 'Exemplo: 7C (diâmetro médio-pequeno, taça média) e 3C (diâmetro maior, taça média).' : 'Exemplo: 12C (pequeno, iniciante) e 6½AL (grande, taça funda — muito comum).'}</p>
        ${I.sub === 'trombone' ? '<p class="aviso"><b>Atenção à perna:</b> trombones de furo pequeno usam bocal de <b>perna fina</b> (small shank); trombones de furo grande (geralmente com rotor) usam <b>perna grossa</b> (large shank). Bocal da perna errada não encaixa direito e prejudica a resposta.</p>' : ''}`,
    }),
    pra: (I, H) => por(I, {
      alto: H.tabela(['Objetivo', 'Boquilha (exemplos)', 'Palheta inicial'], [['Começo / estudo geral', 'Yamaha 4C, Selmer S80 C*, Vandoren AL3', 'cana 2 a 2½ (Vandoren, Rico, Juno) ou sintética macia'], ['Erudito', 'Selmer S80, Vandoren AL3/AL4', '3 a 3½ conforme a abertura'], ['Jazz / popular / igreja', 'Meyer 5M ou 6M e similares', '2½ a 3']]),
      tenor: H.tabela(['Objetivo', 'Boquilha (exemplos)', 'Palheta inicial'], [['Começo / estudo geral', 'Yamaha 4C (tenor), Selmer S80 C*, Vandoren TL3', 'cana 2 a 2½ (Vandoren, Rico, Juno) ou sintética macia'], ['Erudito', 'Selmer S80, Vandoren TL3/TL4', '3'], ['Jazz / soul / gospel', 'Otto Link Tone Edge 6 ou 7 e similares', '2½ a 3']]) + '<p class="peq">O tenor gasta mais ar que o alto: palheta um pouco mais macia no começo ajuda a construir o som sem cansar.</p>',
      soprano: H.tabela(['Objetivo', 'Boquilha (exemplos)', 'Palheta inicial'], [['Começo / estudo geral', 'Yamaha 4C, Selmer S80 C*', '2 a 2½'], ['Erudito', 'Selmer S80, Vandoren SL3/SL4', '3'], ['Popular / jazz / igreja', 'boquilhas de abertura média-grande', '2½']]),
      clarinete: H.tabela(['Objetivo', 'Boquilha (exemplos)', 'Palheta inicial'], [['Começo / estudo geral', 'Yamaha 4C, Vandoren B45', '2 a 2½ (Vandoren, Rico)'], ['Erudito avançado', 'Vandoren 5RV Lyre, M13, B45 e outras', '3 a 3½ (Vandoren V12, 56 Rue Lepic etc.)'], ['Choro / popular', 'abertura média', '2½ a 3']]),
      trompete: H.tabela(['Objetivo', 'Bocal (exemplos)'], [['Começo / estudo geral', 'Bach 7C, Yamaha 11B4'], ['Intermediário / orquestra', 'Bach 5C, 3C, 1½C'], ['Agudo / big band / popular', 'taça mais rasa — só depois de ter embocadura formada']]),
      trombone: H.tabela(['Objetivo', 'Bocal (exemplos)'], [['Começo, trombone de perna fina', 'Bach 12C'], ['Estudo geral, trombone de perna grossa', 'Bach 6½AL, 5G'], ['Jazz / agudo', 'taças menores — só com embocadura formada']]),
    }) + `<p class="aviso">Regra de ouro: <b>equipamento não substitui técnica</b>. Fique pelo menos 6 meses com um ${I.familia === 'metal' ? 'bocal' : 'conjunto boquilha + palheta'} padrão. Troque apenas quando um professor ou você (com gravações) identificar uma limitação concreta.</p>`,
    exs: (I) => I.familia === 'metal' ? [
      { nome: 'Conheça seu bocal', dur: '10 min', obj: 'Saber exatamente o que você usa.', passos: ['Leia o número gravado no bocal.', 'Pesquise o diâmetro e a profundidade da taça.', 'Anote no caderno.'], crit: 'Sabe o modelo e as características do seu bocal.' },
      { nome: 'Teste de conforto', dur: '10 min', obj: 'Verificar se o bocal combina com você.', passos: ['Faça buzz no bocal em notas médias por 2 minutos.', 'Observe se a borda incomoda ou machuca.', 'Se possível, compare com outro bocal padrão.'], crit: 'Buzz confortável por 2 minutos.' },
    ] : [
      { nome: 'Rodízio de palhetas', dur: '15 min', obj: 'Ter sempre 3–4 palhetas boas em uso.', passos: ['Numere 4 palhetas novas a lápis (1 a 4) na parte de baixo.', 'Nos primeiros 3 dias, toque cada uma só 5 minutos por dia (amaciamento).', 'Anote para cada uma: resposta nos graves, nos agudos, timbre.', 'Use em rodízio; descarte as que rachar, lascar ou perder o brilho.'], crit: 'Tem 3 palhetas boas identificadas e em rodízio.' },
      { nome: 'Teste de dureza', dur: '10 min', obj: 'Descobrir se a dureza está correta.', passos: ['Toque a nota mais grave do instrumento em piano (suave).', 'Depois uma nota aguda confortável em forte.', 'Se o grave não sai suave: palheta dura demais ou embocadura apertada. Se o agudo fica baixo e fino: palheta macia demais.'], crit: 'Grave sai em piano e agudo fica afinado em forte.' },
    ],
    err: (I) => I.familia === 'metal'
      ? [['Trocar de bocal a cada semana procurando “facilidade”.', 'Cada troca reinicia a adaptação da embocadura. Fique com um bocal padrão e estude.'], ['Usar bocal raso cedo para “alcançar agudos”.', 'Agudo vem de ar e embocadura. Bocal raso cedo deixa o som fino e cria vícios.']]
      : [['Usar palheta dura demais para “parecer profissional”.', 'Palheta dura demais causa som soprado, cansaço e tensão. A dureza certa é a que permite tocar do grave ao agudo com som cheio.'], ['Tocar com palheta lascada ou empenada.', 'Lasca na ponta = guinchos. Tenha sempre palhetas reservas.'], ['Guardar a palheta presa na boquilha.', 'Ela empena. Guarde num porta-palhetas.']],
    tempo: '30 minutos de leitura e testes.',
    crit: (I) => I.familia === 'metal' ? ['Sei o modelo do meu bocal e o que ele significa.', 'Faço buzz no bocal por 2 minutos sem desconforto.'] : ['Sei a numeração e a marca das minhas palhetas.', 'Tenho pelo menos 3 palhetas em rodízio.', 'Meu grave sai em piano e o agudo fica afinado em forte.'],
    quiz: (I) => I.familia === 'metal' ? [
      { p: 'Na numeração Bach, o que indica a letra?', o: ['O diâmetro', 'A profundidade da taça', 'O material', 'O ano'], c: 1 },
      { p: 'Um bocal de taça mais rasa tende a…', o: ['facilitar os graves e escurecer o som', 'facilitar agudos e clarear o som', 'não mudar nada', 'abaixar a afinação'], c: 1 },
      { p: 'Qual a atitude correta com o equipamento?', o: ['Trocar sempre que algo for difícil', 'Ficar com um padrão e trocar só por limitação concreta', 'Usar o maior bocal possível', 'Usar o menor bocal possível'], c: 1 },
    ] : [
      { p: 'Uma palheta número 3 é…', o: ['mais macia que uma 2', 'mais dura que uma 2 da mesma marca', 'igual em todas as marcas', 'sintética'], c: 1 },
      { p: 'Palheta macia demais costuma causar…', o: ['graves impossíveis', 'agudos baixos e som fino', 'som escuro e cheio', 'nada'], c: 1 },
      { p: 'Abertura maior da boquilha geralmente pede…', o: ['palheta mais dura', 'palheta mais macia', 'nenhuma palheta', 'abraçadeira mais apertada'], c: 1 },
    ],
    tarefa: (I) => I.familia === 'metal' ? 'Anote o modelo do seu bocal e faça 2 minutos de buzz por dia. Na próxima aula: a transposição — por que você lê uma nota e soa outra.' : 'Comece o rodízio de palhetas. Na próxima aula: a transposição — por que você lê uma nota e soa outra.',
  });

  C.aula({
    id: '1-5', titulo: 'Afinação do instrumento e transposição', tempo: '40 min',
    obj: (I) => I.transp.s ? `Entender por que o ${I.nomeMin} é transpositor em ${I.tom}, diferenciar nota escrita e nota de concerto e afinar o instrumento.` : 'Entender a relação entre o trombone e os instrumentos transpositores, ler em sons reais e afinar o instrumento.',
    apr: ['Nota escrita × nota de concerto (som real)', 'Tonalidade escrita × tonalidade real', 'Como converter uma partitura em Dó', 'Como afinar no início de cada estudo'],
    teo: (I, H) => {
      const M = window.Musica;
      if (!I.transp.s) return `<p>O trombone na clave de Fá é um instrumento <b>em Dó</b>: a nota escrita é a nota que soa. Mesmo assim, você precisa entender transposição, porque vai tocar com saxofones, clarinetes e trompetes, que leem notas diferentes para soar igual a você.</p>
        <p>Exemplo: para tocar junto com você um Si♭ (concerto), o trompete lê <b>Dó</b>, o sax alto lê <b>Sol</b> e o sax tenor lê <b>Dó</b> (uma oitava acima). Na banda, o maestro fala em “Si♭ de concerto” para não haver confusão.</p>
        <p><b>Trombone em Si♭ na clave de Sol:</b> algumas bandas e igrejas escrevem o trombone como se fosse um sax tenor ou trompete em Si♭ — clave de Sol, uma 9ª maior acima do som real. Nesse caso, o dedilhado (posição) segue a nota <b>real</b>: lendo Dó na clave de Sol, toque Si♭ (1ª posição). Use o Transpositor para conferir.</p>`;
      const c = (s) => M.nomeBR(M.escritaParaConcerto(M.parse(s), I));
      return `<p>Um instrumento é <b>transpositor</b> quando a nota que você lê (nota <b>escrita</b>) é diferente da nota que soa (nota <b>de concerto</b>, ou som real). O ${I.nomeMin} está em <b>${I.tom}</b>: quando você toca o Dó escrito, sai o ${c('C4')} de concerto. Ele ${I.transpTexto}.</p>
        <p><b>Por que existe isso?</b> Para que toda a família use o mesmo dedilhado. ${I.sub === 'sax' ? 'O saxofonista troca de soprano para alto ou tenor sem reaprender as posições: muda apenas a partitura.' : I.sub === 'clarinete' ? 'O clarinetista troca do clarinete em Si♭ para o em Lá ou para o clarone sem reaprender as posições.' : 'O trompetista troca entre trompete em Si♭, cornet e flugelhorn com os mesmos pistos.'}</p>
        ${H.tabela(['Você lê (escrito)', 'Soa (concerto)'], ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].map((s) => [M.nomeBR(M.parse(s)), c(s)]))}
        <p><b>Regra prática para converter uma parte em Dó (piano, voz, flauta, violino) para o seu instrumento:</b> ${I.id === 'alto' ? '<b>suba uma 6ª maior</b> (ou desça uma 3ª menor e acerte a oitava). Na armadura: <b>acrescente 3 sustenidos</b> ou retire 3 bemóis. Ex.: Mi♭ maior (3♭) vira Dó maior; Fá maior (1♭) vira Ré maior (2♯).' : I.id === 'tenor' ? '<b>suba uma 9ª maior</b> (um tom e uma oitava). Na armadura: <b>acrescente 2 sustenidos</b> ou retire 2 bemóis. Ex.: Si♭ maior (2♭) vira Dó maior; Mi♭ maior (3♭) vira Fá maior (1♭). Na prática: leia um tom acima e uma oitava acima — a parte do tenor fica numa região confortável da pauta.' : '<b>suba uma 2ª maior</b> (um tom). Na armadura: <b>acrescente 2 sustenidos</b> ou retire 2 bemóis. Ex.: Si♭ maior (2♭) vira Dó maior; Mi♭ maior (3♭) vira Fá maior (1♭).'}</p>
        <p><b>Converter de outros transpositores:</b> ${I.id === 'tenor' ? 'do sax alto (Mi♭) para o tenor: suba uma 4ª justa (ou desça uma 5ª); armadura −1 sustenido (ou +1 bemol). De trompete, clarinete ou sax soprano (Si♭) para o tenor: a escrita é a mesma — o tenor só soa uma oitava abaixo deles' : 'do sax tenor (Si♭) para ' + (I.id === 'alto' ? 'o alto: suba uma 5ª justa (ou desça uma 4ª), pois os dois estão uma 5ª de distância' : 'você: é a mesma escrita, só uma oitava de diferença')}. Use a aba <a href="#transpositor">Transpositor</a> para conferir sempre.</p>`;
    },
    pra: (I) => `<h4>Afinação diária</h4><ol><li>Toque 2–3 minutos para aquecer (o instrumento frio soa mais baixo).</li><li>Ligue o <a href="#afinador">afinador</a> e toque a nota de afinação: <b>${window.H.nota(I, I.afinar.escrita)}</b>. ${I.afinar.obs}</li>
      <li>Ponteiro à esquerda (bemol, baixo): ${I.sub === 'sax' ? 'empurre a boquilha mais para dentro do tudel' : I.sub === 'clarinete' ? 'empurre o barrilete (feche a folga)' : 'empurre a bomba geral'}. Ponteiro à direita (sustenido, alto): ${I.sub === 'sax' ? 'puxe a boquilha um pouco para fora' : I.sub === 'clarinete' ? 'puxe o barrilete um pouco' : 'puxe a bomba'}.</li>
      <li>Toque a nota de novo <b>sem olhar o afinador</b>, depois confira. O objetivo é afinar o instrumento, não a embocadura: não “corrija” com o lábio nessa hora.</li></ol>
      <p>${I.transp.s ? `Repare: o afinador cromático mostra a nota <b>de concerto</b>. Ao tocar ${window.Musica.nomeBR(window.Musica.parse(I.afinar.escrita))} escrito, ele mostra ${window.Musica.nomeBR(window.Musica.escritaParaConcerto(window.Musica.parse(I.afinar.escrita), I))}. O afinador deste app já mostra as duas.` : 'O afinador mostra o som real, que no trombone é igual ao escrito.'}</p>`,
    ex: (I, H) => H.pauta({ tipo: 'mel', id: 'brilha' }) + `<p class="peq sutil">A partitura acima já está escrita para o seu instrumento. Toque “Ouvir” para escutar o som real (de concerto).</p>`,
    exs: (I) => [
      { nome: 'Tabela de conversão', dur: '15 min', obj: 'Converter notas sem consultar.', passos: I.transp.s ? ['Escreva as 12 notas de concerto (Dó, Dó♯, Ré…).', `Ao lado, escreva a nota escrita para ${I.curto.toLowerCase()} (${I.id === 'alto' ? 'suba uma 6ª maior' : 'suba um tom'}).`, 'Confira na aba Transpositor.'] : ['Escreva as notas Si♭, Fá, Mi♭, Dó de concerto.', 'Ao lado, escreva o que o trompete (Si♭) e o sax alto (Mi♭) leem para essas notas.', 'Confira na aba Transpositor.'], crit: 'Acerta 12 de 12.' },
      { nome: 'Afinação em três dias', dur: '5 min/dia', obj: 'Criar o hábito de afinar.', passos: ['Afine conforme o passo a passo.', `Anote a posição ${I.sub === 'sax' ? 'da boquilha no tudel' : I.sub === 'clarinete' ? 'do barrilete' : 'da bomba de afinação'} (faça uma pequena marca a lápis).`, 'Compare: ela muda conforme o clima?'], crit: 'Afina em menos de 1 minuto.' },
    ],
    err: (I) => [
      ['Achar que o afinador “está errado” porque mostra outra nota.', I.transp.s ? `O afinador mostra o som real. No ${I.curto.toLowerCase()}, Dó escrito aparece como ${window.Musica.nomeBR(window.Musica.escritaParaConcerto(window.Musica.parse('C4'), I))}.` : 'No trombone o afinador mostra a mesma nota escrita; se a nota for outra, confira a posição.'],
      ['Tocar a partitura do piano ou da voz sem transpor.', 'Sempre confirme para qual instrumento a parte foi escrita. Parte em Dó precisa ser transposta (exceto para o trombone).'],
      ['Afinar com o instrumento frio.', 'Aqueça 2–3 minutos antes. O ar quente sobe a afinação.'],
    ],
    tempo: '40 minutos de estudo; depois, 1 minuto de afinação em todo estudo.',
    crit: ['Explico a diferença entre nota escrita e nota de concerto.', 'Converto qualquer nota de Dó para o meu instrumento (e vice-versa).', 'Afino o instrumento sozinho em menos de 1 minuto.'],
    quiz: (I) => {
      const M = window.Musica;
      if (!I.transp.s) return [
        { p: 'Na clave de Fá, o trombone lê…', o: ['transposto', 'em sons reais', 'uma oitava acima', 'em Mi♭'], c: 1 },
        { p: 'Para soar o mesmo Si♭ que você, o trompete em Si♭ lê…', o: ['Si♭', 'Dó', 'Sol', 'Fá'], c: 1 },
        { p: 'Numa parte de trombone em Si♭ na clave de Sol, o Dó escrito soa…', o: ['Dó', 'Si♭ uma 9ª abaixo', 'Mi♭', 'Ré'], c: 1 },
      ];
      return [
        { p: `No ${I.curto.toLowerCase()}, o Dó escrito soa…`, o: ['Dó', M.nomeBR(M.escritaParaConcerto(M.parse('C4'), I)), 'Fá', 'Ré'].filter((x, i, a) => a.indexOf(x) === i).concat(['Lá']).slice(0, 4), c: 1 },
        { p: 'Uma música em Fá maior de concerto será escrita para você em…', o: I.id === 'alto' ? ['Fá maior', 'Ré maior', 'Si♭ maior', 'Sol maior'] : ['Fá maior', 'Sol maior', 'Mi♭ maior', 'Ré maior'], c: 1, e: I.id === 'alto' ? 'Fá + 6ª maior = Ré.' : I.id === 'tenor' ? 'Fá + 9ª maior = Sol (uma oitava acima).' : 'Fá + 2ª maior = Sol.' },
        { p: 'O ponteiro do afinador está à direita (alto). Você deve…', o: I.sub === 'sax' ? ['empurrar a boquilha para dentro', 'puxar a boquilha para fora', 'morder mais', 'soprar mais forte'] : I.sub === 'clarinete' ? ['empurrar o barrilete', 'puxar o barrilete', 'morder mais', 'soprar mais forte'] : ['empurrar a bomba geral', 'puxar a bomba geral', 'apertar o bocal', 'soprar mais forte'], c: 1 },
        { p: 'Para converter uma armadura de Dó para o seu instrumento…', o: I.id === 'alto' ? ['acrescente 2 sustenidos', 'acrescente 3 sustenidos (ou retire 3 bemóis)', 'retire 2 sustenidos', 'não muda'] : ['acrescente 2 sustenidos (ou retire 2 bemóis)', 'acrescente 3 sustenidos', 'retire 1 bemol', 'não muda'], c: I.id === 'alto' ? 1 : 0 },
      ];
    },
    tarefa: (I) => `Transponha para ${I.curto.toLowerCase()} os primeiros 8 compassos de um hino ou canção que você tenha em Dó (ou em cifra). Confira no Transpositor. Na próxima aula: o primeiro som.`,
  });

  C.aula({
    id: '1-6', titulo: 'O primeiro som', tempo: '20 min por dia, durante uma semana',
    obj: (I) => I.familia === 'metal' ? 'Produzir uma vibração labial (buzz) estável e as primeiras notas com som limpo.' : 'Produzir um som estável primeiro na boquilha e depois no instrumento, sem guinchos.',
    apr: (I) => I.familia === 'metal' ? ['Buzz sem bocal e com bocal', 'Sirenes e notas sustentadas no bocal', 'Primeiras notas no instrumento', 'Como saber se a vibração está certa'] : [(I.sub === 'clarinete' ? 'Som na boquilha com o barrilete' : 'Som na boquilha sozinha'), 'Altura de referência da boquilha', 'Primeiras notas no instrumento', 'Como evitar guinchos'],
    teo: (I) => por(I, {
      palheta: `<p>O som nasce quando o ar faz a palheta vibrar contra a boquilha, abrindo e fechando centenas de vezes por segundo. Para isso, a palheta precisa estar <b>livre para vibrar</b>: o lábio inferior a apoia sem esmagar, e o ar precisa ter <b>velocidade</b> constante. A embocadura completa é o tema da aula 2.2; aqui você vai apenas conseguir um som estável.</p>
        <p>${I.sub === 'clarinete' ? 'A boquilha com o barrilete' : 'A boquilha sozinha'} dá uma <b>nota de referência</b> que revela se a embocadura está apertada ou frouxa: ${I.sub === 'sax' ? (I.id === 'alto' ? 'no sax alto, a boquilha sozinha deve soar perto do <b>Lá de concerto (Lá5, 880 Hz)</b>' : I.id === 'tenor' ? 'no sax tenor, a boquilha sozinha deve soar perto do <b>Sol de concerto (Sol5)</b>' : 'no soprano, a boquilha sozinha deve soar perto do <b>Dó de concerto (Dó6)</b>') : 'no clarinete, <b>boquilha + barrilete</b> devem soar perto do <b>Fá♯ de concerto (Fá♯5)</b>'}. Mais alto = embocadura apertada; mais baixo = frouxa.</p>`,
      metal: `<p>O som dos metais nasce da <b>vibração dos lábios</b>. O ar passa entre os lábios levemente fechados e eles vibram como uma porta batendo muito rápido. O instrumento amplifica e “escolhe” a nota da série harmônica mais próxima da vibração.</p>
        <p>Nota alta = lábios vibrando mais rápido (ar mais rápido, abertura menor). Nota baixa = vibração mais lenta. Você não “força” a nota com pressão do bocal: muda a <b>velocidade do ar</b> e a forma da abertura dos lábios.</p>`,
    }),
    pra: (I, H) => por(I, {
      sax: `<ol><li>Só a boquilha com palheta (sem o tudel). Lábio inferior levemente sobre os dentes de baixo, dentes de cima apoiados em cima da boquilha (a 1–1,5 cm da ponta), cantos da boca firmes “como num cordão”.</li><li>Inspire pela boca e sopre como se dissesse “uuuu”, firme e constante. Mantenha 4 segundos.</li><li>Confira no afinador: ${I.id === 'alto' ? 'Lá de concerto (Lá5)' : I.id === 'tenor' ? 'Sol de concerto (Sol5)' : 'Dó de concerto (Dó6)'}. Muito acima? Afrouxe a mordida. Muito abaixo ou sem som? Firme os cantos e acelere o ar.</li><li>Monte o sax. Primeira nota: <b>Si</b> escrito (só dedo 1). Depois <b>Lá</b> (1-2) e <b>Sol</b> (1-2-3).</li></ol>${H.dedos(I, ['B4', 'A4', 'G4'])}`,
      clarinete: `<ol><li>Boquilha + barrilete. Lábio inferior sobre os dentes de baixo, dentes de cima <b>sobre</b> a boquilha (a 1–1,5 cm da ponta), queixo “reto e para baixo”, cantos firmes.</li><li>Sopre firme e constante por 4 segundos.</li><li>Confira: Fá♯ de concerto (Fá♯5). Agudo demais = mordendo; grave ou sem som = frouxo.</li><li>Monte o clarinete. Primeiras notas: <b>Sol solto</b> (nenhum dedo), <b>Fá</b> (polegar) e <b>Mi</b> (polegar + 1).</li></ol>${H.dedos(I, ['G4', 'F4', 'E4'])}`,
      trompete: `<ol><li><b>Buzz sem bocal:</b> lábios juntos como para dizer “M”, sopre e faça vibrar (como imitar um motorzinho). Sustente 3 segundos.</li><li><b>Buzz no bocal:</b> segure o bocal pela haste com dois dedos (sem pressão). Faça uma nota média e sustente 4 segundos. Depois faça “sirenes” (escorregue do grave ao agudo e volte).</li><li>Coloque o bocal no trompete. Primeira nota: <b>Dó</b> escrito (sem pistos), depois <b>Sol</b> (sem pistos, mais ar e mais velocidade).</li></ol>${H.dedos(I, ['C4', 'G4'])}`,
      trombone: `<ol><li><b>Buzz sem bocal:</b> lábios juntos como para dizer “M”, sopre e faça vibrar. Sustente 3 segundos.</li><li><b>Buzz no bocal:</b> segure pela haste, sem pressão. Nota média, depois sirenes.</li><li>Coloque o bocal no trombone. Primeira nota: <b>Fá</b> (Fá3) na 1ª posição; depois <b>Si♭</b> grave (Si♭2), também na 1ª — menos velocidade de ar, mais relaxado.</li></ol>${H.dedos(I, ['F3', 'Bb2'])}`,
    }),
    exs: (I) => I.familia === 'metal' ? [
      { nome: 'Buzz sustentado', dur: '5 min', obj: 'Vibração estável.', passos: ['Buzz no bocal, nota média, 4 tempos a ♩ = 60.', 'Descanse 4 tempos.', 'Repita 8 vezes.'], crit: 'Som contínuo, sem falhas, em 6 de 8 tentativas.', bpm: 60 },
      { nome: 'Sirenes', dur: '3 min', obj: 'Flexibilidade e controle do ar.', passos: ['Escorregue do grave ao agudo e volte, sem interromper o som.', 'Faça 5 sirenes lentas.'], crit: 'Sirene contínua, sem quebras.' },
      { nome: 'Primeiras notas', dur: '7 min', obj: 'Primeiros sons no instrumento.', passos: [`Toque ${I.sub === 'trompete' ? 'Dó' : 'Fá (1ª posição)'} por 4 tempos, descanse 4.`, `Depois ${I.sub === 'trompete' ? 'Sol' : 'Si♭ grave'}.`, 'Alterne as duas, 6 vezes.'], crit: 'Som limpo, sem “rachar” o início, em 4 de 6 tentativas.', bpm: 60 },
    ] : [
      { nome: 'Boquilha no afinador', dur: '5 min', obj: 'Encontrar a pressão certa.', passos: ['Sopre na boquilha 4 tempos a ♩ = 60, descanse 4.', 'Observe a nota no afinador.', 'Repita 8 vezes, buscando a nota de referência.'], crit: 'Nota de referência (±20 cents) em 6 de 8 tentativas.', bpm: 60 },
      { nome: 'Primeiras três notas', dur: '10 min', obj: 'Primeiros sons no instrumento.', passos: ['Toque cada nota por 4 tempos e descanse 4.', 'Desça uma nota por vez.', 'Repita a sequência 5 vezes.'], crit: 'Três notas sem guinchos em 4 de 5 sequências.', bpm: 60 },
    ],
    met: [['Nota longa de 4 tempos + 4 de pausa', 60, 60, 'Mantenha 60 nesta fase']],
    err: (I) => I.familia === 'metal'
      ? [['Apertar o bocal contra os lábios.', 'Os lábios precisam vibrar. Use só o contato necessário para vedar.'], ['Encher as bochechas de ar.', 'Bochechas firmes, encostadas nos dentes. Treine em frente ao espelho.'], ['Ar fraco: o som “morre”.', 'Sopre como se fosse apagar uma vela a 1 metro, de forma contínua.']]
      : [['Guinchos (som agudo descontrolado).', 'Geralmente: muita boquilha na boca, mordida forte ou palheta torta. Recue um pouco a boquilha e afrouxe a mandíbula.'], ['Bochechas infladas.', 'Cantos da boca firmes e bochechas encostadas nos dentes.'], ['Som soprado, com muito ar.', 'Lábios não estão vedando: feche os cantos ao redor da boquilha como um elástico.']],
    tempo: '20 minutos por dia durante uma semana. Pare se os lábios doerem: embocadura se constrói aos poucos.',
    crit: (I) => I.familia === 'metal' ? ['Faço buzz no bocal por 4 tempos sem falhar.', 'Toco as duas primeiras notas com início limpo.', 'Toco sem inflar as bochechas.'] : ['A boquilha soa perto da nota de referência.', 'Toco as três primeiras notas sem guinchos.', 'Toco sem inflar as bochechas.'],
    quiz: (I) => I.familia === 'metal' ? [
      { p: 'O que determina principalmente a altura da nota nos metais?', o: ['A pressão do bocal', 'A velocidade do ar e a vibração dos lábios', 'O tamanho da campana', 'A força dos dedos'], c: 1 },
      { p: 'As bochechas devem…', o: ['inflar para guardar ar', 'ficar firmes, sem inflar', 'ficar moles', 'tanto faz'], c: 1 },
      { p: 'Para que serve a sirene no bocal?', o: ['Para aquecer o bocal', 'Para desenvolver flexibilidade e controle do ar', 'Para limpar o bocal', 'Não serve'], c: 1 },
    ] : [
      { p: 'Se a boquilha soa muito mais aguda que a referência, a embocadura está…', o: ['frouxa', 'apertada (mordendo)', 'correta', 'molhada'], c: 1 },
      { p: 'Os dentes de cima ficam…', o: ['no lábio de cima, que cobre a boquilha', 'apoiados em cima da boquilha', 'longe da boquilha', 'na palheta'], c: 1, e: 'Na embocadura padrão (simples), os dentes superiores apoiam diretamente na boquilha. Existe a embocadura dupla, com o lábio superior também dobrado, usada por alguns clarinetistas.' },
      { p: 'Guinchos frequentes costumam vir de…', o: ['pouca boquilha na boca', 'muita boquilha na boca, mordida forte ou palheta torta', 'ar lento', 'instrumento novo'], c: 1 },
    ],
    tarefa: 'Toque as primeiras notas todos os dias, gravando 30 segundos no celular. Na próxima aula (módulo 2) você vai construir a respiração correta.',
  });

  // =====================================================================
  C.mod({ n: 2, nivel: 'iniciante', titulo: 'Embocadura, respiração e emissão sonora', desc: 'O motor (ar), o gerador (embocadura) e o controle do som: notas longas e ataque com a língua.' });

  C.aula({
    id: '2-1', titulo: 'Respiração: o motor do som', tempo: '15 min por dia',
    obj: 'Desenvolver uma respiração profunda, rápida e controlada, com apoio constante — a base de todo som bonito.',
    apr: ['Como funciona a respiração (diafragma e expansão)', 'Inspiração rápida pela boca', 'Expiração controlada e apoio', 'Exercícios de capacidade e controle'],
    teo: `<p>O <b>diafragma</b> é um músculo em forma de cúpula abaixo dos pulmões. Na inspiração ele desce, os pulmões se enchem e o abdômen, as costelas e as costas se expandem. É por isso que se diz “respiração diafragmática” ou “respiração baixa”: o ar vai para a parte de baixo dos pulmões, não para os ombros.</p>
      <p>Na expiração, o diafragma volta a subir. O <b>apoio</b> (ou suporte) é o uso dos músculos do abdômen e das costas para controlar a saída do ar, mantendo a <b>pressão e a velocidade</b> constantes. Não é “endurecer a barriga”: é um esforço firme e flexível, como segurar um peso leve com o braço estendido.</p>
      <p><b>Coluna de ar</b> é a imagem de um fluxo contínuo e firme, que sai do apoio e chega ao instrumento sem ser travado pela garganta. A garganta fica aberta como num bocejo, a língua baixa (vogal “ô” ou “u”).</p>
      <p class="aviso">Ombros que sobem na inspiração indicam respiração alta (curta e tensa). Observe no espelho.</p>`,
    pra: (I) => `<p>No instrumento, a respiração determina: a <b>estabilidade</b> da nota (altura parada), o <b>tamanho</b> do som, a <b>afinação</b> (ar fraco = ${I.familia === 'metal' ? 'notas que caem e quebram' : 'nota baixa e som fino'}) e o tamanho das frases. Toda vez que algo der errado no som, o primeiro suspeito é o ar.</p>
      <p>Inspire pela boca, pelos cantos, ${I.familia === 'metal' ? 'sem tirar o bocal dos lábios por completo' : 'sem tirar a boquilha da boca (abra só os cantos)'}, rápido e silencioso. Imagine a vogal “ô” para a garganta abrir.</p>`,
    exs: [
      { nome: 'Respiração 4-4-8', dur: '3 min', bpm: 60, obj: 'Expansão baixa e controle da saída.', passos: ['Em pé, mãos na cintura (polegares nas costas).', 'Inspire em 4 tempos sentindo a cintura expandir para os lados e para trás.', 'Segure 4 tempos sem fechar a garganta.', 'Solte em 8 tempos com um “sss” constante.', 'Faça 5 ciclos. Depois: 4-4-12 e 4-4-16.'], crit: 'Solta 16 tempos (♩ = 60) com “sss” constante, sem os ombros subirem.' },
      { nome: 'Inspiração rápida', dur: '2 min', bpm: 60, obj: 'Encher os pulmões em 1 tempo.', passos: ['Inspire em 1 tempo, solte em 7 com “sss”.', 'Repita 6 vezes.'], crit: 'Enche em 1 tempo sem ruído na garganta.' },
      { nome: 'Folha na parede', dur: '3 min', obj: 'Ar contínuo e direcionado.', passos: ['Segure uma folha de papel contra a parede só com o sopro (a 15–20 cm).', 'Mantenha o máximo de tempo.', 'Anote o tempo e tente bater o recorde a cada dia.'], crit: '15 segundos ou mais.' },
      { nome: 'Respiração no instrumento', dur: '5 min', bpm: 60, obj: 'Levar o apoio para o som.', passos: ['Toque uma nota confortável por 8 tempos.', 'Inspire em 1 tempo, toque de novo.', 'Repita 6 vezes e depois aumente para 12 e 16 tempos.'], crit: '16 tempos (♩ = 60) com altura estável.' },
    ],
    met: [['Expiração com “sss”', 60, 60, 'aumente os tempos: 8 → 12 → 16 → 20'], ['Nota longa no instrumento', 60, 60, 'aumente os tempos, não o andamento']],
    err: [['Levantar os ombros ao inspirar.', 'Mãos na cintura, ombros relaxados: a expansão é na cintura, costelas e costas.'], ['Fechar a garganta ao segurar o ar.', 'Segure com os músculos da respiração, não com a garganta. Treine segurar com a boca aberta.'], ['Soltar todo o ar no início da nota.', 'Distribua: imagine o ar como um fio de água constante da torneira.'], ['Ficar tonto.', 'É hiperventilação. Pare, respire normalmente e faça menos repetições, com pausas.']],
    tempo: '10–15 minutos por dia, no início do estudo. Os exercícios sem instrumento podem ser feitos em qualquer lugar.',
    crit: ['Inspiro sem levantar os ombros.', 'Faço “sss” constante por 16 tempos a ♩ = 60.', 'Sustento uma nota estável por 16 tempos a ♩ = 60.'],
    quiz: [
      { p: 'Ao inspirar corretamente, o que se expande?', o: ['Os ombros', 'Cintura, costelas e costas', 'Só o peito', 'O pescoço'], c: 1 },
      { p: 'O que é o apoio?', o: ['Endurecer a barriga ao máximo', 'Controle firme e flexível da saída de ar pelos músculos do abdômen e costas', 'Apoiar o instrumento no joelho', 'Prender o ar na garganta'], c: 1 },
      { p: 'Qual vogal ajuda a manter a garganta aberta?', o: ['“i”', '“ô” ou “u”', '“é”', 'nenhuma'], c: 1 },
      { p: 'Ar fraco costuma provocar…', o: ['som cheio', 'notas instáveis, baixas ou que quebram', 'notas mais altas', 'nada'], c: 1 },
    ],
    tarefa: 'Faça os exercícios de respiração todos os dias e anote seus recordes (tempos de “sss” e da folha na parede).',
  });

  C.aula({
    id: '2-2', titulo: 'Embocadura', tempo: '20 min por dia',
    obj: (I) => `Formar uma embocadura ${I.familia === 'metal' ? 'centralizada e flexível' : 'firme e sem morder'}, sem tensão, com resistência para estudar 30 minutos ou mais.`,
    apr: ['Posição dos lábios e dos dentes', 'Controle da mandíbula e dos cantos da boca', 'Pressão adequada', 'Erros comuns e como desenvolver resistência'],
    teo: (I, H) => por(I, {
      sax: `<p>A embocadura do sax é como um <b>elástico ao redor da boquilha</b>: pressão igual de todos os lados, vinda dos cantos da boca, não da mandíbula.</p>
        <ul><li><b>Lábio inferior:</b> levemente dobrado sobre os dentes de baixo (só a parte vermelha, sem enrolar demais). Ele <b>apoia</b> a palheta.</li><li><b>Dentes de cima:</b> apoiados no topo da boquilha, a cerca de 1–1,5 cm da ponta (onde a palheta começa a se separar da mesa). Um protetor de boquilha (borrachinha) ajuda.</li><li><b>Cantos da boca:</b> firmes, puxados levemente para o centro (como dizer “u”). Eles vedam o ar.</li><li><b>Queixo:</b> reto, apontando para baixo, sem “bolinha” de músculo enrugado.</li><li><b>Mandíbula:</b> parada, sem morder. A pressão na palheta é a mínima para controlar.</li></ul>
        <p>O <b>soprano</b> pede mais firmeza e precisão (boquilha menor, afinação mais sensível). O <b>alto</b> pede um pouco mais de boquilha na boca e uma embocadura mais “redonda”.</p>`,
      clarinete: `<p>A embocadura do clarinete é mais <b>firme e “pontuda”</b> que a do sax, com o queixo bem reto.</p>
        <ul><li><b>Lábio inferior:</b> sobre os dentes de baixo, cobrindo cerca de metade da parte vermelha.</li><li><b>Dentes de cima:</b> apoiados sobre a boquilha, a 1–1,5 cm da ponta (embocadura simples, a mais comum).</li><li><b>Cantos:</b> firmes e puxados para dentro, como dizer “u” e sorrir ao mesmo tempo (“sorriso apertado”).</li><li><b>Queixo:</b> plano e apontado para baixo, como se esticasse a pele do queixo.</li><li><b>Ângulo:</b> o clarinete fica a cerca de 30–40° do corpo. Muito perto do corpo = mais boquilha e som abafado; muito longe = som estridente.</li></ul>`,
      trompete: `<p>Nos metais a embocadura é o conjunto de músculos ao redor dos lábios que forma a <b>abertura</b> (o pequeno espaço onde o ar passa e os lábios vibram).</p>
        <ul><li><b>Posição do bocal:</b> centralizado horizontalmente; verticalmente, a maioria usa algo entre metade/metade e um pouco mais de lábio de baixo. Respeite sua anatomia (dentes, lábios).</li><li><b>Cantos da boca:</b> firmes, “para baixo e para dentro” (não sorria: sorriso afina os lábios e estraga o som).</li><li><b>Pressão:</b> a mínima para vedar. Pressão excessiva corta a vibração e machuca.</li><li><b>Queixo:</b> plano e firme. Os lábios <b>não</b> enrolam para dentro nem para fora.</li><li><b>Dentes:</b> levemente separados, para o ar passar.</li></ul>`,
      trombone: `<p>Nos metais a embocadura é o conjunto de músculos ao redor dos lábios que forma a <b>abertura</b> por onde o ar passa e os lábios vibram. No trombone o bocal é maior, então a vibração é mais lenta e com mais lábio dentro do bocal.</p>
        <ul><li><b>Posição do bocal:</b> centralizado horizontalmente; verticalmente, muitos trombonistas colocam mais lábio de cima no bocal (cerca de 2/3 em cima). Respeite sua anatomia.</li><li><b>Cantos:</b> firmes, para baixo e para dentro, sem sorrir.</li><li><b>Pressão:</b> a mínima para vedar.</li><li><b>Mandíbula:</b> solta e um pouco aberta; no grave ela desce, no agudo fecha um pouco.</li></ul>`,
    }),
    pra: (I, H) => `<p>Use um espelho. Monte a embocadura, toque uma nota média por 8 tempos e observe se algo se mexe (queixo, bochechas, cantos). Uma embocadura correta parece “calma” por fora.</p>` + por(I, {
      palheta: `<p><b>Teste da pressão:</b> toque a nota mais grave confortável em <i>piano</i>. Se não sair, você está mordendo. Depois toque uma nota aguda confortável: se ela ficar baixa e fina, falta firmeza nos cantos — e não na mandíbula.</p>`,
      metal: `<p><b>Teste da pressão:</b> toque uma nota média e vá aliviando a pressão do bocal até o som quase parar. Esse é o mínimo necessário; toque com só um pouco mais que isso.</p>`,
    }) + H.pauta({ tipo: 'notas', notas: !I.grave ? (I.sub === 'clarinete' ? 'G4:16 F4:16 E4:16 D4:16 C4:16' : I.sub === 'trompete' ? 'C4:16 D4:16 E4:16 D4:16 C4:16' : 'B4:16 A4:16 G4:16 A4:16 B4:16') : 'F3:16 Eb3:16 D3:16 Eb3:16 F3:16', tom: !I.grave ? 'C' : 'Bb', titulo: 'Notas longas para observar a embocadura no espelho', bpm: 60 }),
    exs: (I) => I.familia === 'metal' ? [
      { nome: 'Buzz no espelho', dur: '5 min', obj: 'Embocadura estável.', passos: ['Buzz no bocal em frente ao espelho, 4 tempos.', 'Observe: cantos firmes? bochechas paradas?', '8 repetições.'], crit: 'Nada se mexe além dos lábios vibrando.' },
      { nome: 'Pressão mínima', dur: '5 min', obj: 'Aprender a tocar sem pressão excessiva.', passos: ['Nota média, alivie a pressão até quase parar.', 'Volte só um pouco.', 'Repita em 3 notas.'], crit: 'Consegue sustentar 8 tempos com pressão leve.' },
      { nome: 'Resistência', dur: '10 min', obj: 'Fortalecer sem cansar.', passos: ['Regra “toca um, descansa um”: 1 minuto tocando notas longas, 1 minuto de descanso.', 'Faça 5 ciclos.'], crit: 'Termina os 5 ciclos sem lábio dormente.' },
    ] : [
      { nome: 'Boquilha no espelho', dur: '5 min', obj: 'Embocadura estável e sem morder.', passos: [(I.sub === 'clarinete' ? 'Boquilha + barrilete' : 'Boquilha sozinha') + ', 4 tempos, observando no espelho.', 'Confira a nota de referência no afinador.', '8 repetições.'], crit: 'Nota de referência (±20 cents) com rosto parado.' },
      { nome: 'Grave em piano', dur: '5 min', obj: 'Tirar a mordida.', passos: ['Toque a nota mais grave confortável em volume baixo.', 'Se não sair, recue a mandíbula e use mais ar.', 'Repita 6 vezes.'], crit: 'A nota grave sai suave, sem estalo, 4 de 6 vezes.' },
      { nome: 'Resistência', dur: '10 min', obj: 'Fortalecer os cantos.', passos: ['1 minuto de notas longas, 1 minuto de descanso.', 'Faça 5 ciclos.'], crit: 'Termina os 5 ciclos sem vazar ar pelos cantos.' },
    ],
    met: [['Notas longas de 8 tempos', 60, 60, 'aumente para 12 tempos quando estável']],
    err: (I) => por(I, {
      palheta: [['Morder a palheta (mandíbula apertada).', 'O som fica fino e alto e o grave não sai. Pense em “segurar com os cantos, não com os dentes”. Toque graves em piano.'], ['Enrolar demais o lábio inferior.', 'Fica dolorido e abafa o som. Só a parte vermelha cobre os dentes.'], ['Inflar as bochechas.', 'Cantos firmes e bochechas encostadas nos dentes.'], ['Pouca boquilha na boca.', 'Som pequeno e abafado. Coloque até o ponto em que a palheta se separa da mesa.']],
      metal: [['Pressão excessiva do bocal.', 'Machuca, cansa e corta a vibração. Treine o exercício de pressão mínima.'], ['Sorrir (cantos para trás).', 'Lábios ficam finos e o som estridente. Cantos para baixo e para dentro.'], ['Bocal mudando de lugar entre grave e agudo.', 'Escolha uma posição e mantenha. Mudanças de registro vêm do ar e da abertura, não de mover o bocal.'], ['Tocar com o lábio cansado.', 'Descanse tanto quanto toca. Lábio dormente = parar.']],
    }),
    tempo: '20 minutos por dia, com pausas. A embocadura leva semanas para se firmar.',
    crit: (I) => ['Toco 8 tempos com o rosto parado no espelho.', I.familia === 'metal' ? 'Consigo tocar com pressão leve do bocal.' : 'A nota grave sai em piano, sem morder.', 'Completo 10 minutos (5 ciclos) sem perder a embocadura.'],
    quiz: (I) => I.familia === 'metal' ? [
      { p: 'Os cantos da boca, nos metais, devem ficar…', o: ['puxados para trás (sorriso)', 'firmes, para baixo e para dentro', 'relaxados e soltos', 'inflados'], c: 1 },
      { p: 'Pressão excessiva do bocal provoca…', o: ['mais agudo sem custo', 'cansaço, dor e corte da vibração', 'som mais bonito', 'nada'], c: 1 },
      { p: 'A posição do bocal deve…', o: ['mudar a cada registro', 'ser estável e respeitar sua anatomia', 'ser sempre no lábio de baixo', 'ser no canto da boca'], c: 1 },
    ] : [
      { p: 'A pressão na palheta deve vir principalmente…', o: ['da mandíbula (morder)', 'dos cantos da boca, como um elástico', 'da mão direita', 'da língua'], c: 1 },
      { p: 'Se o grave não sai em piano, provavelmente…', o: ['você está mordendo', 'a palheta é macia', 'falta boquilha', 'está tudo certo'], c: 0 },
      { p: 'O queixo deve ficar…', o: ['enrugado e para cima', 'plano e apontando para baixo', 'para frente', 'tanto faz'], c: 1 },
    ],
    tarefa: 'Grave 30 segundos de nota longa e ouça: o som balança? fica fino? Anote para comparar na próxima semana.',
  });

  C.aula({
    id: '2-3', titulo: 'Notas longas: estabilidade, dinâmica e homogeneidade', tempo: '10–15 min por dia (para sempre)',
    obj: 'Sustentar notas com altura, timbre e volume estáveis e controlar crescendo e diminuendo sem desafinar.',
    apr: ['Por que notas longas são o exercício mais importante', 'Estabilidade de altura e timbre', 'Controle de intensidade (pp a ff)', 'Homogeneidade entre notas'],
    teo: `<p>Notas longas são para o músico de sopro o que a musculação é para o atleta. Elas treinam, ao mesmo tempo: o <b>apoio</b>, a <b>embocadura</b>, a <b>afinação</b> e o <b>ouvido</b>. Todos os grandes instrumentistas fazem notas longas diariamente, por toda a carreira.</p>
      <p><b>Intensidade</b> (dinâmica) é o volume. A escala vai de <i>pp</i> (pianíssimo) a <i>ff</i> (fortíssimo): <i>pp – p – mp – mf – f – ff</i>. Crescendo (&lt;) = aumentar; diminuendo (&gt;) = diminuir.</p>
      <p>O desafio: ao mudar a dinâmica, a <b>afinação tende a mudar</b>. ${'Nos instrumentos de palheta, o piano tende a subir e o forte a descer; nos metais é comum o contrário em alguns registros.'} Por isso se treina com afinador.</p>
      <p><b>Homogeneidade</b> é fazer todas as notas soarem com o mesmo “corpo” e cor, do grave ao agudo — como um cantor que não muda de voz ao subir.</p>`,
    pra: (I, H) => `<p>Escolha 5 notas confortáveis. Para cada uma: 4 tempos em <i>p</i>, 4 tempos crescendo até <i>f</i>, 4 tempos diminuindo até <i>p</i> (♩ = 60). Use o <a href="#afinador">afinador</a> (ou grave e analise o arquivo): a meta é o ponteiro parado do início ao fim.</p>` +
      H.pauta({ tipo: 'notas', notas: !I.grave ? (I.sub === 'clarinete' ? 'C4:16 D4:16 E4:16 F4:16 G4:16 F4:16 E4:16 D4:16 C4:16' : 'G4:16 F4:16 E4:16 D4:16 C4:16 D4:16 E4:16 F4:16 G4:16') : 'F3:16 Eb3:16 D3:16 C3:16 Bb2:16 C3:16 D3:16 Eb3:16 F3:16', tom: !I.grave ? 'C' : 'Bb', titulo: 'Notas longas em sequência (cada nota: p < f > p)', bpm: 60 }),
    exs: [
      { nome: 'Nota longa com afinador', dur: '5 min', bpm: 60, obj: 'Altura estável.', passos: ['Uma nota, 8 tempos em mf.', 'Olhe o afinador só no fim (para treinar o ouvido), depois confira durante.', '5 notas diferentes.'], crit: 'Ponteiro dentro de ±10 cents durante toda a nota.' },
      { nome: 'Crescendo–diminuendo', dur: '5 min', bpm: 60, obj: 'Controle de dinâmica sem desafinar.', passos: ['p (4) < f (4) > p (4).', 'O final em p deve ser tão estável quanto o início.', '5 notas.'], crit: 'Afinação dentro de ±15 cents nas três dinâmicas.' },
      { nome: 'Nota com drone', dur: '5 min', obj: 'Afinação auditiva.', passos: ['Na aba Afinador, ligue a nota de referência.', 'Toque junto e ouça os batimentos.', 'Ajuste até sumirem.'], crit: 'Elimina os batimentos em até 3 segundos.' },
    ],
    met: [['Notas longas 8 tempos', 60, 60, 'depois 12 e 16 tempos'], ['p < f > p em 12 tempos', 60, 60, 'quando dominar, 16 tempos a ♩ = 60']],
    err: [['Desafinar no crescendo.', 'O crescendo vem do apoio, não da embocadura. Mantenha a embocadura parada e aumente o volume de ar.'], ['Fim da nota “morrendo” para baixo.', 'Mantenha o apoio até o último instante; termine com o ar, não relaxando o lábio.'], ['Tocar notas longas sem atenção.', 'Cada nota é um exercício de escuta. Se estiver distraído, faça menos e com foco total.']],
    tempo: '10–15 minutos por dia, todos os dias do curso.',
    crit: ['Sustento 12 tempos a ♩ = 60 com afinação ±10 cents.', 'Faço p < f > p sem sair de ±15 cents.', 'As 5 notas da sequência soam com timbre parecido.'],
    quiz: [
      { p: 'Qual é a ordem correta das dinâmicas, do mais suave ao mais forte?', o: ['p, pp, mf, f', 'pp, p, mp, mf, f, ff', 'ff, f, mf, p', 'mp, p, pp, f'], c: 1 },
      { p: 'De onde deve vir o crescendo?', o: ['De apertar a embocadura', 'Do aumento do ar com apoio, mantendo a embocadura', 'De soprar mais rápido com a garganta', 'Do volume do afinador'], c: 1 },
      { p: 'Homogeneidade significa…', o: ['tocar tudo forte', 'todas as notas com o mesmo corpo e cor de som', 'tocar sem vibrato', 'tocar com a mesma nota'], c: 1 },
      { p: 'Notas longas devem ser feitas…', o: ['só no início do curso', 'todos os dias, durante toda a vida musical', 'só antes de apresentações', 'nunca'], c: 1 },
    ],
    tarefa: 'Grave suas notas longas, envie o arquivo na aba Afinador e anote o desvio médio e a oscilação. Esse é seu ponto de partida.',
  });

  C.aula({
    id: '2-4', titulo: 'O ataque com a língua', tempo: '15 min por dia',
    obj: 'Iniciar as notas com a língua de forma limpa, sem interromper o fluxo de ar — a base de toda articulação.',
    apr: ['O que é articulação', 'Onde a língua toca', 'Sílabas “tu” e “du”', 'Notas repetidas com metrônomo'],
    teo: (I) => `<p><b>Articulação</b> é a forma de iniciar, ligar e separar as notas. Na fala, as consoantes separam as sílabas; no sopro, a <b>língua</b> faz esse papel.</p>
      <p>O princípio mais importante: <b>a língua não empurra o ar</b>. O ar está sempre pronto e pressionado (apoio); a língua funciona como uma válvula que <b>libera</b> o ar. Pense na língua “saindo do caminho”, não “batendo”.</p>
      ${por(I, { palheta: '<p><b>Onde a língua toca (palheta):</b> a ponta da língua (ou logo atrás da ponta) toca levemente a <b>ponta da palheta</b>, por baixo. Para atacar, a língua se afasta, como ao dizer “tu” ou “du”. Toque o mínimo de palheta, com o mínimo de força.</p>', metal: '<p><b>Onde a língua toca (metais):</b> a ponta da língua toca atrás dos dentes de cima (ou no limite entre dentes e gengiva), como ao dizer “tu”. Ela não entra entre os lábios. No grave, “tô” ou “dô”; no agudo, “ti”.</p>' })}
      <p><b>“Tu”</b> dá um ataque mais definido; <b>“du”</b> dá um ataque mais suave. Evite o <b>ataque de garganta</b> (“hu” ou golpe de glote): ele soa como uma tosse e prende o ar.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'notas', notas: (!I.grave ? (I.sub === 'clarinete' ? 'G4:4 G4:4 G4:4 G4:4 F4:4 F4:4 F4:4 F4:4 E4:4 E4:4 E4:4 E4:4 F4:16' : 'G4:4 G4:4 G4:4 G4:4 A4:4 A4:4 A4:4 A4:4 B4:4 B4:4 B4:4 B4:4 A4:16') : 'F3:4 F3:4 F3:4 F3:4 Eb3:4 Eb3:4 Eb3:4 Eb3:4 D3:4 D3:4 D3:4 D3:4 Eb3:16'), tom: !I.grave ? 'C' : 'Bb', titulo: 'Notas repetidas com “tu” (uma respiração por linha)', bpm: 60 }) +
      '<p>Mantenha o som “ligado por baixo”: entre as notas, a língua interrompe por um instante, mas o ar continua pressionado. O resultado soa como um colar de pérolas: notas separadas, sobre um fio contínuo.</p>',
    exs: [
      { nome: 'Sopro + língua sem instrumento', dur: '2 min', obj: 'Ar contínuo com a língua interrompendo.', passos: ['Sopre na palma da mão um ar constante.', 'Sem parar o ar, diga “tu-tu-tu-tu”.', 'O ar na mão deve continuar sentido entre os “tu”.'], crit: 'Sente o ar contínuo.' },
      { nome: 'Nota longa → notas repetidas', dur: '5 min', bpm: 60, obj: 'Manter o som igual ao da nota longa.', passos: ['Toque 4 tempos de nota longa.', 'Sem respirar, toque 4 semínimas com “tu”.', 'Compare os sons: devem ser iguais.'], crit: 'As semínimas têm o mesmo som da nota longa.' },
      { nome: 'Colcheias', dur: '5 min', bpm: 60, obj: 'Começar a velocidade.', passos: ['Mesma nota, 8 colcheias por compasso.', 'Comece em ♩ = 60 e suba 4 BPM por dia.'], crit: 'Colcheias limpas e iguais a ♩ = 80.' },
    ],
    met: [['Semínimas com “tu”', 60, 92], ['Colcheias com “tu”', 60, 88], ['Semicolcheias (4 por tempo)', 50, 72, 'só depois que as colcheias estiverem a 88']],
    err: (I) => [['Ataque de garganta (sem língua).', 'Treine sempre com “tu”; antes de tocar, deixe a língua posicionada e o ar pressionado atrás dela.'], ['Língua batendo com força.', 'Toque leve: imagine que a língua só “desencosta”.'], ['Parar o ar entre as notas.', 'Exercício da mão: o ar continua, a língua interrompe.'], [I.familia === 'metal' ? 'Língua entre os lábios (“th”).' : 'Mexer a mandíbula a cada nota.', I.familia === 'metal' ? 'A ponta da língua fica atrás dos dentes de cima.' : 'Só a língua se mexe. Treine no espelho.']],
    tempo: '15 minutos por dia, logo depois das notas longas.',
    crit: ['Começo as notas com a língua, sem ataque de garganta.', 'Toco semínimas limpas a ♩ = 92.', 'Toco colcheias limpas a ♩ = 80.'],
    quiz: (I) => [
      { p: 'Qual a função da língua no ataque?', o: ['Empurrar o ar', 'Liberar o ar que já está pressionado, como uma válvula', 'Fechar a garganta', 'Mover a mandíbula'], c: 1 },
      { p: I.familia === 'metal' ? 'Onde a ponta da língua toca nos metais?' : 'Onde a língua toca nos instrumentos de palheta?', o: I.familia === 'metal' ? ['Entre os lábios', 'Atrás dos dentes de cima', 'No céu da boca, lá atrás', 'Na bochecha'] : ['No céu da boca', 'Na ponta da palheta, por baixo', 'Na boquilha, por cima', 'Nos dentes'], c: 1 },
      { p: 'Que sílaba dá um ataque mais suave?', o: ['“tu”', '“du”', '“ku”', '“hu”'], c: 1 },
      { p: 'Entre duas notas articuladas, o ar…', o: ['para totalmente', 'continua pressionado; a língua interrompe por um instante', 'sai pela garganta', 'é inspirado'], c: 1 },
    ],
    tarefa: 'Faça o exercício de notas repetidas todos os dias e registre seu andamento máximo limpo de colcheias.',
  });

  // =====================================================================
  C.mod({ n: 3, nivel: 'iniciante', titulo: 'Notas, dedilhado e leitura inicial', desc: 'O que é música, pentagrama, claves, nomes das notas e as primeiras notas e melodias no instrumento.' });

  C.aula({
    id: '3-1', titulo: 'Som, silêncio e os parâmetros do som', tempo: '30 min',
    obj: 'Entender o que é música e os quatro parâmetros do som, e como você controla cada um no instrumento.',
    apr: ['O que é música', 'Som e silêncio', 'Frequência e altura', 'Duração, intensidade e timbre'],
    teo: (I, H) => `<p><b>Música</b> é a organização de sons e silêncios no tempo. Os <b>silêncios</b> (pausas) são tão importantes quanto os sons: é neles que a música respira.</p>
      <p><b>Som</b> é vibração. Algo vibra (a palheta, os lábios, uma corda), faz o ar vibrar, e essa vibração chega ao ouvido. O som musical tem quatro <b>parâmetros</b>:</p>
      ${H.tabela(['Parâmetro', 'O que é', 'No seu instrumento'], [
        ['<b>Altura</b>', 'Grave ou agudo. Depende da <b>frequência</b>: quantas vibrações por segundo (Hz). O Lá de afinação vibra 440 vezes por segundo (Lá 440 Hz).', I.familia === 'metal' ? 'Pistos/vara + velocidade do ar e vibração dos lábios' : 'Dedilhado + chave de oitava/registro + ar'],
        ['<b>Duração</b>', 'Curto ou longo. Medida em tempos (pulsos).', 'Quanto tempo você sustenta o ar'],
        ['<b>Intensidade</b>', 'Forte ou fraco (volume). Na partitura: dinâmicas (p, f…).', 'Quantidade de ar, com apoio'],
        ['<b>Timbre</b>', 'A “cor” do som; o que diferencia um sax de um trompete tocando a mesma nota. Depende dos <b>harmônicos</b>.', I.familia === 'metal' ? 'Bocal, abertura dos lábios, garganta e ar' : 'Boquilha, palheta, embocadura, garganta e ar'],
      ])}
      <p><b>Oitava:</b> quando a frequência dobra, a nota se repete mais aguda (Lá 440 → Lá 880). Por isso os nomes das notas se repetem a cada oitava.</p>`,
    pra: (I) => `<p>Faça um teste com cada parâmetro: toque a mesma nota (1) grave e aguda — ${I.familia === 'metal' ? 'mude de harmônico mantendo a mesma posição' : 'com e sem a chave de ' + (I.sub === 'clarinete' ? 'registro (repare que muda uma 12ª, não uma 8ª!)' : 'oitava')}; (2) curta e longa; (3) piano e forte; (4) com som “escuro” (vogal “ô”) e “claro” (vogal “i”) na garganta. Repare como você controla cada parâmetro de forma independente.</p>`,
    ex: '<p>Ouça uma gravação de sua referência e identifique: onde há silêncio? quais notas são mais longas? onde o som fica mais forte? Esse “ouvir analisando” é a base da percepção musical (módulo 9).</p>',
    exs: [
      { nome: 'Quatro parâmetros', dur: '10 min', obj: 'Controle independente.', passos: ['Escolha uma nota.', 'Varie só a duração (1, 2, 4 tempos).', 'Varie só a intensidade (p, mf, f).', 'Varie só o timbre (vogais ô/i).'], crit: 'Consegue mudar um parâmetro sem alterar os outros.' },
    ],
    err: [['Confundir altura com intensidade (“toca mais alto” = mais forte?).', 'Em música, “alto” é agudo e “forte” é volume. Use sempre “forte” para volume.'], ['Ignorar as pausas.', 'Pausa é música: conte-a com o mesmo cuidado que as notas.']],
    tempo: '30 minutos.',
    crit: ['Explico os quatro parâmetros do som.', 'Sei o que significa Lá 440 Hz.', 'Varío um parâmetro sem mudar os outros.'],
    quiz: [
      { p: 'Quantas vibrações por segundo tem o Lá de afinação padrão?', o: ['220', '440', '880', '1000'], c: 1 },
      { p: 'O que diferencia um trompete de um sax tocando a mesma nota?', o: ['A altura', 'A duração', 'O timbre', 'A intensidade'], c: 2 },
      { p: 'Em música, “mais alto” significa…', o: ['mais forte', 'mais agudo', 'mais longo', 'mais rápido'], c: 1 },
      { p: 'Quando a frequência dobra, a nota…', o: ['vira outra nota qualquer', 'repete uma oitava acima', 'fica mais forte', 'fica mais curta'], c: 1 },
    ],
    tarefa: 'Escreva em uma frase como você controla cada parâmetro no seu instrumento.',
  });

  C.aula({
    id: '3-2', titulo: 'Pentagrama, claves e o nome das notas', tempo: '40 min + 10 min por dia',
    obj: (I) => `Ler as notas na ${I.clave === 'bass' ? 'clave de Fá' : 'clave de Sol'} com rapidez, conhecendo linhas, espaços, linhas suplementares e a nomenclatura brasileira e internacional.`,
    apr: ['As 7 notas e seus nomes (Dó-Ré-Mi e C-D-E)', 'Pentagrama, linhas e espaços', 'Claves de Sol, Fá e Dó', 'Linhas suplementares', 'Leitura rápida'],
    teo: (I, H) => `<p>Existem <b>7 notas naturais</b>. No Brasil usamos os nomes de origem italiana; em cifras e em muitos materiais usam-se as letras:</p>
      ${H.tabela(['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'], [['C', 'D', 'E', 'F', 'G', 'A', 'B']])}
      <p>Depois do Si vem o Dó de novo, uma oitava acima. Para saber de qual oitava se trata, usamos números: o <b>Dó central</b> do piano é o <b>Dó4 (C4)</b>; o Lá 440 Hz é o <b>Lá4</b>.</p>
      <p>O <b>pentagrama</b> (ou pauta) tem <b>5 linhas</b> e <b>4 espaços</b>, contados <b>de baixo para cima</b>. Notas mais agudas ficam mais acima. Para notas fora da pauta usam-se <b>linhas suplementares</b>.</p>
      <p>A <b>clave</b> dá nome às linhas: a <b>clave de Sol</b> (na 2ª linha) diz que a 2ª linha é Sol4; a <b>clave de Fá</b> (na 4ª linha) diz que a 4ª linha é Fá3; a <b>clave de Dó</b> (na 3ª ou 4ª linha) diz que aquela linha é o Dó4 — usada por viola, e às vezes por trombone e fagote.</p>
      ${I.clave === 'bass'
        ? `${H.tabela(['Posição (clave de Fá)', 'Notas'], [['Linhas (de baixo para cima)', 'Sol2 – Si2 – Ré3 – Fá3 – Lá3'], ['Espaços', 'Lá2 – Dó3 – Mi3 – Sol3'], ['1ª linha suplementar inferior', 'Mi2'], ['1ª linha suplementar superior', 'Dó4 (Dó central)']])}
          <p>Frase para decorar as linhas: <b>“Sol, Si, Ré, Fá, Lá”</b>; os espaços: <b>“Lá, Dó, Mi, Sol”</b>.</p>`
        : `${H.tabela(['Posição (clave de Sol)', 'Notas'], [['Linhas (de baixo para cima)', 'Mi4 – Sol4 – Si4 – Ré5 – Fá5'], ['Espaços', 'Fá4 – Lá4 – Dó5 – Mi5'], ['1ª linha suplementar inferior', 'Dó4 (Dó central)'], ['1ª linha suplementar superior', 'Lá5']])}
          <p>Truque: os <b>espaços</b> formam “<b>Fá–Lá–Dó–Mi</b>”; as <b>linhas</b>, “<b>Mi–Sol–Si–Ré–Fá</b>”.</p>`}`,
    pra: (I, H) => H.pauta({ tipo: 'notas', notas: I.clave === 'bass' ? 'G2:4 B2:4 D3:4 F3:4 A3:16 A2:4 C3:4 E3:4 G3:4 C4:16' : 'E4:4 G4:4 B4:4 D5:4 F5:16 F4:4 A4:4 C5:4 E5:4 C4:16', tom: 'C', titulo: 'Linhas e espaços', bpm: 60 }) +
      `<p>Na aba <a href="#dedilhado">${I.sub === 'trombone' ? 'Posições' : I.sub === 'trompete' ? 'Pistos' : 'Dedilhados'}</a> cada nota aparece desenhada na pauta ao lado da posição. Use-a como “dicionário” sempre que encontrar uma nota nova.</p>`,
    exs: [
      { nome: 'Leitura relâmpago', dur: '10 min/dia', obj: 'Reconhecer notas em menos de 2 segundos.', passos: ['Pegue qualquer partitura (hinário, método).', 'Diga o nome das notas em voz alta, sem tocar, no ritmo de ♩ = 40 (uma nota por clique).', 'Suba 4 BPM por dia.'], crit: 'Lê uma linha de partitura a ♩ = 72 sem errar.', bpm: 40 },
      { nome: 'Escrever notas', dur: '10 min', obj: 'Fixar as posições.', passos: ['Desenhe um pentagrama à mão (ou imprima).', 'Escreva as notas de uma oitava a partir do Dó.', 'Escreva os dois nomes embaixo de cada uma (Dó/C…).'], crit: 'Escreve sem consultar.' },
    ],
    met: [['Ler nomes de notas em voz alta', 40, 72, '+4 BPM por dia']],
    err: [['Contar linhas de cima para baixo.', 'Linhas e espaços são sempre contados de baixo para cima.'], ['Decorar só o desenho de uma música.', 'Leia nota por nota; teste com partituras que você não conhece.'], ['Escrever o nome das notas na partitura para tocar.', 'Atrapalha a leitura real. Se precisar, escreva só nas notas de linhas suplementares e apague depois.']],
    tempo: '40 minutos de estudo e 10 minutos diários de leitura relâmpago.',
    crit: (I) => [`Nomeio qualquer nota na ${I.clave === 'bass' ? 'clave de Fá' : 'clave de Sol'}, dentro da pauta, em menos de 2 segundos.`, 'Sei os nomes em português e em letras (C, D, E…).', 'Conheço as notas das primeiras linhas suplementares.'],
    quiz: (I) => [
      { p: 'Como se contam as linhas do pentagrama?', o: ['De cima para baixo', 'De baixo para cima', 'Do meio para fora', 'Tanto faz'], c: 1 },
      { p: 'Qual letra corresponde a Lá?', o: ['L', 'A', 'G', 'C'], c: 1 },
      { p: 'Qual letra corresponde a Si?', o: ['S', 'B', 'H', 'C'], c: 1 },
      I.clave === 'bass' ? { p: 'Na clave de Fá, a 4ª linha é…', o: ['Sol', 'Fá', 'Dó', 'Lá'], c: 1 } : { p: 'Na clave de Sol, a 2ª linha é…', o: ['Fá', 'Sol', 'Lá', 'Mi'], c: 1 },
      I.clave === 'bass' ? { p: 'Os espaços da clave de Fá, de baixo para cima, são…', o: ['Fá, Lá, Dó, Mi', 'Lá, Dó, Mi, Sol', 'Sol, Si, Ré, Fá', 'Dó, Mi, Sol, Si'], c: 1 } : { p: 'Os espaços da clave de Sol, de baixo para cima, são…', o: ['Fá, Lá, Dó, Mi', 'Mi, Sol, Si, Ré', 'Dó, Mi, Sol, Si', 'Lá, Dó, Mi, Sol'], c: 0 },
    ],
    tarefa: 'Faça a leitura relâmpago todos os dias e registre seu andamento. Na próxima aula você vai aprender as primeiras notas no instrumento.',
  });

  C.aula({
    id: '3-3', titulo: 'Primeiras notas e primeiras melodias', tempo: '20–30 min por dia',
    obj: 'Tocar com segurança as primeiras cinco notas e as primeiras melodias, lendo a partitura.',
    apr: (I) => [`As primeiras notas do ${I.curto.toLowerCase()}`, 'Mudança de notas sem interromper o som', 'Primeiras melodias completas', 'Respiração dentro da música'],
    teo: (I) => por(I, {
      sax: '<p>No sax, o caminho mais natural é começar pela <b>mão esquerda</b> (Si, Lá, Sol, Dó médio) e depois descer com a mão direita (Fá, Mi, Ré). Assim você aprende a cobrir as chaves sem tensão. Os dedos ficam sempre <b>sobre as chaves</b>, curvos, encostando de leve mesmo quando não apertam.</p>',
      clarinete: '<p>No clarinete, começa-se pelas notas da <b>garganta</b> (Sol solto, Fá, Mi) e desce-se com os dedos (Ré, Dó). Nos furos abertos, é a <b>polpa do dedo</b> (não a ponta) que tampa o furo. Qualquer fresta faz a nota guinchar: aperte de forma firme e leve, cobrindo todo o furo.</p>',
      trompete: '<p>No trompete, as primeiras notas são <b>Dó</b> (0), <b>Ré</b> (1-3), <b>Mi</b> (1-2), <b>Fá</b> (1) e <b>Sol</b> (0). Repare que Dó e Sol usam o mesmo “dedilhado” (nenhum pisto): o que muda é a <b>velocidade do ar</b> e a vibração dos lábios. Aperte os pistos <b>até o fundo</b>, rápido, com a ponta dos dedos.</p>',
      trombone: '<p>No trombone, as primeiras notas são <b>Si♭</b> (1ª), <b>Dó</b> (6ª), <b>Ré</b> (4ª), <b>Mi♭</b> (3ª) e <b>Fá</b> (1ª). Sem chaves, a <b>vara</b> precisa chegar exatamente na posição e o ouvido confirma a afinação. Mova a vara rápido entre as notas, com o pulso solto, e use a <b>língua suave (“du”)</b> para não fazer glissando sem querer.</p>',
    }),
    pra: (I, H) => {
      const notas = por(I, { sax: ['B4', 'A4', 'G4', 'C5', 'F4', 'E4', 'D4'], clarinete: ['G4', 'F4', 'E4', 'D4', 'C4'], trompete: ['C4', 'D4', 'E4', 'F4', 'G4'], trombone: ['Bb2', 'C3', 'D3', 'Eb3', 'F3'] });
      return H.dedos(I, notas) + H.pauta({ tipo: 'notas', notas: !I.grave ? 'C4:8 D4:8 E4:8 F4:8 G4:16 F4:8 E4:8 D4:8 C4:8 r:16' : 'Bb2:8 C3:8 D3:8 Eb3:8 F3:16 Eb3:8 D3:8 C3:8 Bb2:8 r:16', tom: !I.grave ? 'C' : 'Bb', titulo: 'Cinco notas: subir e descer', bpm: 60 });
    },
    ex: (I, H) => H.pauta({ tipo: 'mel', id: 'ode' }) + H.pauta({ tipo: 'mel', id: 'coral' }),
    exs: (I) => [
      { nome: 'Pares de notas', dur: '10 min', bpm: 60, obj: 'Mudar de nota sem “buraco” no som.', passos: ['Toque duas notas vizinhas ligadas (sem língua na segunda), 2 tempos cada.', 'O som não pode parar nem “estalar” na troca.', 'Faça todos os pares das 5 notas.'], crit: 'Todas as trocas sem estalos ' + (I.sub === 'trombone' ? '(e sem glissando: use “du” leve na troca de posição)' : '') },
      { nome: 'Ode à Alegria', dur: '10 min', bpm: 60, obj: 'Primeira melodia completa.', passos: ['Leia a melodia dizendo os nomes das notas no ritmo.', 'Toque em ♩ = 60, respirando a cada 4 compassos.', 'Suba até ♩ = 90.'], crit: 'Melodia inteira, sem parar, a ♩ = 90.' },
      { nome: 'Coral da Manhã', dur: '10 min', bpm: 60, obj: 'Notas longas dentro da música.', passos: ['Toque com som cheio e notas bem sustentadas.', 'Respire só nas pausas e nos finais de frase (compassos 4 e 8).'], crit: 'Sem interromper as frases.' },
    ],
    met: [['Cinco notas subindo e descendo', 60, 96], ['Ode à Alegria', 60, 100], ['Coral da Manhã', 60, 80]],
    err: (I) => por(I, {
      sax: [['Dedos levantando muito longe das chaves.', 'Dedos sempre encostados; movimentos pequenos = velocidade futura.'], ['Usar a mão direita para segurar o sax.', 'O peso fica na correia e no polegar direito (apoio). Os dedos ficam livres.']],
      clarinete: [['Furo mal tampado (guincho).', 'Use a polpa do dedo, não a ponta. Olhe no espelho ou peça para alguém ver.'], ['Apertar o clarinete com força para tampar.', 'Pressão leve basta se o dedo estiver bem posicionado.']],
      trompete: [['Apertar os pistos pela metade.', 'Pisto sempre até o fundo, rápido.'], ['Mudar a pressão do bocal para trocar Dó e Sol.', 'Mude a velocidade do ar (“tô” para o Dó, “ti” para o Sol), não a pressão.']],
      trombone: [['Posições imprecisas (desafinadas).', 'Confira cada posição com o afinador e memorize visualmente (a 3ª posição fica um pouco antes da campana).'], ['Glissando entre as notas.', 'Língua suave (“du”) em cada troca; vara rápida.']],
    }),
    tempo: '20–30 minutos por dia durante 1–2 semanas.',
    crit: ['Toco as cinco notas subindo e descendo a ♩ = 96.', 'Toco a Ode à Alegria inteira a ♩ = 100, sem parar.', 'Respiro só nos lugares previstos no Coral da Manhã.'],
    quiz: (I) => {
      const q = por(I, {
        sax: [{ p: 'Qual o dedilhado do Si (3ª linha)?', o: ['1-2', 'Só o dedo 1', '1-2-3', 'Nenhum dedo'], c: 1 }, { p: 'Sol (2ª linha) no sax é…', o: ['1', '1-2', '1-2-3', '1-2-3-4'], c: 2 }],
        clarinete: [{ p: 'Qual o dedilhado do Sol (2ª linha)?', o: ['Polegar', 'Nenhum dedo (solto)', '1-2-3', 'Chave de Lá'], c: 1 }, { p: 'O Fá (1º espaço) no clarinete é…', o: ['Polegar', 'Polegar + 1', 'Só o 1', 'Chave de registro'], c: 0 }],
        trompete: [{ p: 'Dó e Sol (2ª linha) no trompete usam…', o: ['pistos diferentes', 'nenhum pisto; muda o ar', '1-3 e 0', '1 e 2'], c: 1 }, { p: 'Mi (1ª linha) no trompete é…', o: ['1-3', '1-2', '0', '2'], c: 1 }],
        trombone: [{ p: 'Si♭ e Fá, nesta aula, ficam na…', o: ['1ª posição', '4ª posição', '6ª posição', '3ª posição'], c: 0 }, { p: 'Ré (Ré3) fica na…', o: ['1ª', '3ª', '4ª', '6ª'], c: 2 }],
      });
      return q.concat([{ p: 'Ao trocar de nota em legato, o som deve…', o: ['parar um instante', 'continuar sem buraco', 'ficar mais forte', 'ter um acento'], c: 1 }]);
    },
    tarefa: 'Grave a Ode à Alegria e ouça: o ritmo está firme? o som é igual em todas as notas? Anote um ponto a melhorar.',
  });

  C.aula({
    id: '3-4', titulo: 'Toda a extensão: registros e notas alternativas', tempo: '30 min por dia, por 2–4 semanas',
    obj: (I) => `Conhecer toda a extensão do ${I.curto.toLowerCase()}, os registros e as passagens difíceis, e saber quando usar dedilhados ou posições alternativas.`,
    apr: (I) => ['Extensão escrita e real', 'Registros (grave, médio, agudo)', I.familia === 'metal' ? 'Série harmônica e mudança de parcial' : I.sub === 'clarinete' ? 'A passagem do registro (garganta → clarim)' : 'A chave de oitava e a passagem Dó♯–Ré', 'Notas alternativas e quando usá-las'],
    teo: (I, H) => {
      const M = window.Musica;
      const [lo, hi] = I.faixa.map(M.parse);
      const ext = `<p><b>Extensão escrita (até o nível avançado):</b> ${M.nomeBR(lo)}${lo.o} a ${M.nomeBR(hi)}${hi.o}${I.transp.s ? ` — que soa ${M.nomeBR(M.escritaParaConcerto(lo, I))}${M.escritaParaConcerto(lo, I).o} a ${M.nomeBR(M.escritaParaConcerto(hi, I))}${M.escritaParaConcerto(hi, I).o}` : ''}. Acima disso existe o registro <b>${I.familia === 'metal' ? 'agudíssimo' : 'altíssimo'}</b>, estudado nos níveis avançado e profissional.</p>`;
      return ext + por(I, {
        sax: `<p>O sax tem três regiões: <b>grave</b> (Si♭3–Dó♯5, sem chave de oitava), <b>médio-agudo</b> (Ré5–Dó♯6, com chave de oitava, mesmos dedilhados uma oitava abaixo) e <b>chaves de palma</b> (Ré6–Fá♯6). A troca <b>Dó♯5 → Ré5</b> é a passagem mais difícil: vai de nenhum dedo para todos os dedos + oitava.</p>`,
        clarinete: `<p>O clarinete tem: <b>chalumeau</b> (Mi3–Fá♯4), <b>garganta</b> (Sol4–Si♭4), <b>clarim</b> (Si4–Dó6, com chave de registro, uma 12ª acima do chalumeau) e <b>altíssimo</b> (acima de Dó♯6). A <b>passagem do registro</b> (Lá4/Si♭4 → Si4/Dó5) é o grande desafio do iniciante: sai de quase nenhum dedo para todos os furos tampados + registro + mínimo.</p>
          <p><b>Dica dos professores:</b> ao tocar as notas da garganta perto da passagem, deixe os dedos da mão direita <b>abaixados</b>: isso estabiliza o som e prepara a troca.</p>`,
        trompete: `<p>No trompete, cada combinação de pistos dá acesso a uma <b>série harmônica</b>. Sem pistos (0), por exemplo, a série escrita é: Dó4 – Sol4 – Dó5 – Mi5 – Sol5 – (Si♭5, baixo) – Dó6. Subir de harmônico (parcial) é mudar a velocidade do ar e a vibração — os dedos podem nem se mexer.</p>
          ${H.tabela(['Pistos', 'Abaixa', 'Série (escrita) a partir do 2º harmônico'], [['0', '—', 'Dó4, Sol4, Dó5, Mi5, Sol5, Dó6'], ['2', '½ tom', 'Si3, Fá♯4, Si4, Ré♯5, Fá♯5'], ['1', '1 tom', 'Si♭3, Fá4, Si♭4, Ré5, Fá5'], ['1-2 (ou 3)', '1 tom e ½', 'Lá3, Mi4, Lá4, Dó♯5, Mi5'], ['2-3', '2 tons', 'Lá♭3, Mi♭4, Lá♭4, Dó5, Mi♭5'], ['1-3', '2 tons e ½', 'Sol3, Ré4, Sol4, Si4, Ré5'], ['1-2-3', '3 tons', 'Fá♯3, Dó♯4, Fá♯4, Lá♯4, Dó♯5']])}`,
        trombone: `<p>Como no trompete, cada posição dá uma <b>série harmônica</b>. Na 1ª posição: Si♭1 (pedal), Si♭2, Fá3, Si♭3, Ré4, Fá4, (Lá♭4, baixo), Si♭4. Quanto mais agudo, mais próximos ficam os harmônicos e mais notas aparecem em <b>posições alternativas</b> (por exemplo, Fá3 na 1ª ou na 6ª; Ré4 na 1ª ou na 4ª).</p>
          <p><b>Por que usar alternativas?</b> Para economizar movimento de vara (ex.: Ré4–Mi♭4: 4ª e 3ª, em vez de 1ª e 3ª) e para corrigir afinação (o 5º harmônico é naturalmente baixo).</p>`,
      });
    },
    pra: (I, H) => `<p>Use a aba <a href="#dedilhado">${I.sub === 'trombone' ? 'Posições' : I.sub === 'trompete' ? 'Pistos' : 'Dedilhados'}</a> como tabela completa. Estude a extensão <b>por regiões</b>, adicionando 1–2 notas novas por semana.</p>` +
      H.pauta({ tipo: 'escala', escala: 'cromatica', tonica: !I.grave ? 'C4' : 'Bb2', oitavas: 1, dur: 4, titulo: 'Escala cromática de uma oitava (toda a sequência de semitons)', bpm: 60 }) +
      por(I, {
        sax: H.pauta({ tipo: 'notas', notas: 'C#5:8 D5:8 C#5:8 D5:8 C5:8 D5:8 B4:8 D5:8 C#5:4 D5:4 C#5:4 D5:4 C#5:16', tom: 'C', titulo: 'Passagem Dó♯ ↔ Ré (ligado)', bpm: 60 }),
        clarinete: H.pauta({ tipo: 'notas', notas: 'G4:8 B4:8 A4:8 B4:8 Bb4:8 C5:8 A4:8 C5:8 G4:4 A4:4 B4:4 C5:4 D5:16', tom: 'C', titulo: 'Passagem do registro (dedos da mão direita abaixados nas notas da garganta)', bpm: 50 }),
        trompete: H.pauta({ tipo: 'notas', notas: 'C4:8 G4:8 C4:8 G4:8 C5:8 G4:8 C4:16 B3:8 F#4:8 B3:8 F#4:8 B4:8 F#4:8 B3:16', tom: 'C', titulo: 'Ligaduras labiais (sem mudar os pistos)', bpm: 60 }),
        trombone: H.pauta({ tipo: 'notas', notas: 'Bb2:8 F3:8 Bb2:8 F3:8 Bb3:8 F3:8 Bb2:16 A2:8 E3:8 A2:8 E3:8 A3:8 E3:8 A2:16', tom: 'Bb', titulo: 'Ligaduras labiais (1ª e 2ª posições, sem mexer a vara)', bpm: 60 }),
      }),
    exs: (I) => [
      { nome: 'Uma nota nova por vez', dur: '10 min/dia', obj: 'Ampliar a extensão com segurança.', passos: ['Escolha a próxima nota (grave ou aguda) que você ainda não domina.', 'Notas longas nela (4 × 8 tempos).', 'Ligue-a à nota vizinha conhecida (subindo e descendo).'], crit: 'Nota nova afinada (±15 cents) e com som parecido com as vizinhas.' },
      { nome: I.familia === 'metal' ? 'Ligaduras labiais' : 'Passagem de registro', dur: '10 min/dia', bpm: 50, obj: 'Dominar a troca mais difícil do instrumento.', passos: ['Toque o exercício de passagem desta aula ligado, ♩ = 50.', 'Repita 10 vezes, devagar, sem estalos.', 'Suba 4 BPM por dia.'], crit: '10 repetições seguidas limpas a ♩ = 80.' },
      { nome: 'Cromática', dur: '5 min/dia', bpm: 60, obj: 'Conhecer todas as notas.', passos: ['Escala cromática de 1 oitava, semínimas.', 'Depois toda a extensão confortável.'], crit: 'Cromática de 1 oitava a ♩ = 100 em colcheias.' },
    ],
    met: [['Passagem difícil', 50, 80], ['Cromática em colcheias', 60, 100]],
    err: (I) => por(I, {
      sax: [['Morder para tocar o agudo.', 'Agudo vem de ar mais rápido e garganta aberta (vogal “i” por dentro), não de mordida.'], ['Graves que “estalam”.', 'Mais boquilha na boca? Menos mordida, garganta aberta (“ô”), ar quente e constante. Verifique vazamentos.']],
      clarinete: [['Guincho no Si médio.', 'Confira: todos os anéis tampados? mínimo pressionado? Não aumente a mordida; aumente a velocidade do ar.'], ['Levantar todos os dedos nas notas da garganta.', 'Deixe a mão direita abaixada para preparar a passagem.']],
      trompete: [['Forçar o agudo com pressão.', 'Use velocidade de ar (vogal “i”) e abertura menor. Pressão excessiva destrói a resistência.'], ['Pular de harmônico por acaso.', 'Imagine (cante) a nota antes de tocar. O ouvido guia os lábios.']],
      trombone: [['Posições alternativas desafinadas.', 'Afine cada uma com o afinador; o 5º harmônico (Ré4 na 1ª) é baixo — “puxe para dentro”.'], ['Errar de harmônico.', 'Cante a nota antes; no trombone o ouvido escolhe o harmônico.']],
    }),
    tempo: '30 minutos por dia durante 2–4 semanas, intercalando com o módulo 4.',
    crit: ['Toco a escala cromática de uma oitava a ♩ = 100 em colcheias.', 'Toco a passagem mais difícil do instrumento 10 vezes seguidas a ♩ = 80.', 'Sei usar pelo menos duas notas/posições alternativas.'],
    quiz: (I) => por(I, {
      sax: [{ p: 'O Ré5 (4ª linha) é…', o: ['igual ao Ré4 + chave de oitava', 'só chave de oitava', 'chave de palma', 'igual ao Dó♯'], c: 0 }, { p: 'O Dó♯5 (3º espaço) é…', o: ['todos os dedos', 'nenhum dedo', 'só o 2', 'chave de oitava'], c: 1 }, { p: 'Uma alternativa ao Si♭ com bis é…', o: ['1 e 1 (dedos 1 + 4)', 'chave de oitava', '1-2-3', 'Dó lateral'], c: 0 }],
      clarinete: [{ p: 'A chave de registro faz a nota subir uma…', o: ['8ª', '12ª', '5ª', '2ª'], c: 1 }, { p: 'O Si4 (3ª linha) é dedilhado como…', o: ['o Mi3 grave + registro', 'o Sol solto', 'o Lá', 'o Dó'], c: 0 }, { p: 'Nas notas da garganta perto da passagem, a mão direita…', o: ['deve ficar longe', 'pode ficar abaixada para estabilizar', 'tampa o barrilete', 'segura a campana'], c: 1 }],
      trompete: [{ p: 'Dó4, Sol4 e Dó5 (escritos) usam…', o: ['pistos diferentes', 'os mesmos pistos (0); muda o harmônico', '1-3', '2'], c: 1 }, { p: 'Qual pisto abaixa ½ tom?', o: ['1', '2', '3', '1-3'], c: 1 }, { p: 'A combinação 1-2-3 abaixa…', o: ['1 tom', '2 tons', '3 tons', '½ tom'], c: 2 }],
      trombone: [{ p: 'O Fá3 pode ser tocado na…', o: ['1ª ou 6ª posição', 'só na 4ª', '2ª ou 7ª', '3ª'], c: 0 }, { p: 'Por que o Ré4 na 1ª posição precisa de ajuste?', o: ['O 5º harmônico é naturalmente baixo', 'É alto demais', 'Não existe', 'Só por estética'], c: 0 }, { p: 'Posições alternativas servem para…', o: ['decorar mais', 'economizar movimento de vara e corrigir afinação', 'tocar mais forte', 'nada'], c: 1 }],
    }),
    tarefa: 'Monte sua lista de “notas dominadas” e “notas em construção”. Atualize toda semana.',
  });

  // =====================================================================
  C.mod({ n: 4, nivel: 'iniciante', titulo: 'Ritmo, compassos e metrônomo', desc: 'Figuras, pausas, compassos simples e compostos, ponto, ligadura, síncope, contratempo e anacruse.' });

  C.aula({
    id: '4-1', titulo: 'Figuras musicais e pausas', tempo: '30 min + 10 min por dia',
    obj: 'Ler as figuras de duração e suas pausas, entendendo as relações entre elas.',
    apr: ['Semibreve, mínima, semínima, colcheia, semicolcheia, fusa e semifusa', 'Pausas equivalentes', 'Relação de metade/dobro', 'Leitura rítmica falada'],
    teo: (I, H) => `<p>A duração das notas é representada por <b>figuras</b>. Cada figura vale <b>metade</b> da anterior. Para cada figura existe uma <b>pausa</b> com a mesma duração.</p>
      ${H.tabela(['Figura', 'Nome internacional', 'Valor (em compasso 4/4)', 'Quantas cabem numa semibreve'], [
        ['Semibreve', 'whole note', '4 tempos', '1'], ['Mínima', 'half note', '2 tempos', '2'], ['Semínima', 'quarter note', '1 tempo', '4'],
        ['Colcheia', 'eighth note', '½ tempo', '8'], ['Semicolcheia', 'sixteenth note', '¼ de tempo', '16'], ['Fusa', 'thirty-second', '⅛ de tempo', '32'], ['Semifusa', 'sixty-fourth', '1/16 de tempo', '64'],
      ])}
      <p>As colcheias e menores têm <b>bandeirolas</b>; quando estão em grupo, as bandeirolas viram <b>barras</b> (colchetes) que agrupam as notas por tempo, facilitando a leitura.</p>
      <p><b>Leitura falada:</b> conte os tempos em voz alta (“1, 2, 3, 4”) e as subdivisões com “e”: colcheias = “1-e-2-e”; semicolcheias = “1-i-e-a”.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'ritmo', ritmo: '16 8 8 4 4 4 4 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1', titulo: 'Da semibreve à semicolcheia (uma nota só)', bpm: 60 }) +
      H.pauta({ tipo: 'ritmo', ritmo: '4 -4 4 -4 8 -8 4 4 -8 2 2 -4 4 4 -4 4 8', titulo: 'Figuras com pausas', bpm: 72 }) +
      '<p>Toque primeiro batendo palmas (ou falando “tá”), depois numa nota confortável do instrumento.</p>',
    exs: [
      { nome: 'Fale, bata, toque', dur: '10 min', bpm: 60, obj: 'Internalizar as durações.', passos: ['Com metrônomo, fale o ritmo contando (“1-e-2-e”).', 'Bata palmas no ritmo enquanto conta.', 'Toque em uma nota só.'], crit: 'Sem adiantar nem atrasar nas três formas.' },
      { nome: 'Leitura rítmica diária', dur: '10 min/dia', bpm: 60, obj: 'Fluência rítmica.', passos: ['Pegue uma linha de qualquer partitura.', 'Leia só o ritmo (em uma nota).', 'Use o ditado rítmico da aba Treino auditivo.'], crit: '80% de acerto no ditado rítmico.' },
    ],
    met: [['Ritmos desta aula (falar e tocar)', 60, 96]],
    err: [['Encurtar as notas longas.', 'Conte em voz alta até o fim: uma mínima termina no início do 3º tempo, não antes.'], ['Apressar nas pausas.', 'Pausa tem o mesmo valor que a nota correspondente. Conte-a.'], ['Ler semicolcheias sem subdividir.', 'Use “1-i-e-a” devagar. Velocidade só depois da precisão.']],
    tempo: '30 minutos e 10 minutos por dia de leitura rítmica.',
    crit: ['Sei o valor de todas as figuras e pausas.', 'Leio os dois ritmos desta aula a ♩ = 96 sem erro.', 'Acerto 80% no ditado rítmico (aba Treino auditivo).'],
    quiz: [
      { p: 'Quantas colcheias cabem numa mínima?', o: ['2', '4', '8', '1'], c: 1 },
      { p: 'Qual figura vale metade de uma semínima?', o: ['Mínima', 'Colcheia', 'Semibreve', 'Semicolcheia'], c: 1 },
      { p: 'Em 4/4, uma semibreve vale…', o: ['1 tempo', '2 tempos', '4 tempos', '8 tempos'], c: 2 },
      { p: 'A pausa de semínima vale…', o: ['meio tempo', '1 tempo', '2 tempos', 'nada'], c: 1 },
      { p: 'Como se contam semicolcheias?', o: ['1-e-2-e', '1-i-e-a', '1-2-3-4', '1-la-li'], c: 1 },
    ],
    tarefa: 'Leia o ritmo de 3 linhas de partitura por dia (só ritmo, em uma nota).',
  });

  C.aula({
    id: '4-2', titulo: 'Pulso, compasso e metrônomo', tempo: '30 min',
    obj: 'Entender pulso, compassos simples, fórmulas de compasso, barras e andamento, e usar o metrônomo como ferramenta de estudo.',
    apr: ['Pulso e tempo forte/fraco', 'Fórmulas de compasso (2/4, 3/4, 4/4, 2/2)', 'Barras de compasso e de final, ritornelo', 'Andamento: termos e BPM', 'Como estudar com metrônomo'],
    teo: (I, H) => `<p><b>Pulso</b> é a batida regular da música, aquela que você marca com o pé. Os pulsos se agrupam em <b>compassos</b>, com um <b>tempo forte</b> (o primeiro) e tempos mais fracos.</p>
      <p>A <b>fórmula de compasso</b> tem dois números: o de <b>cima</b> diz quantos tempos há no compasso; o de <b>baixo</b> diz qual figura vale um tempo (4 = semínima, 2 = mínima, 8 = colcheia).</p>
      ${H.tabela(['Fórmula', 'Tempos', 'Unidade', 'Exemplo de uso'], [['2/4', '2', 'semínima', 'marchas, dobrados, samba, frevo'], ['3/4', '3', 'semínima', 'valsa, muitos hinos'], ['4/4 (C)', '4', 'semínima', 'a maioria da música popular e gospel'], ['2/2 (₵)', '2', 'mínima', '“alla breve”: marchas rápidas, choros']])}
      <p><b>Barras:</b> barra simples separa compassos; barra dupla separa seções; barra final (fina + grossa) encerra; <b>ritornelo</b> (barra com dois pontos) manda repetir o trecho.</p>
      <p><b>Andamento</b> é a velocidade do pulso, medida em <b>BPM</b> (batidas por minuto). Termos italianos tradicionais:</p>
      ${H.tabela(['Termo', 'Caráter', 'BPM aproximado'], [['Largo / Grave', 'muito lento', '40–60'], ['Adagio', 'lento', '66–76'], ['Andante', 'andando', '76–108'], ['Moderato', 'moderado', '108–120'], ['Allegro', 'rápido, alegre', '120–168'], ['Presto', 'muito rápido', '168–200']])}`,
    pra: (I, H) => H.pauta({ tipo: 'mel', id: 'graca' }) + '<p>“Amazing Grace” está em 3/4 e começa com uma <b>anacruse</b> (um tempo antes do primeiro compasso completo — você verá na próxima aula). Sinta o “UM-dois-três” da valsa.</p>' +
      `<h4>Como estudar com metrônomo</h4><ol><li>Comece num andamento em que você <b>não erra</b> (mesmo que pareça lento demais).</li><li>Toque 3 vezes seguidas sem erro → suba 4 BPM.</li><li>Errou? Volte 8 BPM.</li><li>Use o <a href="#metronomo">treino progressivo</a> para subir automaticamente.</li><li>Alterne: às vezes ponha o clique nos tempos 2 e 4 (como o chimbal no gospel e no jazz).</li></ol>`,
    exs: [
      { nome: 'Marcar o pulso', dur: '5 min', obj: 'Sentir o tempo forte.', passos: ['Ouça uma música de que gosta.', 'Marque o pulso com o pé e conte os tempos do compasso.', 'Descubra: é de 2, 3 ou 4 tempos?'], crit: 'Identifica o compasso de 3 músicas diferentes.' },
      { nome: 'Amazing Grace', dur: '15 min', bpm: 72, obj: 'Tocar em 3/4 com pulso firme.', passos: ['Fale o ritmo contando “1-2-3”.', 'Toque a ♩ = 72.', 'Suba até ♩ = 100.'], crit: 'Melodia inteira a ♩ = 100, sem perder o pulso.' },
      { nome: 'Metrônomo nos tempos 2 e 4', dur: '5 min', bpm: 60, obj: 'Pulso interno.', passos: ['Ponha o metrônomo a 60 e imagine que cada clique é o 2º e o 4º tempo de um compasso a 120.', 'Toque semínimas numa nota.'], crit: 'Mantém o pulso por 8 compassos.' },
    ],
    met: [['Amazing Grace (3/4)', 72, 100], ['Ode à Alegria (4/4)', 80, 120]],
    err: [['Acelerar nas partes fáceis e atrasar nas difíceis.', 'O metrônomo denuncia. Toque a parte difícil isolada até ela acompanhar o andamento.'], ['Usar o metrônomo como muleta, sem pulso próprio.', 'Desligue o som por 4 compassos e religue: você ainda está junto?'], ['Subir o andamento cedo demais.', 'Regra dos 3 acertos seguidos.']],
    tempo: '30 minutos e uso diário do metrônomo daqui em diante.',
    crit: ['Explico o que significam os números da fórmula de compasso.', 'Toco Amazing Grace a ♩ = 100 com pulso firme.', 'Mantenho o pulso com o clique só nos tempos 2 e 4.'],
    quiz: [
      { p: 'Em 3/4, o número 4 indica…', o: ['4 tempos por compasso', 'que a semínima vale um tempo', 'andamento 4', 'quatro compassos'], c: 1 },
      { p: '2/2 também é chamado de…', o: ['compasso composto', 'alla breve', 'quaternário', 'rubato'], c: 1 },
      { p: 'Allegro indica um andamento…', o: ['lento', 'moderado', 'rápido', 'livre'], c: 2 },
      { p: 'O ritornelo indica…', o: ['fim da música', 'repetição de um trecho', 'mudança de compasso', 'pausa longa'], c: 1 },
      { p: 'Errou três vezes no novo andamento. O que fazer?', o: ['Continuar até acertar', 'Voltar 8 BPM', 'Dobrar o andamento', 'Parar de estudar'], c: 1 },
    ],
    tarefa: 'Escolha três hinos ou músicas da sua igreja/repertório e anote o compasso de cada um.',
  });

  C.aula({
    id: '4-3', titulo: 'Ponto de aumento, ligadura, anacruse e ponto de diminuição', tempo: '30 min',
    obj: 'Ler e tocar notas pontuadas, ligaduras de valor, anacruses e o ponto de diminuição (staccato).',
    apr: ['Ponto de aumento (e duplo ponto)', 'Ligadura de valor × ligadura de expressão', 'Anacruse', 'Ponto de diminuição (staccato)'],
    teo: `<p><b>Ponto de aumento:</b> um ponto ao lado da nota aumenta <b>metade do seu valor</b>. Mínima pontuada = 2 + 1 = 3 tempos; semínima pontuada = 1 + ½ = 1½ tempo. Duplo ponto acrescenta mais metade da metade (semínima com duplo ponto = 1¾).</p>
      <p><b>Ligadura de valor</b> (ou de prolongamento) une duas notas <b>iguais</b>: toca-se só a primeira, somando as durações. É usada para atravessar a barra de compasso. Já a <b>ligadura de expressão</b> (ou de frase) une notas <b>diferentes</b> e indica <b>legato</b>: só a primeira é articulada com a língua.</p>
      <p><b>Anacruse</b> são uma ou mais notas antes do primeiro tempo forte — o “empurrão” inicial da frase (como “A-” em “A-ma-zing”). O último compasso costuma ter o tempo que faltou.</p>
      <p><b>Ponto de diminuição</b> é o pontinho <b>acima ou abaixo</b> da nota (não ao lado). Indica <b>staccato</b>: a nota é encurtada (em geral, cerca de metade da duração), separada da seguinte. Não confunda com o ponto de aumento, que fica ao lado e aumenta a nota.</p>`,
    pra: (I, H) => H.pauta({ tipo: 'ritmo', ritmo: '12 4 6 2 4 4 6 2 6 2 12 4 3 1 3 1 4 4', titulo: 'Notas pontuadas (mínima pontuada, semínima pontuada, colcheia pontuada)', bpm: 72 }) +
      H.pauta({ tipo: 'mel', id: 'santos' }) + '<p>“When the Saints” tem notas longas ligadas e começa depois de uma pausa — conte com cuidado.</p>',
    exs: [
      { nome: 'Pontuadas contando', dur: '10 min', bpm: 60, obj: 'Precisão nas notas pontuadas.', passos: ['Conte em colcheias (“1-e-2-e”) e marque onde cada nota começa.', 'Toque o exemplo numa nota.', 'Atenção ao padrão semínima pontuada + colcheia: a colcheia cai no “e” do 2º tempo.'], crit: 'Ritmo exato a ♩ = 72.' },
      { nome: 'Staccato × legato', dur: '10 min', bpm: 72, obj: 'Diferenciar as ligaduras e o ponto.', passos: ['Toque 4 notas da escala ligadas (só a 1ª com língua).', 'Toque as mesmas 4 em staccato (curtas, língua em todas).', 'Alterne.'], crit: 'Diferença clara entre os dois.' },
    ],
    met: [['Pontuadas', 60, 96], ['When the Saints', 80, 120]],
    err: [['Tocar a nota ligada (de valor) de novo.', 'Na ligadura de valor, a segunda nota não é articulada: só se soma a duração.'], ['Staccato “seco” cortando o ar com a garganta.', 'O staccato é feito com a língua parando a palheta/o ar; o apoio continua.'], ['Começar a anacruse como se fosse tempo forte.', 'A anacruse é leve e conduz para o 1º tempo.']],
    tempo: '30 minutos.',
    crit: ['Leio notas pontuadas e ligaduras sem erro.', 'Diferencio legato e staccato no instrumento.', 'Toco When the Saints a ♩ = 120 com ritmo correto.'],
    quiz: [
      { p: 'Quanto vale uma mínima pontuada?', o: ['2 tempos', '3 tempos', '2½ tempos', '4 tempos'], c: 1 },
      { p: 'Ligadura entre duas notas iguais significa…', o: ['tocar as duas com língua', 'tocar só a primeira, somando as durações', 'tocar staccato', 'pular a segunda'], c: 1 },
      { p: 'O ponto de diminuição fica…', o: ['ao lado da nota', 'acima ou abaixo da nota', 'na barra de compasso', 'na clave'], c: 1 },
      { p: 'Anacruse é…', o: ['o último compasso', 'nota(s) antes do primeiro tempo forte', 'uma pausa', 'um acorde'], c: 1 },
    ],
    tarefa: 'Encontre no seu hinário/método 3 anacruses e 3 notas pontuadas. Toque cada trecho com metrônomo.',
  });

  C.aula({
    id: '4-4', titulo: 'Compassos compostos, síncope, contratempo e quiálteras', tempo: '40 min + 10 min por dia',
    obj: 'Ler compassos compostos (6/8, 9/8, 12/8), síncopes, contratempos e tercinas — a base rítmica do samba, do gospel, do jazz e do blues.',
    apr: ['Compassos simples × compostos', '6/8, 9/8 e 12/8', 'Síncope', 'Contratempo', 'Quiálteras (tercinas)'],
    teo: (I, H) => `<p>Nos <b>compassos simples</b>, cada tempo se divide em <b>2</b>. Nos <b>compostos</b>, cada tempo se divide em <b>3</b> e a unidade de tempo é uma figura pontuada (semínima pontuada).</p>
      ${H.tabela(['Fórmula', 'Tempos', 'Cada tempo', 'Sensação'], [['6/8', '2', '3 colcheias', 'balanço de 2 (“UM-dois-três DOIS-dois-três”)'], ['9/8', '3', '3 colcheias', '3 tempos ternários'], ['12/8', '4', '3 colcheias', 'baladas gospel, blues lento, soul']])}
      <p><b>Síncope:</b> nota que começa num tempo fraco (ou parte fraca) e se prolonga pelo tempo forte seguinte, deslocando o acento. É a alma do samba, do choro e da música popular brasileira: o famoso padrão “colcheia – semínima – colcheia”.</p>
      <p><b>Contratempo:</b> notas que soam nas partes fracas com pausa nas partes fortes (“pausa-nota, pausa-nota”). Comum em frevo, reggae e acompanhamentos de metais.</p>
      <p><b>Quiálteras</b> são grupos “irregulares”: a <b>tercina</b> coloca 3 notas no espaço de 2. Uma tercina de colcheias ocupa 1 tempo em 4/4. No jazz e no blues, as colcheias “swingadas” são tocadas próximas a uma tercina (longa-curta).</p>`,
    pra: (I, H) => H.pauta({ tipo: 'ritmo', ritmo: '2 4 2 2 4 2 2 4 2 8', titulo: 'Síncope (colcheia–semínima–colcheia)', bpm: 72 }) +
      H.pauta({ tipo: 'ritmo', ritmo: '-2 2 -2 2 -2 2 -2 2 -2 2 -2 2 -2 2 4', titulo: 'Contratempo', bpm: 80 }) +
      H.pauta({ tipo: 'ritmo', ritmo: '4 2 6 4 2 6 2 2 2 2 2 2 12', compasso: '6/8', titulo: '6/8: sinta 2 tempos de 3 colcheias', bpm: 60 }),
    exs: [
      { nome: 'Síncope falada', dur: '10 min', bpm: 60, obj: 'Sentir o deslocamento do acento.', passos: ['Bata o pulso com o pé.', 'Fale “ta-TAA-ta” (colcheia–semínima–colcheia), acentuando a semínima.', 'Toque numa nota.'], crit: 'Pé firme no pulso enquanto a síncope soa.' },
      { nome: 'Contratempo com metrônomo', dur: '10 min', bpm: 72, obj: 'Tocar fora do clique.', passos: ['Metrônomo a ♩ = 72.', 'Toque só no “e” (entre os cliques).', 'Não deixe o som “escorregar” para o clique.'], crit: '8 compassos seguidos no contratempo.' },
      { nome: 'Sentir o 6/8', dur: '5 min', bpm: 60, obj: 'Pulso composto.', passos: ['No metrônomo, 2 tempos com subdivisão 3.', 'Toque o exemplo em 6/8.'], crit: 'Acento natural no 1 e no 4.' },
    ],
    met: [['Síncope', 60, 100], ['Contratempo', 72, 120], ['6/8 (♩. = pulso)', 50, 80]],
    err: [['Transformar a síncope em duas notas.', 'A semínima central não é repetida; ela atravessa o tempo.'], ['Contar 6/8 em 6 tempos lentos.', 'Em andamento normal, 6/8 se sente em 2.'], ['Colcheias de jazz “quadradas” ou tercinas exageradas.', 'O swing é estilo: ouça e imite; ele muda com o andamento.']],
    tempo: '40 minutos e 10 minutos por dia de leitura rítmica.',
    crit: ['Explico a diferença entre compasso simples e composto.', 'Toco síncope e contratempo com metrônomo a ♩ = 100.', 'Sinto 6/8 em 2 tempos.'],
    quiz: [
      { p: 'Em 6/8, quantos tempos (pulsos) há por compasso?', o: ['6', '2', '3', '8'], c: 1 },
      { p: 'Síncope é…', o: ['uma pausa longa', 'nota que começa em parte fraca e se prolonga pela parte forte', 'nota com ponto', 'um acorde'], c: 1 },
      { p: 'Contratempo é…', o: ['tocar nas partes fortes', 'tocar nas partes fracas com pausa nas fortes', 'tocar mais rápido', 'tocar sem metrônomo'], c: 1 },
      { p: 'Uma tercina de colcheias ocupa…', o: ['3 tempos', '1 tempo (3 notas no lugar de 2)', 'meio tempo', '2 tempos'], c: 1 },
      { p: 'Qual estilo usa muito 12/8?', o: ['Frevo', 'Baladas gospel e blues lento', 'Marcha', 'Valsa'], c: 1 },
    ],
    tarefa: 'Ouça um samba e uma balada gospel. Marque o pulso e identifique síncopes (samba) e o 12/8 (balada).',
  });
})();
