# Organização das páginas

As páginas de conteúdo agora ficam dentro da própria pasta da página, e não mais em um arquivo central `content/articles.js`.

## Vampiro

Exemplo:

```txt
frontend/src/systems/vampire/pages/Conceitos/
  index.jsx
  content.js
```

Cada `index.jsx` importa seu próprio `content.js` e usa o componente compartilhado `pages/Article` apenas para renderização visual.

O diretório antigo abaixo foi removido:

```txt
frontend/src/systems/vampire/content/
```

A página antiga `ReferencePage.jsx` também foi removida.

## D&D

As páginas que antes eram servidas de `frontend/public/dnd/*.html` agora ficam na estrutura do sistema:

```txt
frontend/src/systems/dnd/pages/CriacaoPersonagens/
  index.jsx
  content.js

frontend/src/systems/dnd/pages/Monge/
  index.jsx
  content.js

frontend/src/systems/dnd/pages/ExemploHadria/
  index.jsx
  content.js
```

O diretório `frontend/public/dnd/` foi removido para evitar duplicidade.

## Validação

- Build do frontend validado com `npm run build`.
- Sintaxe do backend validada com `node --check`.
