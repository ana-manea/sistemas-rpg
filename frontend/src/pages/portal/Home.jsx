import React from "react";
import { Link } from 'react-router-dom';
import { contentSystems } from '../../systems/index.js';

export default function Home() {
  return <section className="home-page">
    <article className="hero card home-hero">
      <p className="eyebrow">Arquivo de RPG</p>
      <h1>Biblioteca de Sistemas</h1>
      <p>RPG, ou jogo de interpretação de papéis, é uma forma de narrativa colaborativa em que cada jogador interpreta um personagem dentro de um mundo fictício. As ações são decididas pela imaginação, pela conversa entre a mesa e pelas regras do sistema escolhido.</p>
      <p>Normalmente, uma pessoa assume o papel de narrador ou mestre, descrevendo cenas, desafios e consequências. Os demais jogadores criam personagens, tomam decisões, rolam dados quando há incerteza e ajudam a construir a história.</p>
    </article>

    <article className="card systems-panel">
      <p className="eyebrow">Sistemas disponíveis</p>
      <h2>Escolha um sistema</h2>
      <p className="muted-text">O site está organizado para receber vários sistemas de RPG. Cada sistema possui tema visual, favicon, menu, páginas e fichas próprios.</p>
      <div className="systems-list">
        {contentSystems.map(system => <section className="system-row" key={system.id}>
          <div>
            <span>{system.tagline}</span>
            <h3><Link to={system.basePath}>{system.name}</Link></h3>
            <p>{system.description}</p>
          </div>
          <nav aria-label={`Acessar ${system.name}`}>
            <Link className="system-entry-link" to={system.basePath}>Acessar sistema</Link>
          </nav>
        </section>)}
      </div>
    </article>
  </section>;
}
