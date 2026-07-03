import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DotInput from '../../components/DotInput/index.js';
import { api } from '../../services/api.js';
import { getClanTheme } from '../../systems/vampire/data/clanThemes.js';
import { clanDisciplines, dndClassDefaults, dndRaceDefaults, predatorDefaults } from '../../data/reference.js';
import { ensureFullCharacter, fieldValue, getDefaultCharacter, getSchema, setNestedValue } from '../../utils/characterSchema.js';

function mergeDots(base = {}, bonus = {}) {
  const next = { ...base };
  Object.entries(bonus || {}).forEach(([key, value]) => {
    next[key] = Math.min(10, Math.max(Number(next[key] || 0), Number(next[key] || 0) + Number(value || 0)));
  });
  return next;
}

function replaceDotsBonus(base = {}, previousBonus = {}, nextBonus = {}) {
  const next = { ...(base || {}) };
  Object.entries(previousBonus || {}).forEach(([key, value]) => {
    next[key] = Math.max(0, Number(next[key] || 0) - Number(value || 0));
  });
  Object.entries(nextBonus || {}).forEach(([key, value]) => {
    next[key] = Math.min(10, Math.max(0, Number(next[key] || 0) + Number(value || 0)));
  });
  return next;
}

function removePredatorNotes(notes = '') {
  const predatorNotes = new Set(Object.values(predatorDefaults).map(item => item.note).filter(Boolean));
  return String(notes || '')
    .split(/\r?\n/)
    .filter(line => {
      const text = line.trim();
      return text && !predatorNotes.has(text);
    })
    .join('\n');
}

function buildAutoDisciplines(clan, predator) {
  const rows = [];
  (clanDisciplines[clan] || []).forEach(name => rows.push({ name, level: 0, powers: [], notes: 'Disciplina do clã', source: 'auto-clan' }));
  const selectedPredatorDiscipline = predatorDefaults[predator]?.disciplines?.[0];
  if (selectedPredatorDiscipline) {
    const existing = rows.find(item => item.name === selectedPredatorDiscipline);
    if (existing) {
      existing.level = Math.max(Number(existing.level || 0), 1);
      existing.powers = Array.from({ length: existing.level }, (_, index) => existing.powers?.[index] || '');
      existing.notes = 'Disciplina do clã e do predador';
      existing.source = 'auto-both';
    } else {
      rows.push({ name: selectedPredatorDiscipline, level: 1, powers: [''], notes: 'Disciplina do predador', source: 'auto-predator' });
    }
  }
  return rows;
}

function mergeAutoDisciplines(current = [], clan, predator) {
  const manual = (current || []).filter(item => item?.source === 'manual' || item?.source === 'legacy');
  return [...buildAutoDisciplines(clan, predator), ...manual];
}

function SheetField({ field, form, setValue }) {
  const value = fieldValue(form, field.name);
  const common = {
    value: value ?? '',
    required: field.required || false,
    placeholder: field.label,
    onChange: e => setValue(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value),
  };
  if (field.type === 'textarea') return <label className="sheet-field sheet-field-wide"><span>{field.label}</span><textarea {...common} /> </label>;
  if (field.type === 'select') return <label className="sheet-field"><span>{field.label}</span><select {...common}><option value="">Selecione</option>{(field.options || []).map(option => <option key={option} value={option}>{option}</option>)}</select></label>;
  if (field.type === 'number') return <label className="sheet-field"><span>{field.label}</span><input {...common} type="number" min={field.min ?? undefined} max={field.max ?? undefined} /></label>;
  return <label className="sheet-field"><span>{field.label}</span><input {...common} type="text" /></label>;
}

function FieldsSection({ title, fields, form, setValue }) {
  if (!fields?.length) return null;
  return <section className="sheet-section official-section"><h2>{title}</h2><div className="official-field-grid">{fields.map(field => <SheetField key={field.name} field={field} form={form} setValue={setValue} />)}</div></section>;
}

