// Conselheiro — Livros públicos
// Open Library Search API. Sem chave; uso de baixa frequência e cache recomendado.

const BOOKS_API = 'https://openlibrary.org/search.json';

async function buscarLivros(termo, limite = 6) {
  if (!termo || !termo.trim()) return [];
  try {
    const q = encodeURIComponent(termo.trim());
    const r = await fetch(`${BOOKS_API}?q=${q}&limit=${Math.min(limite, 10)}&fields=key,title,author_name,first_publish_year,cover_i`);
    if (!r.ok) return [];
    const d = await r.json();
    return (d.docs || []).map(b => ({
      id: b.key || null,
      titulo: b.title || 'Sem título',
      autores: b.author_name || [],
      ano: b.first_publish_year || null,
      capa: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : null
    }));
  } catch (e) {
    return [];
  }
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.books = { buscarLivros };
