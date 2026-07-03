import { portalSystem } from './portal/config.js';
import { vampireSystem } from './vampire/config.js';
import { dndSystem } from './dnd/config.js';

export const systems = [portalSystem, vampireSystem, dndSystem];
export const contentSystems = [vampireSystem, dndSystem];

const routeIndex = systems.flatMap(system => system.routes.map(route => ({ ...route, system })));
const pageIndex = systems.flatMap(system => (system.pages || []).map(page => ({ ...page, system })));

export function getSystemForPath(pathname) {
  const contentSystem = contentSystems
    .slice()
    .sort((a, b) => b.basePath.length - a.basePath.length)
    .find(system => pathname === system.basePath || pathname.startsWith(`${system.basePath}/`));

  if (contentSystem) return contentSystem;

  if (pathname.startsWith('/consulta')) return vampireSystem;
  return portalSystem;
}

export function getPageForPath(pathname) {
  return pageIndex.find(page => page.path === pathname) || null;
}

export function getRouteMeta(pathname) {
  const exact = routeIndex.find(route => route.path === pathname);
  if (exact) return exact;

  if (pathname === '/dashboard') {
    return { title: 'Dashboard de Fichas | Arquivo de RPG', system: portalSystem };
  }
  if (pathname.startsWith('/fichas/nova')) {
    return { title: 'Criar Ficha | Arquivo de RPG', system: portalSystem };
  }
  if (pathname.startsWith('/fichas/') && pathname.endsWith('/editar')) {
    return { title: 'Editar Ficha | Arquivo de RPG', system: portalSystem };
  }
  if (pathname.startsWith('/fichas/')) {
    return { title: 'Ficha | Arquivo de RPG', system: portalSystem };
  }
  if (pathname.startsWith('/redefinir-senha/')) {
    return { title: 'Redefinir Senha', system: portalSystem };
  }
  if (pathname.startsWith('/consulta/')) {
    return { title: 'Arquivo em preparação | Vampiro: A Máscara', system: vampireSystem };
  }

  const system = getSystemForPath(pathname);
  return { title: system.name, system };
}
