import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../services/api.js';
import { getClanTheme } from '../../systems/vampire/data/clanThemes.js';
import {
  ensureFullCharacter,
  getSchema,
  vampireMentalAttributes,
  vampireMentalSkills,
  vampirePhysicalAttributes,
  vampirePhysicalSkills,
  vampireSocialAttributes,
  vampireSocialSkills,
} from '../../utils/characterSchema.js';

function dots(n = 0, max = 5) {
  const value = Math.max(0, Math.min(max, Number(n) || 0));
  return <span className="rating-dots" aria-label={`${value} de ${max}`}>{Array.from({ length: max }, (_, i) => <span key={i} className={i < value ? 'filled' : ''} />)}</span>;
}

function NumericOrDots({ value, max = 5 }) {
  if (max > 10) return <strong className="numeric-stat">{value || 0}</strong>;
  return dots(value, max);
}

function Section({ title, children, className = '' }) {
  if (!children) return null;
  return <section className={`sheet-view-section ${className}`.trim()}><h2>{title}</h2>{children}</section>;
}

function TextBlock({ title, value }) {
  if (!value || !String(value).trim()) return null;
  return <Section title={title} className="sheet-text-block"><p className="pre readable-text">{value}</p></Section>;
}

function TextBox({ title, value }) {
  return <div className="sheet-info-item text-box-item"><span>{title}</span><p className="pre readable-text">{value || '—'}</p></div>;
}

function InfoItem({ label, value }) {
  return <div className="sheet-info-item"><span>{label}</span><strong>{value || '—'}</strong></div>;
}

function DownloadButton({ onOpen }) {
  return <div className="pdf-template-panel no-print"><button type="button" className="primary" onClick={onOpen}>Baixar PDF</button><small>A prévia será exibida nesta página. O PDF será salvo com fundo branco e aparência de ficha oficial.</small></div>;
}

function printCurrentPreview() {
  setTimeout(() => window.print(), 100);
}

function FieldCell({ label, value, className = '' }) {
  return <div className={`pdf-field ${className}`.trim()}><span>{label}</span><strong>{value || '—'}</strong></div>;
}

function PdfDots({ value = 0, max = 5, square = false }) {
  const n = Math.max(0, Math.min(max, Number(value) || 0));
  return <span className={square ? 'pdf-box-dots' : 'pdf-dots'}>{Array.from({ length: max }, (_, index) => <i key={index} className={index < n ? 'filled' : ''} />)}</span>;
}

function PdfStatList({ title, keys, values }) {
  return <div className="pdf-stat-box"><h4>{title}</h4>{keys.map(key => <p key={key}><span>{key}</span><PdfDots value={values?.[key] || 0} /></p>)}</div>;
}

function PdfSkillList({ title, keys, values }) {
  return <div className="pdf-skill-box"><h4>{title}</h4>{keys.map(key => <p key={key}><span>{key}</span><PdfDots value={values?.[key] || 0} /></p>)}</div>;
}

function PdfList({ items = [], fallback = '—' }) {
  const rows = (items || []).filter(item => item?.name || item?.notes);
  if (!rows.length) return <p className="pdf-muted-line">{fallback}</p>;
  return <div className="pdf-list-lines">{rows.map((item, index) => <p key={index}><span>{item.name || '—'}</span>{Number(item.value || 0) > 0 && <PdfDots value={item.value} />}{item.notes && <em>{item.notes}</em>}</p>)}</div>;
}

function PdfDisciplineGrid({ disciplines = [] }) {
  const rows = (disciplines || []).filter(item => item?.name).slice(0, 6);
  return <div className="pdf-disciplines-grid">{Array.from({ length: 6 }, (_, index) => {
    const item = rows[index];
    const level = Math.max(0, Math.min(5, Number(item?.level || 0)));
    const powers = Array.from({ length: level }, (_, i) => item?.powers?.[i] || '');
    return <div className="pdf-discipline-cell" key={index}>
      <div className="pdf-discipline-title"><strong>{item?.name || '—'}</strong><PdfDots value={level} /></div>
      {powers.map((power, powerIndex) => <p key={powerIndex}><span>Poder {Array.from({ length: powerIndex + 1 }, () => '•').join('')}</span><b>{power || '—'}</b></p>)}
    </div>;
  })}</div>;
}

