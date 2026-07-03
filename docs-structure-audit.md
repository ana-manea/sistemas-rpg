# Auditoria e refatoração do módulo de fichas

## Correções aplicadas

- Corrigido o módulo de criação, visualização e exportação de fichas.
- O formulário agora segue a estrutura completa das fichas oficiais de Vampiro: A Máscara 5e e D&D 5e.
- O model `CharacterSheet` foi expandido para salvar todos os campos importantes dos dois sistemas.
- O formulário foi preparado para expansão por sistema usando `frontend/src/utils/characterSchema.js`.
- A visualização da ficha passou a renderizar todos os campos salvos, com layout próprio por sistema.
- A exportação de PDF passou a usar templates oficiais por sistema, preservando o PDF original como base.
- A ficha completa de Vampiro foi normalizada para carregar corretamente no `pdf-lib`.
- Templates personalizados enviados pelo usuário continuam aceitos; quando não possuem mapeamento, o sistema adiciona um resumo e anexa os dados completos.
- O backend está em `backend/src/...` e o model foi preparado com `details` e `templatePreferences` para sistemas futuros.

## Arquitetura aplicada

- Campos e estrutura dos sistemas ficam centralizados em `frontend/src/utils/characterSchema.js`.
- Exportação de PDFs fica em `frontend/src/utils/pdfExport.js`.
- Dados de regras/listas continuam em `frontend/src/data/reference.js`.
- Cada novo sistema pode adicionar uma nova configuração de ficha sem alterar a estrutura principal.

## Validações

- Build do frontend validado com `npm run build`.
- Sintaxe do backend validada com `node --check`.
- Templates PDF testados para carregamento com `pdf-lib`:
  - Vampiro Multiversos: 2 páginas.
  - Vampiro Ornamental: 2 páginas.
  - Vampiro Completa: 6 páginas.
  - D&D Oficial: 3 páginas.

## Observação importante

A exportação dos PDFs oficiais usa coordenadas de sobreposição. Ela preserva o template e insere as informações principais nas áreas correspondentes. Para precisão perfeita em todos os campos, o próximo passo ideal é criar um editor visual de mapeamento de campos para templates personalizados.
