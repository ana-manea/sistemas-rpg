import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      nav('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Erro ao entrar.');
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h1>Entrar</h1>
      {msg && <p className="error">{msg}</p>}
      <input placeholder="E-mail" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Senha" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="primary">Entrar</button>
      <p><Link to="/recuperar-senha">Esqueci minha senha</Link></p>
      <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </form>
  );
}
