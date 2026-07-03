import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Camarilla() {
  return <VampireArticle article={content} title={`Camarilla | Vampiro: A Máscara`} menuLabel={`Camarilla`} />;
}
