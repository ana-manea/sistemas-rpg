import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Cidades() {
  return <VampireArticle article={content} title={`Cidades | Vampiro: A Máscara`} menuLabel={`Cidades`} />;
}
