import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import Layout from './components/Layout/index.js';
import Home from './pages/portal/Home.jsx';
import Login from './pages/portal/Login.jsx';
import Cadastro from './pages/portal/Cadastro.jsx';
import Dashboard from './pages/portal/Dashboard.jsx';
import CharacterForm from './pages/portal/CharacterForm.jsx';
import CharacterView from './pages/portal/CharacterView.jsx';
import SystemPage from './systems/shared/SystemPage.jsx';
import RecuperarSenha from './pages/portal/RecuperarSenha.jsx';
import RedefinirSenha from './pages/portal/RedefinirSenha.jsx';
import { api } from './services/api.js';
import { contentSystems } from './systems/index.js';

function Private({ children }) { return localStorage.getItem('token') ? children : <Navigate to="/login" />; }

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  useEffect(() => { if (localStorage.getItem('token')) api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => localStorage.clear()); }, []);

  const systemRoutes = contentSystems.flatMap(system =>
    system.pages
      .map(page => <Route key={`${system.id}-${page.id}`} path={page.path} element={<SystemPage systemId={system.id} page={page} />} />)
  );

  return <BrowserRouter><Layout user={user} setUser={setUser}><Routes>
    <Route path="/" element={<Home />} />
    {systemRoutes}
    <Route path="/dnd/ficha" element={<Private><Navigate to="/fichas/nova/dnd" replace /></Private>} />
    <Route path="/login" element={<Login setUser={setUser} />} />
    <Route path="/cadastro" element={<Cadastro setUser={setUser} />} />
    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
    <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
    <Route path="/fichas/nova" element={<Private><CharacterForm /></Private>} />
    <Route path="/fichas/nova/:systemId" element={<Private><CharacterForm /></Private>} />
    <Route path="/fichas/:id" element={<Private><CharacterView /></Private>} />
    <Route path="/fichas/:id/editar" element={<Private><CharacterForm /></Private>} />
  </Routes></Layout></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
