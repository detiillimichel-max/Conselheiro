// Conselheiro — Notícias públicas
// Hacker News Firebase API. Sem chave.
// Foco inicial: tecnologia, ciência e startups.

const NEWS_API = 'https://hacker-news.firebaseio.com/v0';

async function buscarNoticias(limite = 8) {
  try {
    const r = await fetch(`${NEWS_API}/topstories.json`);
    if (!r.ok) return [];
    const ids = await r.json();
    const selecionados = (ids || []).slice(0, Math.min(limite, 10));
    const items = await Promise.all(selecionados.map(async id => {
      try {
        const item = await fetch(`${NEWS_API}/item/${id}.json`);
        return item.ok ? await item.json() : null;
      } catch (e) {
        return null;
      }
    }));
    return items.filter(Boolean).map(item => ({
      id: item.id,
      titulo: item.title || '',
      url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
      autor: item.by || null,
      pontos: item.score || 0,
      comentarios: item.descendants || 0,
      data: item.time ? new Date(item.time * 1000).toISOString() : null
    }));
  } catch (e) {
    return [];
  }
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.news = { buscarNoticias };
