# Conservatório de Sopros

Curso completo de **saxofone alto, saxofone soprano, clarinete, trompete e trombone**, do iniciante ao profissional, em português.

## O que tem

- **63 aulas em 16 módulos.** Cada aula traz objetivo, teoria, prática no instrumento escolhido, exemplos em partitura (que você pode ouvir), exercícios com metrônomo, erros comuns, tempo de estudo, critérios de aprovação, teste e tarefa.
- **Partituras transpostas automaticamente** para a leitura de cada instrumento: Mi♭ no sax alto, Si♭ no soprano, clarinete e trompete, e clave de Fá no trombone.
- **Ferramentas**
  - afinador (microfone ou análise de gravação)
  - metrônomo com treino progressivo
  - dedilhados (sax e clarinete), pistos (trompete) e posições (trombone)
  - gerador de escalas, arpejos e padrões
  - transpositor de notas, cifras e tonalidades
  - treino auditivo: intervalos, acordes, escalas, ditados e afinação
  - rotina guiada de 20 a 120 minutos
  - avaliação periódica de 0 a 10 com gráfico
  - repertório progressivo
- **Professor por IA**, disponível quando o app é aberto no Claude.

## Como abrir

Sirva a pasta com um servidor local, porque o microfone do afinador exige `localhost` ou `https`:

```bash
cd conservatorio
python3 -m http.server 8000
# abra http://localhost:8000
```

O progresso fica salvo no navegador. Aberto no Claude, ele também fica salvo na sua conta.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | estrutura e estilos |
| `js/musica.js` | motor de teoria: notas, escalas, transposição, partitura ABC |
| `js/audio.js` | síntese, metrônomo, nota de referência, detecção de altura |
| `js/instrumentos.js`, `js/clarinete.js` | instrumentos, dedilhados e diagramas |
| `js/melodias.js` | melodias de domínio público e exercícios originais |
| `js/curso1.js` – `js/curso3.js` | conteúdo dos módulos 1–4, 5–10 e 11–16 |
| `js/repertorio.js` | métodos, estudos e peças por nível (apenas referências) |
| `js/ferramentas.js` | ferramentas |
| `js/app.js` | navegação, progresso, aulas e professor |

Os métodos publicados (Klosé, Rubank, Arban, Mule, Rose, Rochut etc.) aparecem só como referência, sem reprodução de conteúdo. Os exercícios criados para este app estão marcados como "original".
