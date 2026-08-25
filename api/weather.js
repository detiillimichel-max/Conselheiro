// Conselheiro — Clima público
// Open-Meteo. Sem chave para uso não comercial/protótipos.

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

async function buscarClima(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  try {
    const params = new URLSearchParams({
      latitude,
      longitude,
      current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
      timezone: 'auto'
    });
    const r = await fetch(`${WEATHER_API}?${params}`);
    if (!r.ok) return null;
    const d = await r.json();
    return {
      temperatura: d.current?.temperature_2m ?? null,
      sensacao: d.current?.apparent_temperature ?? null,
      codigo: d.current?.weather_code ?? null,
      vento: d.current?.wind_speed_10m ?? null,
      unidade: d.current_units || {},
      timezone: d.timezone || null
    };
  } catch (e) {
    return null;
  }
}

window.ConselheiroAPI = window.ConselheiroAPI || {};
window.ConselheiroAPI.weather = { buscarClima };
