import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Anarquistas() {
  return <VampireArticle article={content} title={`Anarquistas | Vampiro: A Máscara`} menuLabel={`Anarquistas`} />;
}