function VampirePdfPreview({ c }) {
  const clanTheme = getClanTheme(c?.clan);
  return <div className="pdf-preview-print-area vampire-pdf-preview" style={{ '--clan-accent': clanTheme.accent, '--clan-soft': clanTheme.soft, '--clan-watermark': `url('${clanTheme.watermark}')` }}>
    <section className="pdf-sheet-page">
      <div className="pdf-watermark" />
      <header className="pdf-vampire-logo"><h2>VAMPIRO</h2><span>A MÁSCARA</span></header>
      <div className="pdf-identity-table">
        <FieldCell label="Nome" value={c.name} /><FieldCell label="Conceito" value={c.concept} /><FieldCell label="Predador" value={c.predator} />
        <FieldCell label="Crônica" value={c.chronicle} /><FieldCell label="Ambição" value={c.ambition} /><FieldCell label="Clã" value={c.clan} />
        <FieldCell label="Senhor" value={c.sire} /><FieldCell label="Desejo" value={c.desire} /><FieldCell label="Geração" value={c.generation} />
      </div>
      <div className="pdf-section-title">Atributos</div>
      <div className="pdf-three-columns">
        <PdfStatList title="Físicos" keys={vampirePhysicalAttributes} values={c.attributes} />
        <PdfStatList title="Sociais" keys={vampireSocialAttributes} values={c.attributes} />
        <PdfStatList title="Mentais" keys={vampireMentalAttributes} values={c.attributes} />
      </div>
      <div className="pdf-marker-row">
        <div><strong>Vitalidade</strong><PdfDots value={c.health?.current || 0} max={c.health?.max || 10} square /></div>
        <div><strong>Força de Vontade</strong><PdfDots value={c.willpower?.current || 0} max={c.willpower?.max || 10} square /></div>
      </div>
      <div className="pdf-section-title">Habilidades</div>
      <div className="pdf-three-columns pdf-skills-columns">
        <PdfSkillList title="Físicas" keys={vampirePhysicalSkills} values={c.skills} />
        <PdfSkillList title="Sociais" keys={vampireSocialSkills} values={c.skills} />
        <PdfSkillList title="Mentais" keys={vampireMentalSkills} values={c.skills} />
      </div>
      <div className="pdf-section-title">Disciplinas</div>
      <PdfDisciplineGrid disciplines={c.disciplines} />
      <footer className="pdf-bottom-markers"><span>Ressonância <b>{c.resonance || '—'}</b></span><span>Fome <PdfDots value={c.hunger || 0} /></span><span>Humanidade <PdfDots value={c.humanity || 0} max={10} /></span></footer>
    </section>
    <section className="pdf-sheet-page">
      <div className="pdf-watermark" />
      <header className="pdf-vampire-logo small"><h2>VAMPIRO</h2><span>A MÁSCARA</span></header>
      <div className="pdf-top-three">
        <FieldCell label="Princípios da Crônica" value={c.tenets} className="large" />
        <FieldCell label="Pilares & Convicções" value={c.convictionText || (c.convictions || []).map(item => item.name).filter(Boolean).join(' | ')} className="large" />
        <FieldCell label="Perdição do Clã" value={c.clanBane} className="large" />
      </div>
      <div className="pdf-page-two-grid">
        <section className="pdf-box large-list"><h3>Vantagens, Defeitos e Antecedentes</h3><PdfList items={[...(c.backgrounds || []), ...(c.advantages || []), ...(c.disadvantages || [])]} /></section>
        <section className="pdf-box blood-box"><h3>Potência de Sangue <PdfDots value={c.bloodPotency || 0} max={10} /></h3>
          <div className="pdf-small-grid"><FieldCell label="Surto de Sangue" value={c.bloodSurge} /><FieldCell label="Quantidade Recuperada" value={c.mendAmount} /><FieldCell label="Bônus de Poder" value={c.powerBonus} /><FieldCell label="Rerrolagem de Sangue" value={c.rouseReroll} /><FieldCell label="Penalidade de Alimentação" value={c.feedingPenalty} /><FieldCell label="Gravidade da Perdição" value={c.baneSeverity} /></div>
          <div className="pdf-experience"><FieldCell label="Experiência Total" value={c.experienceTotal} /><FieldCell label="Experiência Gasta" value={c.experienceSpent} /></div>
          <div className="pdf-bio-lines"><FieldCell label="Idade Verdadeira" value={c.trueAge} /><FieldCell label="Idade Aparente" value={c.apparentAge} /><FieldCell label="Data de Nascimento" value={c.birthDate} /><FieldCell label="Data da Morte" value={c.deathDate} /><FieldCell label="Aparência" value={c.appearance} /><FieldCell label="Traços Distintivos" value={c.distinguishingFeatures} /><FieldCell label="História" value={c.history} /></div>
        </section>
        <section className="pdf-box notes-box"><h3>Notas</h3><p className="pre">{c.notes || c.equipment || '—'}</p></section>
      </div>
    </section>
  </div>;
}

