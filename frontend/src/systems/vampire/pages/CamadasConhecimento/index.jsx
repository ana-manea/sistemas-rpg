import React from 'react';
import VampireArticle from '../Article/index.jsx';
import content from './content.js';

export default function CamadasConhecimento() {
  return <VampireArticle article={content} title={`Camadas de Conhecimento | Vampiro: A Máscara`} menuLabel={`Camadas de Conhecimento`} />;
}
