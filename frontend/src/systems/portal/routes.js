import { portalPages } from './pages.js';

export const portalRoutes = portalPages.map(page => ({
  path: page.path,
  title: page.title,
  pageId: page.id,
}));
