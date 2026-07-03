import {
  disciplines as vampireDisciplines,
  clans,
  predators,
  dndClasses,
  dndRaces,
} from '../data/reference.js';

export const systemLabels = {
  vampire: 'Vampiro: A Máscara 5e',
  dnd: 'D&D 5e',
};

export const vampirePhysicalAttributes = ['força', 'destreza', 'vigor'];
export const vampireSocialAttributes = ['carisma', 'manipulação', 'autocontrole'];
export const vampireMentalAttributes = ['inteligência', 'raciocínio', 'determinação'];

export const vampirePhysicalSkills = ['armas brancas', 'armas de fogo', 'atletismo', 'briga', 'condução', 'furtividade', 'ladroagem', 'ofícios', 'sobrevivência'];
export const vampireSocialSkills = ['empatia com animais', 'etiqueta', 'intimidação', 'liderança', 'manha', 'performance', 'persuasão', 'sagacidade', 'subterfúgio'];
export const vampireMentalSkills = ['ciência', 'erudição', 'finanças', 'investigação', 'medicina', 'ocultismo', 'percepção', 'política', 'tecnologia'];

export const dndAttributes = ['força', 'destreza', 'constituição', 'inteligência', 'sabedoria', 'carisma'];
export const dndSavingThrows = ['força', 'destreza', 'constituição', 'inteligência', 'sabedoria', 'carisma'];
export const dndSkills = ['acrobacia', 'arcanismo', 'atletismo', 'atuação', 'enganação', 'furtividade', 'história', 'intimidação', 'intuição', 'investigação', 'lidar com animais', 'medicina', 'natureza', 'percepção', 'persuasão', 'prestidigitação', 'religião', 'sobrevivência'];

export const vampireDisciplinePowers = {
  Animalismo: {
    1: ['Bondade Animal', 'Sentir a Besta', 'Sussurros Selvagens'],
    2: ['Vínculo Familiar', 'Convocar Animais'],
    3: ['Suculência Animal', 'Comunhão de Espíritos', 'Acalmar a Besta'],
    4: ['Subjugar o Espírito', 'Subsume the Spirit'],
    5: ['Exército Animal', 'Expulsar a Besta'],
  },
  Auspícios: {
    1: ['Sentidos Aguçados', 'Sentir o Invisível'],
    2: ['Premonição'],
    3: ['Scry the Soul', 'Compartilhar os Sentidos'],
    4: ['Toque do Espírito'],
    5: ['Clarividência', 'Possessão', 'Telepatia'],
  },
  Celeridade: {
    1: ['Graça Felina', 'Reflexos Rápidos'],
    2: ['Rapidez'],
    3: ['Piscar', 'Travessia'],
    4: ['Elegância Impossível'],
    5: ['Golpe Relâmpago', 'Velocidade Dividida'],
  },
  Dominação: {
    1: ['Comando', 'Nublar Memória'],
    2: ['Mesmerizar', 'Demência'],
    3: ['Decreto Submerso', 'Esquecimento'],
    4: ['Racionalizar'],
    5: ['Manipulação em Massa', 'Terminal Decree'],
  },
  Fortitude: {
    1: ['Resiliência', 'Mente Inabalável'],
    2: ['Resistência', 'Vigor Duradouro'],
    3: ['Desafiar Ruína', 'Fortificar a Fachada Interior'],
    4: ['Draught of Endurance'],
    5: ['Carne de Mármore', 'Prowess From Pain'],
  },
  'Feitiçaria de Sangue': {
    1: ['Sangue Corrosivo', 'Um Gosto por Sangue'],
    2: ['Extinguir Vitae'],
    3: ['Sangue de Potência', 'Toque do Escorpião'],
    4: ['Furto de Vitae'],
    5: ['Caldeirão de Sangue'],
  },
  Metamorfose: {
    1: ['Olhos da Besta', 'Peso da Pena'],
    2: ['Armas Selvagens'],
    3: ['Forma Bestial', 'Fusão com a Terra'],
    4: ['Metamorfose Horrenda'],
    5: ['Forma de Névoa', 'Coração das Trevas'],
  },
  Oblívio: {
    1: ['Manto de Sombras', 'Oblivion Sight'],
    2: ['Braços de Ahriman', 'Toque Obliviante'],
    3: ['Aura de Decadência', 'Passagem Sombria'],
    4: ['Stygian Shroud'],
    5: ['Tenebrous Avatar'],
  },
  Ofuscação: {
    1: ['Manto de Sombras', 'Silêncio da Morte'],
    2: ['Passagem Invisível'],
    3: ['Máscara de Mil Faces', 'Ghost in the Machine'],
    4: ['Desaparecer'],
    5: ['Manto do Grupo', 'Impostor\'s Guise'],
  },
  Potência: {
    1: ['Corpo Letal', 'Salto Ascendente'],
    2: ['Prowess'],
    3: ['Alimentação Brutal', 'Spark of Rage'],
    4: ['Draught of Might'],
    5: ['Punho de Caim', 'Earthshock'],
  },
  Presença: {
    1: ['Temor', 'Fascínio'],
    2: ['Beijo Duradouro'],
    3: ['Entrancement', 'Dread Gaze'],
    4: ['Convocação'],
    5: ['Majestade', 'Star Magnetism'],
  },
};

