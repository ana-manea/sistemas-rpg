import React from 'react';
import { Link } from 'react-router-dom';

export default function VampireConstructionPage({ page }) {
  return (
    <article className="card article-page construction-page">
      <p className="eyebrow">Vampiro: A Máscara 5ª Edição</p>
      <h1>{page?.menuLabel || page?.title || 'Página em construção'}</h1>
      <p className="construction-message">Em construção 🔨⚠️</p>
      <Link className="primary inline-action" to="/vampiro-5e">Voltar ao início de Vampiro</Link>
    </article>
  );
}
