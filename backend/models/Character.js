import mongoose from 'mongoose';

const dotGroup = {
  type: Map,
  of: Number,
  default: {}
};

const characterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  player: { type: String, default: '' },
  chronicle: { type: String, default: '' },
  concept: { type: String, default: '' },
  ambition: { type: String, default: '' },
  desire: { type: String, default: '' },
  clan: { type: String, default: '' },
  predator: { type: String, default: '' },
  generation: { type: String, default: '' },
  bloodPotency: { type: Number, default: 1, min: 0, max: 10 },
  humanity: { type: Number, default: 7, min: 0, max: 10 },
  hunger: { type: Number, default: 1, min: 0, max: 5 },
  health: { current: { type: Number, default: 0 }, max: { type: Number, default: 3 } },
  willpower: { current: { type: Number, default: 0 }, max: { type: Number, default: 3 } },
  attributes: { type: dotGroup, default: {} },
  skills: { type: dotGroup, default: {} },
  disciplines: [{ name: String, level: Number, powers: String }],
  advantages: [{ name: String, dots: Number, description: String }],
  flaws: [{ name: String, dots: Number, description: String }],
  convictions: [{ text: String, touchstone: String }],
  coterie: { type: String, default: '' },
  notes: { type: String, default: '' },
  history: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Character', characterSchema);
