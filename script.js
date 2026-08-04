// Conselheiro FIX - Funciona no GitHub Pages
// 3 APIs com fallbacks locais porque quotable.io caiu e abibliadigital POST bloqueia CORS

const DICT = {
  'amor':'love','amar':'love','relacionamento':'love',
  'trabalho':'work','emprego':'work',
  'dinheiro':'money','grana':'money',
  'vida':'life','triste':'sadness','tristeza':'sadness',
  'feliz':'happiness','felicidade':'happiness','alegria':'happiness',
  'ansiedade':'anxiety','ansioso':'anxiety','ansiosa':'anxiety',
  'medo':'fear','coragem':'courage','força':'courage',
  'fé':'faith','fe':'faith','família':'family','familia':'family',
  'paz':'peace','perdão':'forgiveness','perdao':'forgiveness','esperança':'hope'
};

const FALLBACK = {
  conselhos: [
    "Descanse sem culpa. Você não é uma máquina.",
    "Foque em uma tarefa de cada vez com presença.",
    "Diga não sem explicar demais. Limite é amor próprio.",
    "Beba água, arrume a cama, dê uma volta. O resto vem.",
    "Não leve tudo para o pessoal. Cada um vive sua batalha.",
    "Faça hoje o que seu futuro eu vai agradecer."
  ],
  reflexoes: [
    {t:"A simplicidade é o último grau de sofisticação.", a:"Leonardo da Vinci"},
    {t:"Quase tudo volta a funcionar se você tirar da tomada por alguns minutos.", a:"Anne Lamott"},
    {t:"A coragem não é ausência do medo, é agir apesar dele.", a:"Nelson Mandela"},
    {t:"Nós aceitamos o amor que achamos que merecemos.", a:"Stephen Chbosky"},
    {t:"A paz vem de dentro. Não a procure fora.", a:"Buda"}
  ],
  biblia: [
    {text:"Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.", ref:"1 Pedro 5:7"},
    {text:"O Senhor é o meu pastor; nada me faltará.", ref:"Salmos 23:1"},
    {text:"Tudo posso naquele que me fortalece.", ref:"Filipenses 4:13"},
    {text:"O amor é paciente, o amor é bondoso. Não inveja, não se vangloria.", ref:"1 Coríntios 13:4"},
    {text:"Entrega o teu caminho ao Senhor; confia nele, e ele o fará.", ref:"Salmos 37:5"},
    {text:"Deixo-lhes a paz; a minha paz lhes dou.", ref:"João 14:27"}
  ]
};

function detectarTopico(texto){
  const lower = texto.toLowerCase();
  for(const [pt,en] of Object.entries(DICT)){
    if(lower.includes(pt)) return {pt, en};
  }
  return {pt: texto.split(' ')[0] || 'vida', en: 'life'};
}

async function buscarConselhos(en){
  let advice = FALLBACK.conselhos[Math.floor(Math.random()*FALLBACK.conselhos.length)];
  let quote = FALLBACK.reflexoes[Math.floor(Math.random()*FALLBACK.reflexoes.length)];
  
  try{
    const r = await fetch(`https://api.adviceslip.com/advice/search/${encodeURIComponent(en)}`, {cache:'no-store'});
    const data = await r.json();
    if(data.slips && data.slips.length > 0){
      advice = data.slips[Math.floor(Math.random()*data.slips.length)].advice;
    }
  }catch(e){}
  
  // Quotable caiu, tenta dummyjson como substituto
  try{
    const r = await fetch(`https://dummyjson.com/quotes/random`);
    const d = await r.json();
    if(d.quote) quote = {t: d.quote, a: d.author};
  }catch(e){
    try{
      const r2 = await fetch(`https://api.quotable.io/random`);
      const d2 = await r2.json();
      if(d2.content) quote = {t: d2.content, a: d2.author};
    }catch(e2){}
  }
  
  return {advice, quote};
}

async function buscarBiblia(){
  // Tenta API NVI random (GET funciona no GitHub Pages)
  try{
    const r = await fetch('https://www.abibliadigital.com.br/api/verses/nvi/random');
    if(r.ok){
      const d = await r.json();
      return {text: d.text, ref: `${d.book.name} ${d.chapter}:${d.number}`};
    }
  }catch(e){}
  
  // Fallback bible-api.com
  try{
    const r = await fetch('https://bible-api.com/data/web/random');
    if(r.ok){
      const d = await r.json();
      // traduz simples? deixa em inglês por enquanto, fallback local cobre
    }
  }catch(e){}
  
  // Fallback local PT-BR
  const pick = FALLBACK.biblia[Math.floor(Math.random()*FALLBACK.biblia.length)];
  return pick;
}

