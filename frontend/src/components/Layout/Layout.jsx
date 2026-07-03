import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdown/index.js';
import Footer from '../Footer/index.js';
import { contentSystems, getRouteMeta, getSystemForPath } from '../../systems/index.js';

const systemsGroup = {
  label: 'Sistemas',
  items: contentSystems.map(system => ({ label: system.name, to: system.basePath })),
};

function updateFavicon(href) {
  let icon = document.querySelector('link[rel="icon"]');
  if (!icon) {
    icon = document.createElement('link');
    icon.rel = 'icon';
    document.head.appendChild(icon);
  }
  icon.type = 'image/x-icon';
  icon.href = `${href}?v=${Date.now()}`;
}

export default function Layout({ children, user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const system = getSystemForPath(location.pathname);
  const theme = system.theme.className;
  const isSystemPage = system.id !== 'portal';
  const currentSystemNavigation = system.pages
    ?.filter(page => page.showInMenu && page.id !== 'home')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    document.title = meta.title || system.name;
    updateFavicon((meta.system || system).theme.favicon);
  }, [location.pathname, system]);

  useEffect(() => {
    document.body.classList.remove('theme-home', 'theme-vampiro', 'theme-dnd');
    document.body.classList.add(theme);
    return () => document.body.classList.remove(theme);
  }, [theme]);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 420);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate('/');
  }

  return <div className={`site-shell ${theme}`} data-system={system.id}>
    <header className="topbar">
      <Link className="brand" to="/">Arquivo de RPG</Link>
      <nav>
        {isSystemPage && <NavLink to={system.basePath}>Início</NavLink>}

        {!isSystemPage && <Dropdown
          group={systemsGroup}
          isOpen={openDropdown === systemsGroup.label}
          onOpen={() => setOpenDropdown(systemsGroup.label)}
          onClose={() => setOpenDropdown(null)}
          user={user}
        />}

        {isSystemPage && currentSystemNavigation?.length > 0 && <Dropdown
          group={{ label: system.shortName || system.name, items: currentSystemNavigation.map(page => ({ label: page.menuLabel || page.title, to: page.path })) }}
          isOpen={openDropdown === system.id}
          onOpen={() => setOpenDropdown(system.id)}
          onClose={() => setOpenDropdown(null)}
          user={user}
        />}

        {user ? <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <button onClick={logout}>Sair</button>
        </> : <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/cadastro">Cadastro</NavLink>
        </>}
      </nav>
    </header>
    <main className="page">{children}</main>
    <button
      className={`back-to-top-floating ${showBackToTop ? 'is-visible' : ''}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
    >
      ↑
    </button>
    <Footer />
  </div>;
}
