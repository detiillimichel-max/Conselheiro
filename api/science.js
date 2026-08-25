// Conselheiro — Ciência / espaço
// NASA APOD com DEMO_KEY. Não é uma chave privada do projeto.
// Para uso maior, trocar por NASA_API_KEY via backend/Secrets.

const NASA_API = 'https://api.nasa.gov/planetary/apod';

async function buscarCiencia(data = '') {
  try {
    const params = new URLSearchParams({ api_key: 'DEMO_KEY' });
    if (data) params.set('date', data);
    const r = await fetch(`${NASA_API}?${params}`);
    if (!r.ok) return null;
    const d = await r.json();
    return {
      titulo: d.title || '',
      explicacao: d.explanation || '',
      imagem: d.url || null,
      hd: d.hdurl || null,
      data: d.date || null,
      tipo: d.media_type || null,
      fonte: d.url || null
    };
  } catch (e) {
    return null;
  }
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.science = { buscarCiencia };