function zeroGroup(keys) {
  return Object.fromEntries(keys.map(key => [key, 0]));
}

function normalizeDotGroup(value, keys = []) {
  const source = value?.type && typeof value.type === 'object' ? value.type : value;
  const base = zeroGroup(keys);
  if (!source || typeof source !== 'object') return base;
  Object.entries(source).forEach(([key, val]) => {
    if (key !== 'type') base[key] = Number(val) || 0;
  });
  return base;
}

export function normalizeNamedList(value = []) {
  if (Array.isArray(value)) return value.map(item => typeof item === 'string' ? { name: item, value: 0, notes: '' } : { name: item?.name || '', value: Number(item?.value || item?.level || 0), notes: item?.notes || item?.description || '' });
  if (typeof value === 'string' && value.trim()) return value.split('\n').map(line => ({ name: line.trim(), value: 0, notes: '' })).filter(item => item.name);
  return [];
}

function normalizeDiscipline(item = {}) {
  const level = Math.max(0, Math.min(5, Number(item.level ?? item.dots ?? 0) || 0));
  let powers = [];
  if (Array.isArray(item.powers)) powers = item.powers;
  else if (typeof item.powers === 'string' && item.powers.trim() && !item.powers.toLowerCase().includes('disciplina do')) {
    powers = item.powers.split('\n').map(x => x.trim()).filter(Boolean);
  }
  powers = Array.from({ length: level }, (_, index) => String(powers[index] || ''));
  return {
    name: item.name || item.discipline || '',
    level,
    powers,
    notes: item.notes || (typeof item.powers === 'string' && item.powers.toLowerCase().includes('disciplina do') ? item.powers : ''),
    source: item.source || 'manual',
  };
}

export const defaultVampireCharacter = {
  system: 'vampire',
  name: '', player: '', chronicle: '', concept: '', ambition: '', desire: '', sire: '', cult: '', clan: '', predator: '', generation: '', resonance: '',
  bloodPotency: 1, bloodSurge: '', mendAmount: '', powerBonus: '', rouseReroll: '', feedingPenalty: '', baneSeverity: '', humanity: 7, hunger: 1,
  health: { current: 0, max: 0 }, willpower: { current: 0, max: 0 },
  attributes: zeroGroup([...vampirePhysicalAttributes, ...vampireSocialAttributes, ...vampireMentalAttributes]),
  skills: zeroGroup([...vampirePhysicalSkills, ...vampireSocialSkills, ...vampireMentalSkills]),
  disciplines: [],
  backgrounds: [], advantages: [], disadvantages: [], convictions: [],
  tenets: '', convictionText: '', clanBane: '', advantageText: '', flawText: '', equipment: '', notes: '', history: '', coterie: '', relationshipMap: '', rituals: '', thinBloodAlchemy: '', trueAge: '', apparentAge: '', birthDate: '', deathDate: '', appearance: '', distinguishingFeatures: '', experienceTotal: '', experienceSpent: '',
};

export const defaultDndCharacter = {
  system: 'dnd',
  name: '', player: '', chronicle: '', characterClass: '', level: 1, background: '', race: '', alignment: '', experience: '',
  attributes: zeroGroup(dndAttributes), savingThrows: zeroGroup(dndSavingThrows), skills: zeroGroup(dndSkills),
  inspiration: '', proficiencyBonus: '', armorClass: '', initiative: '', speed: '', hitPointsMax: '', hitPoints: '', tempHitPoints: '', hitDice: '', deathSaveSuccesses: 0, deathSaveFailures: 0, passivePerception: '',
  attacks: '', equipment: '', personalityTraits: '', ideals: '', bonds: '', flaws: '', features: '', age: '', height: '', weight: '', eyes: '', skin: '', hair: '', appearance: '', allies: '', additionalFeatures: '', treasures: '', history: '', spellcastingClass: '', spellcastingAbility: '', spellSaveDc: '', spellAttackBonus: '', cantrips: '', spells: '', notes: '',
};

