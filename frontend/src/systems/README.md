# Estrutura de sistemas

Cada sistema deve ficar em sua própria pasta dentro de `frontend/src/systems/`.

## Padrão

```txt
systems/
  vampire/
    assets/
    content/
    data/
    pages/
    sheet/
    config.js
    pages.js
    routes.js
    theme.js
```

- `pages/`: componentes React normais, separados por página.
- `content/`: conteúdo textual/HTML estruturado que alimenta os componentes.
- `data/`: dados de regras, listas e referências do sistema.
- `sheet/`: componentes e dados específicos de ficha.
- `pages.js`: registro das páginas, rotas e metadados.
- `config.js`: registro geral do sistema.

Novos sistemas devem seguir o mesmo formato.