function DotGroupSection({ title, groups, values, onChange, max = 5 }) {
  return <section className="sheet-section official-section"><h2>{title}</h2><div className="official-dot-columns">{groups.map(group => <div key={group.title} className="official-dot-group"><h3>{group.title}</h3>{group.keys.map(key => <DotInput key={key} label={key} value={values?.[key] || 0} max={max} onChange={v => onChange(key, v)} />)}</div>)}</div></section>;
}

function StructuredListSection({ title, field, items = [], setItems, labels = { name: 'Nome', value: 'Pontos', notes: 'Observações' } }) {
  function update(index, key, value) {
    setItems(field, items.map((item, i) => i === index ? { ...item, [key]: key === 'value' ? Number(value) : value } : item));
  }
  function add() { setItems(field, [...items, { name: '', value: 0, notes: '' }]); }
  function remove(index) { setItems(field, items.filter((_, i) => i !== index)); }
  return <section className="sheet-section official-section"><h2>{title}</h2><div className="structured-list">{items.map((item, index) => <div className="structured-row" key={`${field}-${index}`}><input value={item.name || ''} placeholder={labels.name} onChange={e => update(index, 'name', e.target.value)} /><input type="number" min="0" max="10" value={item.value || 0} placeholder={labels.value} onChange={e => update(index, 'value', e.target.value)} /><input value={item.notes || ''} placeholder={labels.notes} onChange={e => update(index, 'notes', e.target.value)} /><button type="button" className="ghost danger" onClick={() => remove(index)}>Remover</button></div>)}</div><button type="button" className="ghost" onClick={add}>Adicionar</button></section>;
}

function DisciplineSection({ form, schema, updateDiscipline, addDisciplineRow, removeDisciplineRow }) {
  return <section className="sheet-section official-section"><h2>Disciplinas</h2><div className="discipline-list discipline-list-expanded">{(form.disciplines || []).map((item, index) => {
    const isAuto = item.source && item.source !== 'manual' && item.source !== 'legacy';
    const level = Math.max(0, Math.min(5, Number(item.level || 0)));
    return <div className="discipline-card" key={`${index}-${item.source || 'manual'}-${item.name || 'nova'}`}>
      <div className="discipline-row discipline-row-main">
        <select value={item.name || ''} onChange={e => updateDiscipline(index, 'name', e.target.value)} disabled={isAuto}>
          <option value="">Disciplina</option>{schema.disciplineOptions.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <select value={level} onChange={e => updateDiscipline(index, 'level', e.target.value)}>{[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} ponto{n === 1 ? '' : 's'}</option>)}</select>
        <input placeholder="Origem / observações" value={item.notes || ''} onChange={e => updateDiscipline(index, 'notes', e.target.value)} />
        {isAuto ? <span className="discipline-source">Automática</span> : <button type="button" className="ghost danger" onClick={() => removeDisciplineRow(index)}>Remover</button>}
      </div>
      {level > 0 && <div className="discipline-power-grid">{Array.from({ length: level }, (_, powerIndex) => {
        const powerLevel = powerIndex + 1;
        const options = schema.disciplinePowers?.[item.name]?.[powerLevel] || [];
        return <label key={powerLevel} className="sheet-field"><span>Poder {Array.from({ length: powerLevel }, () => '•').join('')}</span><select value={item.powers?.[powerIndex] || ''} onChange={e => updateDiscipline(index, `powers.${powerIndex}`, e.target.value)}><option value="">Selecione um poder de nível {powerLevel}</option>{options.map(power => <option key={power} value={power}>{power}</option>)}<option value="custom">Outro / regra da mesa</option></select></label>;
      })}</div>}
    </div>;
  })}</div><button type="button" className="ghost" onClick={addDisciplineRow}>Adicionar disciplina</button></section>;
}

