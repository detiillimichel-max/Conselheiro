// Conselheiro — Cultura pública
// Wikimedia Commons API. Sem chave.

const CULTURE_API = 'https://commons.wikimedia.org/w/api.php';

async function buscarCultura(termo, limite = 6) {
  if (!termo || !termo.trim()) return [];
  try {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: termo.trim(),
      gsrnamespace: '6',
      gsrlimit: String(Math.min(limite, 10)),
      prop: 'imageinfo',
      iiprop: 'url|extmetadata',
      format: 'json',
      origin: '*'
    });
    const r = await fetch(`${CULTURE_API}?${params}`);
    if (!r.ok) return [];
    const d = await r.json();
    return Object.values(d.query?.pages || {}).map(item => ({
      titulo: item.title?.replace(/^File:/, '') || '',
      url: item.imageinfo?.[0]?.url || null,
      pagina: item.imageinfo?.[0]?.descriptionurl || null,
      descricao: item.imageinfo?.[0]?.extmetadata?.ImageDescription?.value || ''
    }));
  } catch (e) {
    return [];
  }
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.culture = { buscarCultura };
