import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function Sociedade() {
  return <VampireArticle article={content} title={`A Sociedade dos Membros | Vampiro: A Máscara`} menuLabel={`A Sociedade dos Membros`} />;
}
