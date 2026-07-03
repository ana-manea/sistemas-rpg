import { useContext } from 'react';
import { SystemContext } from '../contexts/SystemContext.jsx';
export function useSystem() { return useContext(SystemContext); }
