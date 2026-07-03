import { vampirePages } from './pages.js';

export const vampireRoutes = vampirePages.map(page => ({
  path: page.path,
  title: page.title,
  pageId: page.id,
}));
