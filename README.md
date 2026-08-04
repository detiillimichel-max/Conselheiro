# Conselheiro
.

📁 Estrutura final
conselheiro-final/
├── index.html
├── css/style.css   <- CSS melhorado Copilot style
├── js/app.js       <- 3 APIs + tradução
├── manifest.json
├── sw.js
└── README.md
🔌 3 APIs Públicas
Advice Slip - GET https://api.adviceslip.com/advice/search/{en}
Quotable - GET https://api.quotable.io/search/quotes?query={en}
Bíblia Digital - POST https://www.abibliadigital.com.br/api/verses/search
Body: {version:"nvi", search:"amor"}
Fallback: GET https://www.abibliadigital.com.br/api/verses/nvi/random
Sem API key, 20 req/hora no free.
🎨 CSS Melhorado
Fundo #0B0F1A com radial-gradient glow
Cards com gradiente e borda #2A3852
Fonte Fraunces 20px para frases
Animações fadeUp + typing dots
Input pill 56px como no print
Bottom nav pill igual Copilot
🚀 GitHub Pages
Mantenha pastas css/ e js/. Ative Pages em Settings > Pages > main / root.

Como funciona o motor invisível
Usuário digita em PT: "estou ansioso"
→ detecta: ansiedade → anxiety
→ busca: advice/search/anxiety + quotable/search/anxiety + biblia/search ansiedade
→ traduz EN→PT com MyMemory
→ exibe 3 cards: Conselho, Reflexão, Palavra
