import Character from '../models/Character.js';

export async function listCharacters(req, res) {
  const characters = await Character.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(characters);
}

export async function getCharacter(req, res) {
  const character = await Character.findOne({ _id: req.params.id, user: req.user._id });
  if (!character) return res.status(404).json({ message: 'Ficha não encontrada.' });
  res.json(character);
}

export async function createCharacter(req, res) {
  const character = await Character.create({ ...req.body, user: req.user._id });
  res.status(201).json(character);
}

export async function updateCharacter(req, res) {
  const character = await Character.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!character) return res.status(404).json({ message: 'Ficha não encontrada.' });
  res.json(character);
}

export async function deleteCharacter(req, res) {
  const character = await Character.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!character) return res.status(404).json({ message: 'Ficha não encontrada.' });
  res.json({ message: 'Ficha excluída.' });
}
