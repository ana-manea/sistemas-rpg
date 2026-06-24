import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { clanDetails, disciplineDetails, predators } from '../data/reference.js';

const titles = {
  clas: 'Clãs',
  disciplinas: 'Disciplinas',
  regras: 'Regras',
  predadores: 'Tipos de Predadores',
  vantagens: 'Vantagens e Defeitos'
};

const genericItems = {
  predadores: predators.map((name) => ({ name, summary: `Resumo de referência para ${name}.`, slug: name.toLowerCase().replaceAll(' ', '-') })),
  regras: ['Conceitos', 'Criação de Personagens', 'Testes', 'Conflitos', 'Experiência', 'Humanidade', 'Fome', 'Sangue'].map((name) => ({ name, summary: `Texto introdutório para ${name}.`, slug: name.toLowerCase().replaceAll(' ', '-') })),
  vantagens: ['Vantagens', 'Defeitos', 'Máscaras', 'Recursos', 'Contatos', 'Aliados', 'Inimigos'].map((name) => ({ name, summary: `Texto introdutório para ${name}.`, slug: name.toLowerCase().replaceAll(' ', '-') }))
};

function getReferenceList(section) {
  if (section === 'clas') return clanDetails;
  if (section === 'disciplinas') return disciplineDetails;
  return genericItems[section] || genericItems.regras;
}

export default function ReferencePage() {
  const { section, slug } = useParams();
  const list = getReferenceList(section);
  const selected = slug ? list.find((item) => item.slug === slug) : null;

  if (selected) {
    return (
      <section className="card reference-detail">
        <Link className="back-link" to={`/consulta/${section}`}>← Voltar para {titles[section] || 'consulta'}</Link>
        <p className="eyebrow">Página de consulta</p>
        <h1>{selected.name}</h1>
        <p className="lead">{selected.summary}</p>

        {(selected.sections || []).map((block) => (
          <article className="detail-block" key={block.title}>
            <h2>{block.title}</h2>
            <p>{block.text}</p>
          </article>
        ))}
      </section>
    );
  }

  return (
    <section className="card">
      <p className="eyebrow">Página de consulta</p>
      <h1>{titles[section] || 'Consulta'}</h1>
      <p>Os cards mostram um resumo. Clique em um card para abrir a página completa e editar os textos depois.</p>

      <div className="grid reference-grid">
        {list.map((item) => (
          <Link className="mini reference-card" key={item.name} to={`/consulta/${section}/${item.slug}`}>
            <h2>{item.name}</h2>
            <p>{item.summary}</p>
            <span>Ver detalhes →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