export default function CharacterForm() {
  const { id, systemId } = useParams();
  const nav = useNavigate();
  const initialSystem = systemId || 'vampire';
  const [form, setForm] = useState(() => getDefaultCharacter(initialSystem));
  const schema = useMemo(() => getSchema(form.system), [form.system]);
  const isDnd = form.system === 'dnd';
  const title = useMemo(() => id ? `Editar ficha — ${schema.label}` : `Nova ficha — ${schema.label}`, [id, schema.label]);
  const clanTheme = useMemo(() => getClanTheme(form.clan), [form.clan]);

  useEffect(() => {
    if (id) api.get('/characters/' + id).then(r => setForm(ensureFullCharacter(r.data, r.data.system || 'vampire')));
    else if (systemId) setForm(getDefaultCharacter(systemId));
  }, [id, systemId]);

  function setValue(name, value) { setForm(current => setNestedValue(current, name, value)); }
  function setDot(group, key, value) { setForm(current => ({ ...current, [group]: { ...(current[group] || {}), [key]: value } })); }
  function setList(field, items) { setForm(current => ({ ...current, [field]: items })); }
  function changeSystem(system) { setForm(current => ensureFullCharacter({ name: current.name, player: current.player, chronicle: current.chronicle }, system)); }

  function updateField(name, value) {
    if (name === 'clan') {
      setForm(current => ({ ...setNestedValue(current, name, value), disciplines: mergeAutoDisciplines(current.disciplines, value, current.predator) }));
      return;
    }
    if (name === 'predator') {
      const defaults = predatorDefaults[value];
      setForm(current => {
        const previousDefaults = predatorDefaults[current.predator];
        const cleanNotes = removePredatorNotes(current.notes);
        const next = setNestedValue(current, name, value);
        return {
          ...next,
          skills: replaceDotsBonus(current.skills, previousDefaults?.skills, defaults?.skills),
          disciplines: mergeAutoDisciplines(current.disciplines, current.clan, value),
          notes: defaults?.note ? [cleanNotes, defaults.note].filter(Boolean).join('\n') : cleanNotes,
        };
      });
      return;
    }
    if (name === 'race') {
      const defaults = dndRaceDefaults[value];
      setForm(current => ({ ...setNestedValue(current, name, value), attributes: defaults ? mergeDots(current.attributes, defaults.attributes) : current.attributes, speed: current.speed || defaults?.speed || '', features: defaults?.features && !current.features.includes(defaults.features) ? [current.features, defaults.features].filter(Boolean).join('\n') : current.features }));
      return;
    }
    if (name === 'characterClass') {
      const defaults = dndClassDefaults[value];
      setForm(current => ({ ...setNestedValue(current, name, value), attributes: defaults ? mergeDots(current.attributes, defaults.attributes) : current.attributes, hitDice: current.hitDice || defaults?.hitDie || '', hitPoints: current.hitPoints || (defaults ? `${defaults.hitDie} por nível` : ''), features: defaults?.features && !current.features.includes(defaults.features) ? [current.features, defaults.features].filter(Boolean).join('\n') : current.features }));
      return;
    }
    setValue(name, value);
  }

  function updateDiscipline(index, key, value) {
    setForm(current => ({
      ...current,
      disciplines: current.disciplines.map((item, i) => {
        if (i !== index) return item;
        if (key === 'level') {
          const level = Number(value) || 0;
          return { ...item, level, powers: Array.from({ length: level }, (_, powerIndex) => item.powers?.[powerIndex] || '') };
        }
        if (key.startsWith('powers.')) {
          const powerIndex = Number(key.split('.')[1]);
          const powers = Array.from({ length: Number(item.level || 0) }, (_, idx) => item.powers?.[idx] || '');
          powers[powerIndex] = value;
          return { ...item, powers };
        }
        if (key === 'name') return { ...item, name: value, powers: Array.from({ length: Number(item.level || 0) }, () => '') };
        return { ...item, [key]: value };
      }),
    }));
  }
  function addDisciplineRow() { setForm(current => ({ ...current, disciplines: [...(current.disciplines || []), { name: '', level: 0, powers: [], notes: '', source: 'manual' }] })); }
  function removeDisciplineRow(index) { setForm(current => ({ ...current, disciplines: current.disciplines.filter((_, i) => i !== index) })); }

  async function submit(e) {
    e.preventDefault();
    const payload = ensureFullCharacter(form, form.system);
    const { data } = id ? await api.put('/characters/' + id, payload) : await api.post('/characters', payload);
    nav('/fichas/' + data._id);
  }

  const sectionByKey = key => schema.sections.find(section => section.key === key)?.fields || [];

  return <form className={`sheet-page standard-sheet sheet-${form.system} clan-theme-${clanTheme.slug}`} style={{ '--clan-accent': clanTheme.accent, '--clan-soft': clanTheme.soft }} onSubmit={submit}>
    <div className="sheet-header"><p className="eyebrow">{schema.label}</p><h1>{title}</h1><p>A ficha foi reorganizada para funcionar como base reutilizável para vários sistemas, mantendo visualização e PDF na mesma ordem.</p></div>
    {!id && <section className="sheet-section official-section"><h2>Sistema</h2><label className="sheet-field"><span>Sistema da ficha</span><select value={form.system} onChange={e => changeSystem(e.target.value)}><option value="vampire">Vampiro: A Máscara 5e</option><option value="dnd">D&D 5e</option></select></label></section>}

    {!isDnd ? <>
      <FieldsSection title="Identidade" fields={sectionByKey('identity')} form={form} setValue={updateField} />
      <FieldsSection title="Marcadores" fields={sectionByKey('markers')} form={form} setValue={updateField} />
      <DotGroupSection title="Atributos" groups={schema.attributeGroups} values={form.attributes} onChange={(key, value) => setDot('attributes', key, value)} />
      <DotGroupSection title="Habilidades" groups={schema.skillGroups} values={form.skills} onChange={(key, value) => setDot('skills', key, value)} />
      <DisciplineSection form={form} schema={schema} updateDiscipline={updateDiscipline} addDisciplineRow={addDisciplineRow} removeDisciplineRow={removeDisciplineRow} />
      <StructuredListSection title="Antecedentes" field="backgrounds" items={form.backgrounds || []} setItems={setList} />
      <StructuredListSection title="Vantagens" field="advantages" items={form.advantages || []} setItems={setList} />
      <StructuredListSection title="Desvantagens / Defeitos" field="disadvantages" items={form.disadvantages || []} setItems={setList} />
      <StructuredListSection title="Convicções e vínculos" field="convictions" items={form.convictions || []} setItems={setList} labels={{ name: 'Convicção/Vínculo', value: 'Peso', notes: 'Descrição' }} />
      <FieldsSection title="Crônica" fields={sectionByKey('chronicle')} form={form} setValue={updateField} />
      <FieldsSection title="Biografia" fields={sectionByKey('bio')} form={form} setValue={updateField} />
      <FieldsSection title="Potência de Sangue" fields={sectionByKey('blood')} form={form} setValue={updateField} />
      <FieldsSection title="Conteúdo adicional" fields={sectionByKey('notes')} form={form} setValue={updateField} />
    </> : <>
      {schema.sections.map(section => <FieldsSection key={section.title} title={section.title} fields={section.fields} form={form} setValue={updateField} />)}
      <DotGroupSection title="Atributos" groups={schema.attributeGroups} values={form.attributes} onChange={(key, value) => setDot('attributes', key, value)} max={30} />
      <DotGroupSection title="Salvaguardas" groups={[{ title: 'Testes de resistência', keys: schema.savingThrowKeys }]} values={form.savingThrows} onChange={(key, value) => setDot('savingThrows', key, value)} max={30} />
      <DotGroupSection title="Perícias" groups={schema.skillGroups} values={form.skills} onChange={(key, value) => setDot('skills', key, value)} max={30} />
    </>}

    <div className="sheet-actions"><button className="primary">Salvar ficha</button></div>
  </form>;
}
