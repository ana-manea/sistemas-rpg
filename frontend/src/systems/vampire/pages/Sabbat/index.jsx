import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Sabbat() {
  return <VampireArticle article={content} title={`Sabá | Vampiro: A Máscara`} menuLabel={`Sabá`} />;
}
