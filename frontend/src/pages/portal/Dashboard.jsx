import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';

const systemLabels = {
  vampire: 'Vampiro: A Máscara 5e',
  dnd: 'D&D 5e',
};

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [systemFilter, setSystemFilter] = useState('all');

  useEffect(() => {
    api.get('/characters').then(r => setItems(r.data));
  }, []);

  async function del(id) {
    if (!confirm('Excluir esta ficha?')) return;
    await api.delete('/characters/' + id);
    setItems(items.filter(i => i._id !== id));
  }

  const filteredItems = useMemo(() => {
    if (systemFilter === 'all') return items;
    return items.filter(item => (item.system || 'vampire') === systemFilter);
  }, [items, systemFilter]);

  const counts = items.reduce((acc, item) => {
    const system = item.system || 'vampire';
    acc[system] = (acc[system] || 0) + 1;
    return acc;
  }, {});

  return <section className="dashboard-page">
    <div className="section-title">
      <div>
        <p className="eyebrow">Área do usuário</p>
        <h1>Dashboard de fichas</h1>
        <p className="muted-text">Gerencie todas as suas fichas em um só lugar, independente do sistema escolhido.</p>
      </div>
      <div className="new-sheet-selector">
        <button className="primary" type="button">Nova ficha</button>
        <div className="new-sheet-menu" aria-label="Escolha o sistema da nova ficha">
          <Link to="/fichas/nova/vampire">Vampiro: A Máscara 5e</Link>
          <Link to="/fichas/nova/dnd">D&D 5e</Link>
        </div>
      </div>
    </div>

    <div className="dashboard-toolbar card">
      <button type="button" className={systemFilter === 'all' ? 'filter-active' : ''} onClick={() => setSystemFilter('all')}>Todas ({items.length})</button>
      <button type="button" className={systemFilter === 'vampire' ? 'filter-active' : ''} onClick={() => setSystemFilter('vampire')}>Vampiro ({counts.vampire || 0})</button>
      <button type="button" className={systemFilter === 'dnd' ? 'filter-active' : ''} onClick={() => setSystemFilter('dnd')}>D&D ({counts.dnd || 0})</button>
    </div>

    <div className="grid">
      {filteredItems.map(c => <article className="card" key={c._id}>
        <span className="system-badge">{systemLabels[c.system || 'vampire'] || c.system}</span>
        <h2>{c.name}</h2>
        {c.system === 'dnd'
          ? <p>{c.characterClass || 'Classe não definida'} • {c.race || 'Raça não definida'} • Nível {c.level || 1}</p>
          : <p>{c.clan || 'Sem clã'} • {c.predator || 'Sem predador'}</p>}
        <p>{c.concept}</p>
        <div className="actions">
          <Link to={`/fichas/${c._id}`}>Ver</Link>
          <Link to={`/fichas/${c._id}/editar`}>Editar</Link>
          <button onClick={() => del(c._id)}>Excluir</button>
        </div>
      </article>)}
      {filteredItems.length === 0 && <p className="card">Nenhuma ficha encontrada para este filtro.</p>}
    </div>
  </section>;
}