function GenericPdfPreview({ c, schema }) {
  return <div className="pdf-preview-print-area"><section className="pdf-sheet-page generic-pdf-page"><h1>{c.name || 'Ficha sem nome'}</h1>{schema.sections.map(section => <div key={section.title} className="pdf-box"><h3>{section.title}</h3><div className="pdf-small-grid">{section.fields.map(field => <FieldCell key={field.name} label={field.label} value={field.name.includes('.') ? '' : c[field.name]} />)}</div></div>)}</section></div>;
}

function PdfPreviewModal({ character, schema, onClose }) {
  if (!character) return null;
  return <div className="pdf-preview-overlay" role="dialog" aria-modal="true" aria-label="Prévia do PDF">
    <div className="pdf-preview-modal">
      <header className="pdf-preview-header"><div><p className="eyebrow">Prévia do PDF</p><h2>{character.name || 'Ficha sem nome'}</h2></div><div className="pdf-preview-actions"><button type="button" onClick={onClose}>Cancelar</button><button type="button" className="primary" onClick={printCurrentPreview}>Salvar/Imprimir PDF</button></div></header>
      <div className="pdf-preview-scroll">{character.system === 'dnd' ? <GenericPdfPreview c={character} schema={schema} /> : <VampirePdfPreview c={character} />}</div>
    </div>
  </div>;
}


function StatGroups({ title, groups, values, max = 5 }) {
  if (!groups?.length) return null;
  return <Section title={title}><div className="official-dot-columns view-dot-columns">{groups.map(group => <div key={group.title} className="official-dot-group"><h3>{group.title}</h3><div className="sheet-rating-grid compact">{group.keys.map(key => <p key={key}><span>{key}</span><NumericOrDots value={values?.[key] || 0} max={max} /></p>)}</div></div>)}</div></Section>;
}

function NamedListView({ title, items = [] }) {
  const list = (items || []).filter(item => item?.name || item?.notes);
  if (!list.length) return null;
  return <div className="sheet-list-box"><h3>{title}</h3>{list.map((item, index) => <p key={`${title}-${index}`}><strong>{item.name || '—'}</strong>{Number(item.value || 0) > 0 && <span>{dots(item.value, 5)}</span>}{item.notes && <em>{item.notes}</em>}</p>)}</div>;
}

