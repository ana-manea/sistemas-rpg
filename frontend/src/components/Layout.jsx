import React from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Layout({ children, user, setUser }) {
  const navigate = useNavigate();
  function logout() { localStorage.clear(); setUser(null); navigate('/'); }
  return <>
    <header className="topbar">
      <Link className="brand" to="/">Arquivo da Máscara</Link>
      <nav>
        <NavLink to="/consulta/clas">Clãs</NavLink>
        <NavLink to="/consulta/disciplinas">Disciplinas</NavLink>
        <NavLink to="/consulta/regras">Regras</NavLink>
        {user ? <><NavLink to="/dashboard">Minhas fichas</NavLink><button onClick={logout}>Sair</button></> : <><NavLink to="/login">Login</NavLink><NavLink to="/cadastro">Cadastro</NavLink></>}
      </nav>
    </header>
    <main className="page">{children}</main>
    <footer>Projeto de recriação com conteúdo editável. Adicione seus textos nas páginas de consulta.</footer>
  </>;
}
