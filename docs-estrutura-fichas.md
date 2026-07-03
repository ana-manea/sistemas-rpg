# Ajustes nas fichas

## Corrigido

- A exportação de Vampiro agora mantém apenas o template padrão `multiversos`.
- O template de Vampiro foi substituído por uma versão PDF não editável de 2 páginas.
- A exportação não adiciona mais página extra de resumo, evitando o terceiro PDF com texto solto.
- O exportador agora preenche o template por sobreposição controlada, sem imprimir valores como `0/5` em cima dos círculos.
- A visualização da ficha no navegador ficou legível e usa tema visual por clã.
- O formulário e a visualização aceitam temas de clã via variáveis CSS.
- O backend deixou de salvar `attributes`, `skills` e `savingThrows` como `{ type: {} }`.
- O controller sanitiza fichas antigas e novas antes de salvar/atualizar.
- O frontend também normaliza fichas antigas que já tenham vindo do banco como `{ type: {} }`.

## Observação sobre fichas antigas

Fichas já existentes no banco com o formato antigo ainda serão lidas corretamente pelo frontend. Ao editar e salvar novamente, elas passam a ser persistidas no formato limpo.

Formato correto:

```json
"attributes": {
  "força": 2,
  "destreza": 3
}
```

Formato antigo que foi corrigido:

```json
"attributes": {
  "type": {}
}
```
