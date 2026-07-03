import { Router } from 'express';
import { createCharacter, deleteCharacter, getCharacter, listCharacters, updateCharacter } from '../controllers/sheets/sheets.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();
router.use(protect);
router.get('/', listCharacters);
router.post('/', createCharacter);
router.get('/:id', getCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);
export default router;
