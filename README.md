# ◐ Conselheiro

**Um conselho quando você precisa.**

O Conselheiro é um amigo sábio que te escuta em português e te devolve 3 tipos de sabedoria na hora. Sem cadastro, sem propaganda, de graça.

### Para quem é?

- Para quando você está ansioso e precisa respirar
- Para quando precisa de coragem antes de uma decisão
- Para quando quer começar o dia com uma palavra boa
- Para quando o coração está apertado por amor, trabalho, família ou fé

### Como usar? É muito simples

1. Abra o app: **detiillimichel-max.github.io/Conselheiro**
2. Na caixinha embaixo, escreva do seu jeito, como se falasse com um amigo:
   - `um conselho sobre amor`
   - `estou ansioso no trabalho`
   - `preciso de fé hoje`
   - `conselho sobre dinheiro`

3. Pronto. Em 2 segundos você recebe 3 respostas:

> **✦ Conselho prático** — uma dica direta pra fazer agora
> **✧ Para refletir** — uma frase de pensadores do mundo todo
> **✟ Uma Palavra** — um versículo da Bíblia NVI que combina com o que você sente

### O que torna ele diferente?

Ele não sorteia frases aleatórias. Ele **entende** o que você escreveu (amor, ansiedade, coragem, trabalho, fé) e busca de verdade nas maiores bibliotecas de sabedoria do mundo, e te entrega tudo traduzido em português.

Você pode copiar, salvar e voltar depois. Ele funciona no celular como um app — é só clicar em "Instalar" ou "Adicionar à tela inicial".

### É de graça? Precisa de cadastro?

100% grátis. Não precisa criar conta. Não guardamos o que você escreve. Não vendemos nada. É feito para acolher.

Feito com carinho por Michel, para momentos em que a gente só precisa ouvir algo bom.

**Use agora:** detiillimichel-max.github.io/Conselheiro
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