function DisciplineView({ disciplines = [] }) {
  const rows = disciplines.filter(item => item?.name);
  if (!rows.length) return <p className="empty-sheet-note">Nenhuma disciplina cadastrada.</p>;
  return <div className="discipline-view-list discipline-view-expanded">{rows.map((item, idx) => {
    const level = Math.max(0, Math.min(5, Number(item.level || 0)));
    const powers = Array.from({ length: level }, (_, index) => item.powers?.[index] || '');
    return <div key={`${item.name}-${idx}`} className="discipline-view-card"><div className="discipline-view-title"><strong>{item.name}</strong><span>{dots(level, 5)}</span></div>{item.notes && <p className="discipline-note">{item.notes}</p>}{powers.length > 0 && <ol className="discipline-power-list">{powers.map((power, index) => <li key={index}><span>Poder {Array.from({ length: index + 1 }, () => '•').join('')}</span><strong>{power || '—'}</strong></li>)}</ol>}</div>;
  })}</div>;
}

function VampireView({ c, id, onPreview }) {
  const clanTheme = getClanTheme(c?.clan);
  return <article id="character-sheet-printable" className={`character-view-page official-character-view sheet-view-vampire clan-theme-${clanTheme.slug}`} style={{ '--clan-accent': clanTheme.accent, '--clan-soft': clanTheme.soft, '--clan-watermark': `url('${clanTheme.watermark}')` }}>
    <header className="character-view-header"><div><p className="eyebrow">Vampiro: A Máscara 5e</p><h1>{c.name || 'Ficha sem nome'}</h1><p>{c.concept || 'Membro da noite'}{c.clan ? ` • ${c.clan}` : ''}</p></div><div className="sheet-actions-inline no-print"><Link className="primary" to={`/fichas/${id}/editar`}>Editar</Link></div></header>
    <DownloadButton onOpen={onPreview} />

    <Section title="Identidade"><div className="sheet-info-grid official-identity-grid"><InfoItem label="Nome" value={c.name} /><InfoItem label="Conceito" value={c.concept} /><InfoItem label="Clã" value={c.clan} /><InfoItem label="Predador" value={c.predator} /><InfoItem label="Senhor(a)" value={c.sire} /><InfoItem label="Ambição" value={c.ambition} /><InfoItem label="Desejo" value={c.desire} /><InfoItem label="Geração" value={c.generation} /><InfoItem label="Ressonância" value={c.resonance} /></div></Section>

    <Section title="Marcadores"><div className="sheet-info-grid official-markers-grid"><div className="sheet-info-item"><span>Potência de Sangue</span><strong>{dots(c.bloodPotency || 0, 10)}</strong></div><div className="sheet-info-item"><span>Humanidade</span><strong>{dots(c.humanity || 0, 10)}</strong></div><div className="sheet-info-item"><span>Fome</span><strong>{dots(c.hunger || 0, 5)}</strong></div><div className="sheet-info-item"><span>Vitalidade</span><strong>{dots(c.health?.current || 0, c.health?.max || 10)}</strong></div><div className="sheet-info-item"><span>Força de Vontade</span><strong>{dots(c.willpower?.current || 0, c.willpower?.max || 10)}</strong></div></div></Section>

    <StatGroups title="Atributos" groups={[{ title: 'Físicos', keys: vampirePhysicalAttributes }, { title: 'Sociais', keys: vampireSocialAttributes }, { title: 'Mentais', keys: vampireMentalAttributes }]} values={c.attributes} />
    <StatGroups title="Habilidades" groups={[{ title: 'Físicas', keys: vampirePhysicalSkills }, { title: 'Sociais', keys: vampireSocialSkills }, { title: 'Mentais', keys: vampireMentalSkills }]} values={c.skills} />
    <Section title="Disciplinas"><DisciplineView disciplines={c.disciplines} /></Section>

    <Section title="Vantagens, desvantagens e antecedentes"><div className="sheet-list-grid"><NamedListView title="Antecedentes" items={c.backgrounds} /><NamedListView title="Vantagens" items={c.advantages} /><NamedListView title="Desvantagens / Defeitos" items={c.disadvantages} /><NamedListView title="Convicções e vínculos" items={c.convictions} /></div></Section>

    <div className="print-page-break" />
    <Section title="Crônica"><div className="sheet-info-grid text-grid-three"><TextBox title="Crônica" value={c.chronicle} /><TextBox title="Princípios da Crônica" value={c.tenets} /><TextBox title="Perdição do Clã" value={c.clanBane} /></div></Section>
    <TextBlock title="História" value={c.history} />
    <TextBlock title="Aparência" value={c.appearance} />
    <TextBlock title="Traços Distintivos" value={c.distinguishingFeatures} />
    <TextBlock title="Pilares, convicções e alicerces" value={c.convictionText} />
    <Section title="Potência de Sangue"><div className="sheet-info-grid official-markers-grid"><InfoItem label="Surto de Sangue" value={c.bloodSurge} /><InfoItem label="Quantidade Recuperada" value={c.mendAmount} /><InfoItem label="Bônus de Poder" value={c.powerBonus} /><InfoItem label="Rerrolagem de Sangue" value={c.rouseReroll} /><InfoItem label="Penalidade de Alimentação" value={c.feedingPenalty} /><InfoItem label="Gravidade da Perdição" value={c.baneSeverity} /></div></Section>
    <Section title="Experiência e biografia"><div className="sheet-info-grid official-bio-grid"><InfoItem label="Experiência Total" value={c.experienceTotal} /><InfoItem label="Experiência Gasta" value={c.experienceSpent} /><InfoItem label="Idade Verdadeira" value={c.trueAge} /><InfoItem label="Idade Aparente" value={c.apparentAge} /><InfoItem label="Data de Nascimento" value={c.birthDate} /><InfoItem label="Data da Morte" value={c.deathDate} /></div></Section>
    <TextBlock title="Coterie" value={c.coterie} />
    <TextBlock title="Mapa de relacionamentos" value={c.relationshipMap} />
    <TextBlock title="Rituais de Feitiçaria de Sangue/Cerimônias de Oblívio" value={c.rituals} />
    <TextBlock title="Alquimia de Sangue Fraco" value={c.thinBloodAlchemy} />
    <TextBlock title="Equipamento" value={c.equipment} />
    <TextBlock title="Notas" value={c.notes} />
  </article>;
}

