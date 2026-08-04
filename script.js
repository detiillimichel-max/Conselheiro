// Conselheiro - 3 APIs: Advice Slip + Quotable + Bíblia Digital (NVI)
// Visual Copilot - Michel

const DICT = {
  'amor':'love','amar':'love','relacionamento':'love','casamento':'love','paixão':'love',
  'trabalho':'work','emprego':'work','carreira':'work',
  'dinheiro':'money','grana':'money',
  'vida':'life','viver':'life',
  'triste':'sadness','tristeza':'sadness','chorar':'sadness',
  'feliz':'happiness','felicidade':'happiness','alegria':'happiness',
  'ansiedade':'anxiety','ansioso':'anxiety','ansiosa':'anxiety','nervoso':'anxiety',
  'medo':'fear','coragem':'courage','força':'courage',
  'motivação':'motivation','fé':'faith','fe':'faith',
  'família':'family','familia':'family','saúde':'health',
  'amigo':'friendship','amizade':'friendship',
  'paz':'peace','perdão':'forgiveness','perdao':'forgiveness','esperança':'hope'
};

const BIBLIA_MAP = {
  'amor':'amor','amar':'amor','relacionamento':'amor',
  'trabalho':'trabalho','ansiedade':'ansiedade','ansioso':'ansiedade',
  'medo':'medo','coragem':'coragem','força':'força','fé':'fé','fe':'fé',
  'tristeza':'tristeza','triste':'tristeza','felicidade':'alegria','alegria':'alegria',
  'vida':'vida','paz':'paz','perdão':'perdão','perdao':'perdão','dinheiro':'dinheiro',
  'família':'família','familia':'família','esperança':'esperança'
};

function detectarTopico(texto){
  const lower = texto.toLowerCase();
  for(const [pt,en] of Object.entries(DICT)){
    if(lower.includes(pt)) return {pt, en, biblia: BIBLIA_MAP[pt] || pt};
  }
  const palavras = lower.replace(/[^\p{L}\s]/gu,'').split(/\s+/).filter(w=>w.length>3);
  const cand = palavras[0] || 'vida';
  return {pt:cand, en:cand, biblia:cand};
}

const cacheTraducao = new Map();
async function traduzir(texto){
  if(!texto) return texto;
  if(cacheTraducao.has(texto)) return cacheTraducao.get(texto);
  try{
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt-BR`);
    const d = await r.json();
    if(d.responseData?.translatedText){
      cacheTraducao.set(texto, d.responseData.translatedText);
      return d.responseData.translatedText;
    }
  }catch(e){}
  return texto;
}

async function buscarConselhos(en){
  let advice=null, quote=null;
  try{
    const r = await fetch(`https://api.adviceslip.com/advice/search/${encodeURIComponent(en)}`, {cache:'no-store'});
    const data = await r.json();
    if(data.slips?.length) advice = data.slips[Math.floor(Math.random()*data.slips.length)].advice;
  }catch(e){}
  if(!advice){
    try{ const r = await fetch('https://api.adviceslip.com/advice'); const d=await r.json(); advice=d.slip?.advice; }catch(e){ advice="Foque em uma tarefa de cada vez com presença."; }
  }
  try{
    const r = await fetch(`https://api.quotable.io/search/quotes?query=${encodeURIComponent(en)}&limit=10`);
    const d = await r.json();
    if(d.results?.length){ const p=d.results[Math.floor(Math.random()*d.results.length)]; quote={content:p.content, author:p.author}; }
  }catch(e){}
  if(!quote){
    try{ const r=await fetch('https://api.quotable.io/random'); const d=await r.json(); quote={content:d.content, author:d.author}; }catch(e){ quote={content:"A simplicidade é o último grau de sofisticação.", author:"Leonardo da Vinci"}; }
  }
  return {advice, quote};
}

