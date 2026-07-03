import React from 'react';
import DndArticle from '../Article/index.jsx';
import content from './content.js';

export default function Monge() {
  return <DndArticle article={content} />;
}