const text = (name, label, extra = {}) => ({ name, label, type: 'text', ...extra });
const textarea = (name, label, extra = {}) => ({ name, label, type: 'textarea', ...extra });
const number = (name, label, extra = {}) => ({ name, label, type: 'number', ...extra });
const select = (name, label, options, extra = {}) => ({ name, label, type: 'select', options, ...extra });

const vampireIdentityFields = [text('name', 'Nome do personagem', { required: true }), text('player', 'Jogador'), text('concept', 'Conceito'), select('clan', 'Clã', clans), select('predator', 'Predador', predators), text('sire', 'Senhor(a)'), text('ambition', 'Ambição'), text('desire', 'Desejo'), text('generation', 'Geração'), text('resonance', 'Ressonância')];
const vampireMarkerFields = [number('bloodPotency', 'Potência de Sangue', { min: 0, max: 10 }), number('humanity', 'Humanidade', { min: 0, max: 10 }), number('hunger', 'Fome', { min: 0, max: 5 }), number('health.current', 'Vitalidade atual', { min: 0, max: 20 }), number('health.max', 'Vitalidade máxima', { min: 0, max: 20 }), number('willpower.current', 'Força de Vontade atual', { min: 0, max: 20 }), number('willpower.max', 'Força de Vontade máxima', { min: 0, max: 20 })];
const vampireChronicleFields = [text('chronicle', 'Crônica'), textarea('tenets', 'Princípios da Crônica'), textarea('convictionText', 'Pilares, convicções e alicerces'), textarea('clanBane', 'Perdição/Fraqueza do Clã')];
const vampireBioFields = [text('trueAge', 'Idade verdadeira'), text('apparentAge', 'Idade aparente'), text('birthDate', 'Data de nascimento'), text('deathDate', 'Data da morte'), textarea('appearance', 'Aparência'), textarea('distinguishingFeatures', 'Traços distintivos'), textarea('history', 'História')];
const vampireBloodFields = [text('bloodSurge', 'Surto de Sangue'), text('mendAmount', 'Quantidade Recuperada'), text('powerBonus', 'Bônus de Poder'), text('rouseReroll', 'Rerrolagem de Sangue'), text('feedingPenalty', 'Penalidade de Alimentação'), text('baneSeverity', 'Gravidade da Perdição')];
const vampireNotesFields = [textarea('coterie', 'Informações da Coterie'), textarea('relationshipMap', 'Mapa de relacionamentos'), textarea('rituals', 'Rituais de Feitiçaria de Sangue/Cerimônias de Oblívio'), textarea('thinBloodAlchemy', 'Alquimia de Sangue Fraco'), textarea('equipment', 'Equipamento'), textarea('notes', 'Notas'), text('experienceTotal', 'Experiência total'), text('experienceSpent', 'Experiência gasta')];

