# ◐ Conselheiro

**Um conselho quando você precisa.**

O Conselheiro é um assistente de sabedoria em português que combina fontes públicas para entregar conselho prático, reflexão e Palavra. A arquitetura está evoluindo para uma **mini IA modular**, em que cada capacidade pode ter seu próprio arquivo JavaScript.

## 🔌 APIs públicas usadas

### Núcleo atual

| API | Uso | Endpoint / documentação |
|---|---|---|
| **Advice Slip** | Conselhos práticos | `https://api.adviceslip.com/advice/search/{query}` — [documentação](https://api.adviceslip.com/) |
| **DummyJSON Quotes** | Fonte de reflexão/fallback atual | `https://dummyjson.com/quotes/random` — [documentação](https://dummyjson.com/docs/quotes) |
| **Quotable** | Fallback de frases | `https://api.quotable.io/random` — [API](https://api.quotable.io/) |
| **ABíbliaDigital** | Versículos/Bíblia | `https://www.abibliadigital.com.br/api/verses/nvi/random` — [documentação](https://abibliadigital.api.br/) |
| **MyMemory** | Tradução EN → PT | `https://api.mymemory.translated.net/get` — [API](https://mymemory.translated.net/doc/spec.php) |

O Advice Slip disponibiliza busca por termo via `GET /advice/search/{query}`. citeturn0search0 O DummyJSON disponibiliza o recurso público de quotes. citeturn0search1turn0search2 A ABíbliaDigital oferece API REST com múltiplas versões e endpoints de versículos. citeturn0search3turn0search11

### 🧠 Módulos de expansão

Cada capacidade fica isolada em seu próprio JS para facilitar manutenção e futuras integrações:

| Arquivo | Capacidade | API pública | URL base |
|---|---|---|---|
| `api/knowledge.js` | 🔎 Conhecimento | Wikipedia | `https://www.wikipedia.org/` |
| `api/books.js` | 📚 Livros | Open Library | `https://openlibrary.org/developers/api` |
| `api/weather.js` | 🌤️ Clima | Open-Meteo | `https://open-meteo.com/en/docs` |
| `api/world.js` | 🌎 Países | REST Countries | `https://restcountries.com/` |
| `api/culture.js` | 🎨 Cultura | Wikimedia Commons | `https://commons.wikimedia.org/wiki/Commons:API` |
| `api/science.js` | 🚀 Ciência | NASA APIs / APOD | `https://api.nasa.gov/` |
| `api/news.js` | 📰 Tecnologia/notícias | Hacker News API | `https://github.com/HackerNews/API` |
| `api/router.js` | 🧠 Roteamento | Motor interno | — |

> **Nota:** “API pública” não significa necessariamente “sem limite” ou “sem necessidade de chave”. Cada módulo deve respeitar sua documentação, limites, CORS e requisitos de autenticação antes de ser ativado no frontend.

## 🧩 Arquitetura modular

```text
Conselheiro/
├── index.html
├── style.css
├── script.js
│
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

O `script.js` continua sendo o núcleo do Conselheiro atual. Os módulos `api/*.js` são uma camada adicional para transformar o aplicativo gradualmente em uma mini IA capaz de escolher fontes conforme a pergunta.

## 🧠 Visão da mini IA

```text
Pergunta do usuário
        ↓
     router.js
        ↓
┌───────┼────────┬────────┐
↓       ↓        ↓        ↓
Livros  Clima    Países   Conhecimento
books   weather  world    knowledge
        ↓
   fonte especializada
        ↓
     resposta
```

Exemplos:

- “Me indique um livro sobre coragem” → `books.js`
- “Como está o tempo?” → `weather.js`
- “Quero conhecer o Japão” → `world.js`
- “Quem foi Leonardo da Vinci?” → `knowledge.js`
- “Quero saber sobre o espaço” → `science.js`

## 🔐 Segurança

Nenhuma chave privada deve ser colocada no `index.html`, `style.css` ou em módulos públicos do frontend.

Se uma API exigir segredo, a credencial deverá ficar em um ambiente seguro, como **GitHub Secrets**, e ser usada por um processo server-side/automação apropriado. O GitHub Pages continua sendo a camada pública do frontend.

## ⚡ Cache — próxima evolução

A arquitetura poderá ganhar uma camada de cache para reduzir chamadas repetidas às APIs:

```text
Usuário
  ↓
Conselheiro
  ↓
Cache
  ├── HIT  → resposta rápida
  └── MISS → API pública → salva cache → resposta
```

Turso é uma possibilidade futura para o cache persistente. O cache não substitui os módulos de API; ele fica entre o roteador e as fontes externas.

## ✨ Experiência atual

- Interface mobile-first em estilo Copilot
- Conversa em formato de mensagens
- Composer fixo na parte inferior
- Ícones Lucide
- Animação de **três pontinhos** durante a busca/tradução
- Conselho prático
- Reflexão
- Palavra
- Tradução para português
- Fallbacks locais quando uma fonte externa falha

**Regra de evolução:** adicionar capacidade sem quebrar o que já funciona.

## 🔗 Ecossistema

- [Neural IA](https://detiillimichel-max.github.io/-Neural-iA/)
- [Vibe Mensagens](https://vibe-mensagens.vercel.app/)
- [Hub de Jogos](https://detiillimichel-max.github.io/hubs-de-jogos/)

## 🚀 GitHub Pages

O projeto roda como site estático no GitHub Pages.

**Uso:** `https://detiillimichel-max.github.io/Conselheiro/`

## ❤️ Projeto

Feito para ser simples, útil e acolhedor — e para crescer gradualmente de um conselheiro de três fontes para uma pequena IA modular de ferramentas públicas.