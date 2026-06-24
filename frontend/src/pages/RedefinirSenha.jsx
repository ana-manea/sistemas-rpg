import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api.js';

export default function RedefinirSenha() {
  const { token } = useParams();
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    if (password !== confirm) return setMsg('As senhas não conferem.');
    if (password.length < 6) return setMsg('A senha deve ter pelo menos 6 caracteres.');
    setLoading(true);
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { password });
      setMsg(data.message || 'Senha redefinida com sucesso.');
      setTimeout(() => nav('/login'), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h1>Nova senha</h1>
      {msg && <p className="notice">{msg}</p>}
      <input type="password" placeholder="Nova senha" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirmar nova senha" value={confirm} onChange={e => setConfirm(e.target.value)} />
      <button className="primary" disabled={loading}>{loading ? 'Salvando...' : 'Redefinir senha'}</button>
      <p><Link to="/login">Voltar para o login</Link></p>
    </form>
  );
}
