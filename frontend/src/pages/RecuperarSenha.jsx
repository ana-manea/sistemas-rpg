import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMsg(data.message || 'Verifique seu e-mail para redefinir sua senha.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Erro ao solicitar recuperação de senha.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h1>Recuperar senha</h1>
      <p>Informe o e-mail cadastrado. Enviaremos um link para redefinir sua senha.</p>
      {msg && <p className="notice">{msg}</p>}
      <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      <button className="primary" disabled={loading}>{loading ? 'Enviando...' : 'Enviar link'}</button>
      <p><Link to="/login">Voltar para o login</Link></p>
    </form>
  );
}
