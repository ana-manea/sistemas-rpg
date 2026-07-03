import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Disciplinas() {
  return <VampireArticle article={content} title={`Disciplinas | Vampiro: A Máscara`} menuLabel={`Disciplinas`} />;
}
