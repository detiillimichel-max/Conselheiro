// Conselheiro — roteador da mini IA
// Não altera a resposta atual. Apenas identifica a capacidade adequada
// e expõe funções modulares para a próxima integração do modo Inteligente.

const INTENT_MAP = [
  { capacidade: 'weather', palavras: ['clima','tempo','chuva','temperatura','calor','frio','previsão'] },
  { capacidade: 'books', palavras: ['livro','livros','autor','leitura','romance','biblioteca'] },
  { capacidade: 'world', palavras: ['país','paises','países','capital','moeda','continente','bandeira'] },
  { capacidade: 'science', palavras: ['nasa','espaço','planeta','astronomia','universo','ciência','cientista'] },
  { capacidade: 'news', palavras: ['notícia','noticias','notícias','mundo','aconteceu','atualidades','tecnologia'] },
  { capacidade: 'culture', palavras: ['cultura','arte','artista','museu','história','historia','obra'] },
  { capacidade: 'knowledge', palavras: ['o que é','quem é','explique','significa','conhecimento','wikipedia'] }
];

function detectarCapacidade(pergunta) {
  const texto = String(pergunta || '').toLowerCase();
  for (const grupo of INTENT_MAP) {
    if (grupo.palavras.some(p => texto.includes(p))) return grupo.capacidade;
  }
  return 'conselheiro';
}

function rotearPergunta(pergunta) {
  const capacidade = detectarCapacidade(pergunta);
  const api = window.ConselheiroAPI?.[capacidade] || null;
  return { capacidade, api };
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.router = { detectarCapacidade, rotearPergunta };
