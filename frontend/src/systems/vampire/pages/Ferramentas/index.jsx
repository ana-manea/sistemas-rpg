import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Ferramentas() {
  return <VampireArticle article={content} title={`Ferramentas | Vampiro: A Máscara`} menuLabel={`Ferramentas`} />;
}
