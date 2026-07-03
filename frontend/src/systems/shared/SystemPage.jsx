import React from 'react';
import { Navigate } from 'react-router-dom';
import VampireHomepage from '../vampire/pages/Homepage/index.jsx';
import VampireConstructionPage from '../vampire/pages/Construction/index.jsx';
import Conceitos from '../vampire/pages/Conceitos/index.jsx';
import Sociedade from '../vampire/pages/Sociedade/index.jsx';
import Camarilla from '../vampire/pages/Camarilla/index.jsx';
import Anarquistas from '../vampire/pages/Anarquistas/index.jsx';
import Sabbat from '../vampire/pages/Sabbat/index.jsx';
import Clas from '../vampire/pages/Clas/index.jsx';
import Regras from '../vampire/pages/Regras/index.jsx';
import CriacaoPersonagem from '../vampire/pages/CriacaoPersonagem/index.jsx';
import Disciplinas from '../vampire/pages/Disciplinas/index.jsx';
import Vampiros from '../vampire/pages/Vampiros/index.jsx';
import SistemaAvancado from '../vampire/pages/SistemaAvancado/index.jsx';
import Cidades from '../vampire/pages/Cidades/index.jsx';
import Ferramentas from '../vampire/pages/Ferramentas/index.jsx';
import CamadasConhecimento from '../vampire/pages/CamadasConhecimento/index.jsx';
import DndHomepage from '../dnd/pages/Homepage.jsx';
import DndConstructionPage from '../dnd/pages/ConstructionPage.jsx';
import CriacaoPersonagensDnd from '../dnd/pages/CriacaoPersonagens/index.jsx';
import Monge from '../dnd/pages/Monge/index.jsx';
import ExemploHadria from '../dnd/pages/ExemploHadria/index.jsx';

const vampireComponents = {
  Homepage: VampireHomepage,
  Conceitos,
  Sociedade,
  Camarilla,
  Anarquistas,
  Sabbat,
  Clas,
  Regras,
  CriacaoPersonagem,
  Disciplinas,
  Vampiros,
  SistemaAvancado,
  Cidades,
  Ferramentas,
  CamadasConhecimento,
};

const dndComponents = {
  CriacaoPersonagens: CriacaoPersonagensDnd,
  Monge,
  ExemploHadria,
};

export default function SystemPage({ systemId, page }) {
  if (systemId === 'vampire') {
    if (page.type === 'construction') return <VampireConstructionPage page={page} />;
    const Component = vampireComponents[page.component] || VampireConstructionPage;
    return <Component page={page} />;
  }

  if (systemId === 'dnd') {
    if (page.type === 'systemHome') return <DndHomepage />;
    if (page.type === 'article') {
      const Component = dndComponents[page.component] || DndConstructionPage;
      return <Component page={page} />;
    }
    if (page.type === 'construction') return <DndConstructionPage page={page} />;
  }

  return <Navigate to={systemId === 'dnd' ? '/dnd' : '/vampiro-5e'} replace />;
}
