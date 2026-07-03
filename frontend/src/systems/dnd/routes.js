import { dndPages } from './pages.js';

export const dndRoutes = dndPages.map(page => ({
  path: page.path,
  title: page.title,
  pageId: page.id,
}));
