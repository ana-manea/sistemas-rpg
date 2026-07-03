import React from 'react';
import { Link } from 'react-router-dom';

export default function VampireArticle({ article, title, menuLabel }) {
  if (!article) {
    return (
      <article className="card article-page construction-page">
        <p className="eyebrow">Vampiro: A Máscara 5ª Edição</p>
        <h1>{menuLabel || title || 'Página em construção'}</h1>
        <p className="construction-message">Em construção 🔨⚠️</p>
        <p>Esta página já está na estrutura do sistema e poderá receber conteúdo quando estiver pronta.</p>
        <Link className="primary inline-action" to="/vampiro-5e">Voltar ao início de Vampiro</Link>
      </article>
    );
  }

  return (
    <article className="card article-page vampire-article">
      <p className="eyebrow">Vampiro: A Máscara 5ª Edição</p>
      <h1>{article.title}</h1>
      {article.description && <p className="article-description">{article.description}</p>}
      <div className="article-content" dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
  );
}
