import React from 'react';

export default function DndArticle({ article }) {
  if (!article) {
    return (
      <article className="card article-page construction-page">
        <p className="eyebrow">Dungeons & Dragons 5ª Edição</p>
        <h1>Página em construção</h1>
        <p className="construction-message">Em construção 🔨⚠️</p>
      </article>
    );
  }

  return (
    <article className="card article-page dnd-article">
      <p className="eyebrow">Dungeons & Dragons 5ª Edição</p>
      <h1>{article.title}</h1>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
  );
}
