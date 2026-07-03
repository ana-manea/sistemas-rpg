import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Vampiros() {
  return <VampireArticle article={content} title={`Vampiros | Vampiro: A Máscara`} menuLabel={`Vampiros`} />;
}
