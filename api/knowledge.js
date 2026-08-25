// Conselheiro — Conhecimento público
// Wikipedia REST API. Sem chave.

const KNOWLEDGE_API = 'https://pt.wikipedia.org/api/rest_v1';

async function buscarWikipedia(termo) {
  if (!termo || !termo.trim()) return null;
  try {
    const q = encodeURIComponent(termo.trim());
    const r = await fetch(`${KNOWLEDGE_API}/page/summary/${q}`);
    if (!r.ok) return null;
    const d = await r.json();
    return {
      titulo: d.title || termo,
      resumo: d.extract || '',
      url: d.content_urls?.desktop?.page || null,
      imagem: d.thumbnail?.source || null
    };
  } catch (e) {
    return null;
  }
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.knowledge = { buscarWikipedia };