async function traduzir(texto){
  if(!texto) return texto;
  try{
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt-BR`);
    const d = await r.json();
    if(d.responseData && d.responseData.translatedText && !d.responseData.translatedText.toLowerCase().includes('mymemory')){
      return d.responseData.translatedText;
    }
  }catch(e){}
  return texto;
}

const results = document.getElementById('results');
const heroTitle = document.getElementById('heroTitle');
const heroSub = document.getElementById('heroSub');
const suggestions = document.getElementById('suggestions');
const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');

function addTyping(text){
  results.style.display='flex';
  results.classList.add('show');
  results.innerHTML = `<div class="typing"><div class="dots"><span></span><span></span><span></span></div><span>${text}</span></div>`;
}

function renderResults(topico, advicePT, quoteObj, biblia, adviceEN){
  if(heroTitle) heroTitle.style.display='none';
  if(heroSub) heroSub.style.display='none';
  if(suggestions) suggestions.style.display='none';
  results.style.display='flex';
  results.classList.add('show');
  
  const safe = (s) => s.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  
  results.innerHTML = `
    <div class="card conselho">
      <div class="card-label">✦ Conselho prático • sobre ${topico.pt}</div>
      <div class="card-text">"${advicePT}"</div>
      ${adviceEN && adviceEN !== advicePT ? `<div class="card-orig">Original: "${adviceEN}"</div>` : ''}
      <div class="card-actions"><button class="mini-btn" onclick="navigator.clipboard.writeText('${safe(advicePT)}')">Copiar</button></div>
    </div>
    <div class="card reflexao">
      <div class="card-label">✧ Reflexão</div>
      <div class="card-text">"${quoteObj.t}"</div>
      <div class="card-meta">— ${quoteObj.a}</div>
      <div class="card-actions"><button class="mini-btn" onclick="navigator.clipboard.writeText('${safe(quoteObj.t)} - ${safe(quoteObj.a)}')">Copiar</button></div>
    </div>
    <div class="card biblia">
      <div class="card-label">✟ Palavra • ${biblia.ref} • NVI</div>
      <div class="card-text">"${biblia.text}"</div>
      <div class="card-meta">${biblia.ref}</div>
      <div class="card-actions"><button class="mini-btn" onclick="navigator.clipboard.writeText('${safe(biblia.text)} (${safe(biblia.ref)})')">Copiar versículo</button><button class="mini-btn" onclick="handleQuery('${safe(topico.pt)}')">Novo sobre ${topico.pt}</button></div>
    </div>
  `;
  window.scrollTo({top:0, behavior:'smooth'});
}

async function handleQuery(text){
  const t = text.trim();
  if(!t) return;
  const topico = detectarTopico(t);
  input.value='';
  input.style.height='auto';
  
  addTyping(`Buscando sabedoria sobre ${topico.pt}...`);
  
  try{
    const [conselhos, bibliaRaw] = await Promise.all([
      buscarConselhos(topico.en),
      buscarBiblia()
    ]);
    
    addTyping('Traduzindo sabedoria...');
    
    // Traduz só se for inglês
    let advicePT = conselhos.advice;
    let quotePT = conselhos.quote.t;
    
    if(/[a-zA-Z]{4,}/.test(conselhos.advice) && conselhos.advice.includes(' ')){
      advicePT = await traduzir(conselhos.advice);
    }
    if(/[a-zA-Z]{4,}/.test(conselhos.quote.t) && conselhos.quote.t.includes(' ')){
      const trad = await traduzir(conselhos.quote.t);
      if(trad) quotePT = trad;
    }
    
    renderResults(topico, advicePT, {t: quotePT, a: conselhos.quote.a}, bibliaRaw, conselhos.advice);
    
  }catch(e){
    console.error(e);
    const fallbackBiblia = FALLBACK.biblia[Math.floor(Math.random()*FALLBACK.biblia.length)];
    renderResults(topico, 
      FALLBACK.conselhos[Math.floor(Math.random()*FALLBACK.conselhos.length)],
      FALLBACK.reflexoes[Math.floor(Math.random()*FALLBACK.reflexoes.length)],
      fallbackBiblia,
      null
    );
  }
}

if(sendBtn) sendBtn.onclick = () => handleQuery(input.value);
if(input){
  input.addEventListener('keydown', e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleQuery(input.value);} });
  input.addEventListener('input', ()=>{ input.style.height='auto'; input.style.height=Math.min(input.scrollHeight, 110)+'px'; });
}
document.querySelectorAll('.sugg').forEach(b=> b.addEventListener('click', ()=> handleQuery(b.dataset.q)));
window.handleQuery = handleQuery;
                  
