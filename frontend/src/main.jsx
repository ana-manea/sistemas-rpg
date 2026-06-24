import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import RecuperarSenha from './pages/RecuperarSenha.jsx';
import RedefinirSenha from './pages/RedefinirSenha.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CharacterForm from './pages/CharacterForm.jsx';
import CharacterView from './pages/CharacterView.jsx';
import ReferencePage from './pages/ReferencePage.jsx';
import { api } from './services/api.js';

function Private({ children }) { return localStorage.getItem('token') ? children : <Navigate to="/login" />; }

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  useEffect(() => { if (localStorage.getItem('token')) api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => localStorage.clear()); }, []);
  return <BrowserRouter><Layout user={user} setUser={setUser}><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login setUser={setUser} />} />
    <Route path="/cadastro" element={<Cadastro setUser={setUser} />} />
    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
    <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
    <Route path="/fichas/nova" element={<Private><CharacterForm /></Private>} />
    <Route path="/fichas/:id" element={<Private><CharacterView /></Private>} />
    <Route path="/fichas/:id/editar" element={<Private><CharacterForm /></Private>} />
    <Route path="/consulta/:section" element={<ReferencePage />} />
    <Route path="/consulta/:section/:slug" element={<ReferencePage />} />
  </Routes></Layout></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