function DndView({ c, id, schema, onPreview }) {
  return <article id="character-sheet-printable" className="character-view-page official-character-view sheet-view-dnd"><header className="character-view-header"><div><p className="eyebrow">D&D 5e</p><h1>{c.name || 'Ficha sem nome'}</h1><p>{[c.characterClass, c.race, c.level ? `nível ${c.level}` : ''].filter(Boolean).join(' • ')}</p></div><div className="sheet-actions-inline no-print"><Link className="primary" to={`/fichas/${id}/editar`}>Editar</Link></div></header><DownloadButton onOpen={onPreview} />{schema.sections.map(section => <Section title={section.title} key={section.title}><div className="sheet-info-grid">{section.fields.map(field => <InfoItem key={field.name} label={field.label} value={field.name.includes('.') ? '' : c[field.name]} />)}</div></Section>)}<StatGroups title="Atributos" groups={schema.attributeGroups} values={c.attributes} max={30} /><StatGroups title="Salvaguardas" groups={[{ title: 'Testes de resistência', keys: schema.savingThrowKeys }]} values={c.savingThrows} max={30} /><StatGroups title="Perícias" groups={schema.skillGroups} values={c.skills} max={30} /></article>;
}

export default function CharacterView() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => { api.get('/characters/' + id).then(r => setCharacter(r.data)).finally(() => setLoading(false)); }, [id]);
  const c = useMemo(() => character ? ensureFullCharacter(character, character.system || 'vampire') : null, [character]);
  const schema = useMemo(() => getSchema(c?.system || 'vampire'), [c?.system]);
  if (loading) return <main className="page-shell"><p>Carregando ficha...</p></main>;
  if (!c) return <main className="page-shell"><p>Ficha não encontrada.</p></main>;
  return <>
    {c.system === 'dnd' ? <DndView c={c} id={id} schema={schema} onPreview={() => setPreviewOpen(true)} /> : <VampireView c={c} id={id} onPreview={() => setPreviewOpen(true)} />}
    {previewOpen && <PdfPreviewModal character={c} schema={schema} onClose={() => setPreviewOpen(false)} />}
  </>;
}
