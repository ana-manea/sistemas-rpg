import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Conceitos() {
  return <VampireArticle article={content} title={`Conceitos | Vampiro: A Máscara`} menuLabel={`Conceitos`} />;
}
