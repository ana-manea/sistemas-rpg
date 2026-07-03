import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Regras() {
  return <VampireArticle article={content} title={`Regras | Vampiro: A Máscara`} menuLabel={`Regras`} />;
}
