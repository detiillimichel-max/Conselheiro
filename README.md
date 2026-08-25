# ◐ Conselheiro

**Um conselho quando você precisa.**

O Conselheiro é um assistente conversacional em português que combina conselhos, reflexões e conteúdo de referência. A interface foi pensada para celular, com respostas em formato de conversa e o estado de resposta com três pontinhos preservado.

## 🧠 Mini IA modular

O projeto está evoluindo para uma arquitetura em que cada capacidade fica isolada em seu próprio arquivo JavaScript. O objetivo é permitir que o modo **Inteligente** escolha a fonte adequada conforme a pergunta, sem transformar o `script.js` principal em um arquivo monolítico.

### Capacidades planejadas/implementadas

| Capacidade | Módulo | API/Fonte |
|---|---|---|
| ✦ Conselheiro | `script.js` | Advice Slip + fallbacks |
| 📚 Conhecimento | `api/knowledge.js` | Wikipedia / MediaWiki API |
| 📖 Livros | `api/books.js` | Open Library |
| 🌤️ Meu dia | `api/weather.js` | Open-Meteo |
| 🌎 Mundo | `api/world.js` | REST Countries |
| 🎨 Cultura | `api/culture.js` | Wikimedia Commons |
| 🚀 Ciência | `api/science.js` | NASA APOD |
| 📰 Notícias/tecnologia | `api/news.js` | Hacker News API |
| 🧠 Seleção de capacidade | `api/router.js` | Roteador local |

As APIs modulares são uma camada adicional. O fluxo original do Conselheiro continua funcionando de forma independente.

## 🔌 APIs usadas atualmente

### Núcleo do Conselheiro

- **Advice Slip** — busca conselhos por tema.
- **DummyJSON Quotes** — fonte atual usada como substituta de Quotable quando necessário.
- **Quotable** — fallback de citações.
- **A Bíblia Digital** — busca versículos NVI, com fallback local.
- **Bible API** — fallback adicional.
- **MyMemory** — tradução EN → PT-BR.

### Novas APIs modulares

- **Wikipedia / MediaWiki API** — conhecimento geral.
- **Open Library** — descoberta de livros, autores e assuntos. A documentação recomenda identificar a aplicação e usar cache quando possível. urlOpen Library APIhttps://openlibrary.org/developers/api
- **Open-Meteo** — dados meteorológicos.
- **REST Countries** — informações estruturadas sobre países.
- **Wikimedia Commons** — conteúdo cultural e multimídia.
- **NASA APOD** — astronomia e ciência.
- **Hacker News API** — notícias e tecnologia.

> **Nota:** disponibilidade, limites, autenticação e políticas de uso podem mudar. Antes de transformar uma API em dependência crítica, o módulo deve tratar falhas e possuir fallback quando possível.

## 📁 Estrutura

```text
Conselheiro/
├── index.html
├── style.css
├── script.js
├── README.md
└── api/
    ├── knowledge.js
    ├── books.js
    ├── weather.js
    ├── world.js
    ├── culture.js
    ├── science.js
    ├── news.js
    └── router.js
```

## 💬 Como usar

1. Abra o Conselheiro.
2. Escreva a pergunta em português.
3. O núcleo identifica o tema e busca as fontes disponíveis.
4. A resposta aparece como uma conversa.
5. Os três pontinhos mostram que o Conselheiro está trabalhando enquanto consulta/traduz as fontes.

Exemplos:

- `um conselho sobre amor`
- `estou ansioso no trabalho`
- `preciso de fé hoje`
- `qual é a capital do Japão?`
- `me indique um livro sobre coragem`
- `como está o clima?`

## 🔐 Segurança

Nenhuma API key deve ser colocada diretamente no HTML ou no JavaScript público. Quando uma integração exigir segredo, a credencial deverá ficar em uma camada de backend/automação segura. APIs públicas sem segredo podem ser consumidas pelos módulos quando seus limites e políticas permitirem.

## ⚡ Cache futuro

O próximo passo de infraestrutura é avaliar cache para reduzir chamadas repetidas às APIs. Open Library, por exemplo, recomenda cache quando possível. urlOpen Library — documentação de usohttps://openlibrary.org/developers/api

Uma futura arquitetura poderá usar:

```text
Pergunta
   ↓
Router 🧠
   ↓
Módulo JS
   ↓
Cache
   ├── HIT  → resposta rápida
   └── MISS → API pública → salva cache
```

Turso é uma possibilidade futura para o cache persistente; não faz parte da dependência atual do Conselheiro.

## 🎨 Interface

- Tema escuro `#0B0F1A`
- Glow radial
- Cards/painéis com bordas suaves
- Fonte Fraunces para conteúdo de sabedoria
- Animações `fadeUp`
- Estado de resposta com **typing dots**
- Composer fixo para celular
- Ícones Lucide
- Menu para Neural IA, Vibe Mensagens e Hub de Jogos

## 🚀 GitHub Pages

O projeto é compatível com GitHub Pages. A publicação usa a branch `main` e a raiz do repositório.

**Use agora:**

`detiillimichel-max.github.io/Conselheiro/`

## 🔗 Projetos conectados

- Neural IA — `https://detiillimichel-max.github.io/-Neural-iA/`
- Vibe Mensagens — `https://vibe-mensagens.vercel.app/`
- Hub de Jogos — `https://detiillimichel-max.github.io/hubs-de-jogos/`

## 🎯 Princípio de evolução

**Adicionar capacidade sem quebrar o que já funciona.**

Novas APIs devem ser modulares, ter tratamento de erro e não alterar o comportamento do núcleo, do composer, do layout ou dos três pontinhos de resposta.
