import { vampireTheme } from './theme.js';
import { vampireRoutes } from './routes.js';
import { vampirePages } from './pages.js';

export const vampireSystem = {
  id: 'vampire',
  name: 'Vampiro: A Máscara 5ª Edição',
  shortName: 'Vampiro 5e',
  basePath: '/vampiro-5e',
  tagline: 'Horror pessoal • Mundo das Trevas',
  description: 'Um RPG de horror pessoal e político em que os jogadores interpretam vampiros tentando preservar a Máscara, sobreviver à Fome e manter sua humanidade.',
  contentBasePath: '/consulta',
  theme: vampireTheme,
  routes: vampireRoutes,
  pages: vampirePages,
};
