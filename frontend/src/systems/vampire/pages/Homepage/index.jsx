import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Homepage() {
  return <VampireArticle article={content} title={`Vampiro: A Máscara 5ª Edição`} menuLabel={`Homepage V5`} />;
}