async function buscarBiblia(termo){
  // API pública brasileira abibliadigital.com.br - NVI, sem key, 20 req/hora
  try{
    const r = await fetch('https://www.abibliadigital.com.br/api/verses/search', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({version:'nvi', search: termo})
    });
    const d = await r.json();
    if(d.verses && d.verses.length>0){
      const pick = d.verses[Math.floor(Math.random()*Math.min(d.verses.length, 15))];
      return {text: pick.text, ref: `${pick.book.name} ${pick.chapter}:${pick.number}`, book: pick.book.name};
    }
  }catch(e){}
  try{
    const r = await fetch('https://www.abibliadigital.com.br/api/verses/nvi/random');
    const d = await r.json();
    return {text: d.text, ref: `${d.book.name} ${d.chapter}:${d.number}`, book: d.book.name};
  }catch(e){
    return {text:"Entrega o teu caminho ao Senhor; confia nele, e ele o fará.", ref:"Salmos 37:5", book:"Salmos"};
  }
}

const heroTitle = document.getElementById('heroTitle');
const heroSub = document.getElementById('heroSub');
const suggestions = document.getElementById('suggestions');
const results = document.getElementById('results');
const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');

function addTyping(text){
  results.classList.add('show');
  results.style.display='flex';
  results.innerHTML = `<div class="typing"><div class="dots"><span></span><span></span><span></span></div><span>${text}</span></div>`;
}

function renderResults(topico, advicePT, quotePT, quoteAuthor, biblia, adviceEN, quoteEN){
  heroTitle.style.display='none';
  heroSub.style.display='none';
  suggestions.style.display='none';
  results.classList.add('show');
  results.style.display='flex';
  results.innerHTML = `
    <div class="card conselho">
      <div class="card-label">✦ Conselho prático • sobre ${topico.pt}</div>
      <div class="card-text">"${advicePT}"</div>
      ${adviceEN!==advicePT ? `<div class="card-orig">Original: "${adviceEN}"</div>` : ''}
      <div class="card-actions"><button class="mini-btn" onclick="navigator.clipboard.writeText('${advicePT.replace(/'/g,"\\'")}')">Copiar</button></div>
    </div>
    <div class="card reflexao">
      <div class="card-label">✧ Reflexão</div>
      <div class="card-text">"${quotePT}"</div>
      <div class="card-meta">— ${quoteAuthor}</div>
      ${quoteEN!==quotePT ? `<div class="card-orig">Original: "${quoteEN}"</div>` : ''}
      <div class="card-actions"><button class="mini-btn" onclick="navigator.clipboard.writeText('${quotePT.replace(/'/g,"\\'")} - ${quoteAuthor}')">Copiar</button></div>
    </div>
    <div class="card biblia">
      <div class="card-label">✟ Palavra • ${biblia.ref} • NVI</div>
      <div class="card-text">"${biblia.text}"</div>
      <div class="card-meta">${biblia.ref}</div>
      <div class="card-actions"><button class="mini-btn" onclick="navigator.clipboard.writeText('${biblia.text.replace(/'/g,"\\'")} (${biblia.ref})')">Copiar versículo</button><button class="mini-btn" onclick="handleQuery('${topico.pt}')">Novo sobre ${topico.pt}</button></div>
    </div>
  `;
  results.scrollIntoView({behavior:'smooth', block:'start'});
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
      buscarBiblia(topico.biblia)
    ]);
    addTyping('Traduzindo sabedoria...');
    const [advicePT, quotePT] = await Promise.all([
      traduzir(conselhos.advice),
      traduzir(conselhos.quote.content)
    ]);
    renderResults(topico, advicePT, quotePT, conselhos.quote.author, bibliaRaw, conselhos.advice, conselhos.quote.content);
  }catch(e){
    renderResults({pt:topico.pt}, "Descanse sem culpa. Você não é uma máquina.", "Quase tudo volta a funcionar se você tirar da tomada.", "Anne Lamott", {text:"Entrega o teu caminho ao Senhor; confia nele, e ele o fará.", ref:"Salmos 37:5"}, "Rest", "Rest");
  }
}

sendBtn.onclick = () => handleQuery(input.value);
input.addEventListener('keydown', e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleQuery(input.value);} });
input.addEventListener('input', ()=>{ input.style.height='auto'; input.style.height=Math.min(input.scrollHeight, 110)+'px'; });
document.querySelectorAll('.sugg').forEach(b=> b.addEventListener('click', ()=> handleQuery(b.dataset.q)));
window.handleQuery = handleQuery;

if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js'); }

