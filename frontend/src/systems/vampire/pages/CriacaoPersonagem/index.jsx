import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function CriacaoPersonagem() {
  return <VampireArticle article={content} title={`Criação de Personagens | Vampiro: A Máscara`} menuLabel={`Criação de Personagens`} />;
}
