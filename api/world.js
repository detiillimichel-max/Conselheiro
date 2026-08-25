// Conselheiro — Mundo / países
// REST Countries v3.1: endpoint público, sem chave.
// Se a API mudar novamente, este módulo pode ser substituído sem tocar no app.

const WORLD_API = 'https://restcountries.com/v3.1';

async function buscarPais(nome) {
  if (!nome || !nome.trim()) return [];
  try {
    const q = encodeURIComponent(nome.trim());
    const r = await fetch(`${WORLD_API}/translation/${q}`);
    if (!r.ok) return [];
    const data = await r.json();
    return (Array.isArray(data) ? data : []).map(p => ({
      nome: p.name?.common || '',
      oficial: p.name?.official || '',
      capital: p.capital?.[0] || null,
      regiao: p.region || null,
      subregiao: p.subregion || null,
      populacao: p.population || null,
      moedas: p.currencies || {},
      idiomas: p.languages || {},
      bandeira: p.flags?.svg || p.flags?.png || null
    }));
  } catch (e) {
    return [];
  }
}

async function listarPaises(regiao = null) {
  try {
    const url = regiao ? `${WORLD_API}/region/${encodeURIComponent(regiao)}` : `${WORLD_API}/all`;
    const r = await fetch(url);
    if (!r.ok) return [];
    const data = await r.json();
    return (Array.isArray(data) ? data : []).map(p => ({
      nome: p.name?.common || '',
      capital: p.capital?.[0] || null,
      regiao: p.region || null,
      bandeira: p.flags?.svg || p.flags?.png || null
    }));
  } catch (e) {
    return [];
  }
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.world = { buscarPais, listarPaises };