export const systemSheetSchemas = {
  vampire: {
    id: 'vampire', label: systemLabels.vampire, defaultCharacter: defaultVampireCharacter,
    attributeGroups: [{ title: 'Físicos', keys: vampirePhysicalAttributes }, { title: 'Sociais', keys: vampireSocialAttributes }, { title: 'Mentais', keys: vampireMentalAttributes }],
    skillGroups: [{ title: 'Físicas', keys: vampirePhysicalSkills }, { title: 'Sociais', keys: vampireSocialSkills }, { title: 'Mentais', keys: vampireMentalSkills }],
    sections: [
      { title: 'Identidade', key: 'identity', fields: vampireIdentityFields },
      { title: 'Marcadores', key: 'markers', fields: vampireMarkerFields },
      { title: 'Crônica', key: 'chronicle', fields: vampireChronicleFields },
      { title: 'Biografia', key: 'bio', fields: vampireBioFields },
      { title: 'Potência de Sangue', key: 'blood', fields: vampireBloodFields },
      { title: 'Conteúdo adicional', key: 'notes', fields: vampireNotesFields },
    ],
    sectionsByKey: { identity: vampireIdentityFields, markers: vampireMarkerFields, chronicle: vampireChronicleFields, bio: vampireBioFields, blood: vampireBloodFields, notes: vampireNotesFields },
    disciplineOptions: vampireDisciplines,
    disciplinePowers: vampireDisciplinePowers,
  },
  dnd: {
    id: 'dnd', label: systemLabels.dnd, defaultCharacter: defaultDndCharacter,
    attributeGroups: [{ title: 'Atributos', keys: dndAttributes }],
    skillGroups: [{ title: 'Perícias', keys: dndSkills }],
    savingThrowKeys: dndSavingThrows,
    sections: [
      { title: 'Identidade', fields: [text('name', 'Nome do personagem', { required: true }), text('player', 'Nome do jogador'), text('chronicle', 'Campanha'), select('characterClass', 'Classe', dndClasses), number('level', 'Nível', { min: 1, max: 20 }), text('background', 'Antecedente'), select('race', 'Raça', dndRaces), text('alignment', 'Alinhamento'), text('experience', 'Pontos de experiência')] },
      { title: 'Combate', fields: [text('inspiration', 'Inspiração'), text('proficiencyBonus', 'Bônus de proficiência'), text('armorClass', 'Classe de Armadura'), text('initiative', 'Iniciativa'), text('speed', 'Deslocamento'), text('hitPointsMax', 'Pontos de Vida Máximos'), text('hitPoints', 'Pontos de Vida Atuais'), text('tempHitPoints', 'Pontos de Vida Temporários'), text('hitDice', 'Dado de Vida'), number('deathSaveSuccesses', 'Sucessos contra a morte', { min: 0, max: 3 }), number('deathSaveFailures', 'Falhas contra a morte', { min: 0, max: 3 }), text('passivePerception', 'Sabedoria passiva (Percepção)')] },
      { title: 'Ações e equipamento', fields: [textarea('attacks', 'Ataques e conjuração'), textarea('equipment', 'Equipamento'), textarea('features', 'Características e talentos')] },
      { title: 'Personalidade', fields: [textarea('personalityTraits', 'Traços de personalidade'), textarea('ideals', 'Ideais'), textarea('bonds', 'Vínculos'), textarea('flaws', 'Fraquezas')] },
      { title: 'Aparência e história', fields: [text('age', 'Idade'), text('height', 'Altura'), text('weight', 'Peso'), text('eyes', 'Cor dos olhos'), text('skin', 'Cor da pele'), text('hair', 'Cor do cabelo'), textarea('appearance', 'Aparência do personagem'), textarea('history', 'História do personagem')] },
      { title: 'Aliados e tesouros', fields: [textarea('allies', 'Aliados e organizações'), textarea('additionalFeatures', 'Características e talentos adicionais'), textarea('treasures', 'Tesouros'), textarea('notes', 'Notas')] },
      { title: 'Magias', fields: [text('spellcastingClass', 'Classe conjuradora'), text('spellcastingAbility', 'Atributo de conjuração'), text('spellSaveDc', 'CD para evitar suas magias'), text('spellAttackBonus', 'Modificador de ataque mágico'), textarea('cantrips', 'Truques'), textarea('spells', 'Magias por nível')] },
    ],
  },
};

export function getSchema(system = 'vampire') {
  return systemSheetSchemas[system] || systemSheetSchemas.vampire;
}

export function getDefaultCharacter(system = 'vampire') {
  const base = getSchema(system).defaultCharacter;
  return JSON.parse(JSON.stringify(base));
}

export function ensureFullCharacter(character = {}, system = character.system || 'vampire') {
  const base = getDefaultCharacter(system);
  const schema = getSchema(system);
  const attributeKeys = (schema.attributeGroups || []).flatMap(group => group.keys);
  const skillKeys = (schema.skillGroups || []).flatMap(group => group.keys);
  const savingThrowKeys = schema.savingThrowKeys || [];
  const next = {
    ...base,
    ...character,
    system,
    health: { ...base.health, ...(character.health || {}) },
    willpower: { ...base.willpower, ...(character.willpower || {}) },
    attributes: normalizeDotGroup(character.attributes, attributeKeys),
    skills: normalizeDotGroup(character.skills, skillKeys),
    savingThrows: normalizeDotGroup(character.savingThrows, savingThrowKeys),
    disciplines: Array.isArray(character.disciplines) ? character.disciplines.map(normalizeDiscipline) : [],
    backgrounds: normalizeNamedList(character.backgrounds || character.backgroundText || []),
    advantages: normalizeNamedList(character.advantages || character.advantageText || []),
    disadvantages: normalizeNamedList(character.disadvantages || character.flawText || []),
    convictions: normalizeNamedList(character.convictions || character.convictionText || []),
  };
  return next;
}

export function fieldValue(character, name) {
  if (!name.includes('.')) return character?.[name] ?? '';
  return name.split('.').reduce((acc, key) => acc?.[key], character) ?? '';
}

export function setNestedValue(source, name, value) {
  if (!name.includes('.')) return { ...source, [name]: value };
  const parts = name.split('.');
  const next = { ...source };
  let cursor = next;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) cursor[part] = value;
    else {
      cursor[part] = { ...(cursor[part] || {}) };
      cursor = cursor[part];
    }
  });
  return next;
}
