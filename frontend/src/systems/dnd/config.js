import { dndTheme } from './theme.js';
import { dndRoutes } from './routes.js';
import { dndPages } from './pages.js';

export const dndSystem = {
  id: 'dnd',
  name: 'Dungeons & Dragons 5ª Edição',
  shortName: 'D&D 5e',
  basePath: '/dnd',
  tagline: 'Fantasia épica • d20',
  description: 'Um RPG de fantasia medieval em que jogadores criam aventureiros, exploram mundos fantásticos, enfrentam monstros e constroem histórias guiadas pelo Mestre do Jogo.',
  theme: dndTheme,
  routes: dndRoutes,
  pages: dndPages,
};
