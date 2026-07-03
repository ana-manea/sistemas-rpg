import React from 'react';
import { Link } from 'react-router-dom';

export default function DndHome() {
  return <section className="dnd-page">
    <article className="dnd-article">
      <header className="dnd-title-block">
        <p className="eyebrow">Dungeons & Dragons • 5ª edição</p>
        <h1>D&D 5e</h1>
      </header>

      <h2>O que é Dungeons & Dragons?</h2>
      <p>Dungeons & Dragons é um sistema de RPG de mesa de fantasia em que jogadores criam aventureiros para explorar mundos fictícios, enfrentar monstros, resolver desafios e viver campanhas guiadas por um Mestre do Jogo.</p>
      <p>O jogo combina interpretação, imaginação, cooperação e regras. Cada personagem possui características, habilidades, classe, raça, equipamentos e uma história própria. Quando o resultado de uma ação é incerto, dados como o d20 ajudam a definir o que acontece.</p>

      <h2>Material disponível</h2>
      <p>Esta seção reúne a base inicial enviada para D&D 5e. O conteúdo fica organizado em uma lista corrida, sem cards, para funcionar como índice de consulta rápida.</p>

      <section className="dnd-list-section">
        <h3><Link to="/dnd/criacao">Criação de Personagens - D&D 5ª edição</Link></h3>
        <p>Introdução ao sistema, explicando o que é D&D, como funciona a criação de personagem, escolha de raça, classe, antecedentes, valores de habilidade, equipamentos e progressão.</p>
      </section>

      <section className="dnd-list-section">
        <h3><Link to="/dnd/monge">Como criar um Monge em D&D 5ª edição</Link></h3>
        <p>Conteúdo voltado para a classe Monge, incluindo explicação sobre chi, treinamento, características de classe, níveis e tradições monásticas.</p>
      </section>

      <section className="dnd-list-section">
        <h3><Link to="/dnd/hadria">Exemplo de ficha de um Monge</Link></h3>
        <p>Exemplo de personagem da classe Monge e raça Tiefling, com distribuição de atributos, traços raciais, características de classe e história de personagem.</p>
      </section>

    </article>
  </section>;
}
