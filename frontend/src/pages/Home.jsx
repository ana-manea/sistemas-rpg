import React from "react";
import { Link } from 'react-router-dom';
export default function Home() {
  return <section className="hero card">
    <p className="eyebrow">Vampiro • 5ª edição • fichas online</p>
    <h1>Arquivo da Máscara</h1>
    <p>Um site escuro, simples e organizado para consultar páginas de referência e criar várias fichas de personagem com login.</p>
    <div className="actions"><Link className="primary" to="/cadastro">Criar conta</Link><Link to="/consulta/clas">Ver páginas</Link></div>
  </section>;
}
