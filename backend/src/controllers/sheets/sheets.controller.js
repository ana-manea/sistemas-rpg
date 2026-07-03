import CharacterSheet from '../../models/CharacterSheet.js';

function normalizeDotGroup(value = {}) {
  const source = value?.type && typeof value.type === 'object' ? value.type : value;
  if (!source || typeof source !== 'object') return {};
  return Object.fromEntries(
    Object.entries(source)
      .filter(([key]) => key !== 'type')
      .map(([key, val]) => [key, Number(val) || 0])
  );
}

function normalizeNamedList(value = []) {
  if (!Array.isArray(value)) return [];
  return value.map(item => ({
    name: String(item?.name || ''),
    value: Number(item?.value || 0),
    notes: String(item?.notes || ''),
  }));
}

function normalizeDisciplines(value = []) {
  if (!Array.isArray(value)) return [];
  return value.map(item => {
    const level = Math.max(0, Math.min(5, Number(item?.level || 0)));
    const powers = Array.isArray(item?.powers) ? item.powers.slice(0, level).map(power => String(power || '')) : [];
    while (powers.length < level) powers.push('');
    return {
      name: String(item?.name || ''),
      level,
      powers,
      notes: String(item?.notes || ''),
      source: String(item?.source || 'manual'),
    };
  });
}

function sanitizePayload(payload = {}) {
  return {
    ...payload,
    attributes: normalizeDotGroup(payload.attributes),
    skills: normalizeDotGroup(payload.skills),
    savingThrows: normalizeDotGroup(payload.savingThrows),
    disciplines: normalizeDisciplines(payload.disciplines),
    backgrounds: normalizeNamedList(payload.backgrounds),
    advantages: normalizeNamedList(payload.advantages),
    disadvantages: normalizeNamedList(payload.disadvantages),
    convictions: normalizeNamedList(payload.convictions),
  };
}

export async function listCharacters(req, res) {
  const characters = await CharacterSheet.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(characters);
}

export async function getCharacter(req, res) {
  const character = await CharacterSheet.findOne({ _id: req.params.id, user: req.user._id });
  if (!character) return res.status(404).json({ message: 'Ficha não encontrada.' });
  res.json(character);
}

export async function createCharacter(req, res) {
  const character = await CharacterSheet.create({ ...sanitizePayload(req.body), user: req.user._id });
  res.status(201).json(character);
}

export async function updateCharacter(req, res) {
  const character = await CharacterSheet.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    sanitizePayload(req.body),
    { new: true, runValidators: true }
  );
  if (!character) return res.status(404).json({ message: 'Ficha não encontrada.' });
  res.json(character);
}

export async function deleteCharacter(req, res) {
  const character = await CharacterSheet.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!character) return res.status(404).json({ message: 'Ficha excluída.' });
  res.json({ message: 'Ficha excluída.' });
}
