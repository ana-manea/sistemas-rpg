import React from 'react';
import { Link } from 'react-router-dom';

export default function ConstructionPage({ page }) {
  return <article className="dnd-article-page construction-page">
    <div className="dnd-article-heading">
      <p className="eyebrow">Dungeons & Dragons 5e</p>
      <h1>{page?.menuLabel || page?.title || 'Página em construção'}</h1>
    </div>
    <p className="construction-message">em construção 🔨⚠️</p>
    <p>Esta página já está criada na estrutura de D&D 5e e será preenchida quando o conteúdo estiver pronto.</p>
    <Link className="primary inline-action" to="/dnd">Voltar ao início de D&D</Link>
  </article>;
}
