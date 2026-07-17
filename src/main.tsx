import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SitelineApp from './app/SitelineApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SitelineApp />
  </StrictMode>,
);
