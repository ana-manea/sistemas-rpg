import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function SistemaAvancado() {
  return <VampireArticle article={content} title={`Sistemas Avançados | Vampiro: A Máscara`} menuLabel={`Sistemas Avançados`} />;
}
