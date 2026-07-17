import { useEffect, useState } from 'react';
import { PrintSet } from '../components/PrintSet';
import { isWebGLAvailable } from '../lib/webgl';
import { SiteProvider, useSite } from '../building/SiteContext';
import { SiteRoot } from '../scene/SiteRoot';
import { BootLabels } from '../hud/BootLabels';
import { FloorRail } from '../hud/FloorRail';
import { SpecPanel } from '../hud/SpecPanel';
import { LobbyPanel } from '../hud/LobbyPanel';
import { PlanFallback } from '../hud/PlanFallback';
import { SiteChrome } from '../hud/SiteChrome';
import '../styles/siteline.css';

function PrintDrawer() {
  const { printOpen, setPrintOpen, lang } = useSite();

  useEffect(() => {
    if (!printOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPrintOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [printOpen, setPrintOpen]);

  useEffect(() => {
    const onBefore = () => setPrintOpen(true);
    window.addEventListener('beforeprint', onBefore);
    return () => window.removeEventListener('beforeprint', onBefore);
  }, [setPrintOpen]);

  if (!printOpen) return null;

  return (
    <div className="site-print-drawer" role="dialog" aria-label="Title block · Print set">
      <div className="site-print-drawer-bar">
        <span>DOC · TITLE BLOCK · R-SERIES</span>
        <div className="site-print-drawer-actions">
          <button type="button" className="site-btn" onClick={() => window.print()}>
            Print
          </button>
          <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(false)}>
            Close
          </button>
        </div>
      </div>
      <div className="site-print-drawer-body">
        <PrintSet lang={lang} preview variant="resume" />
      </div>
    </div>
  );
}

function SitelineShell() {
  const { prefer2d, reducedMotion, phase, finishBoot } = useSite();
  const [webgl] = useState(() => isWebGLAvailable());

  const usePlan = !webgl || prefer2d;

  useEffect(() => {
    if (usePlan && phase === 'boot') {
      finishBoot();
    }
  }, [usePlan, phase, finishBoot]);

  return (
    <div className="site-app">
      <a className="site-skip" href="#site-main">
        Skip to content
      </a>

      {!usePlan && <SiteRoot webgl={webgl} />}
      {usePlan && (
        <PlanFallback reason={!webgl ? 'webgl' : reducedMotion ? 'reduced' : 'mobile'} />
      )}

      <BootLabels />
      <SiteChrome />
      {!usePlan && <FloorRail />}
      <main id="site-main" className="site-main">
        <LobbyPanel />
        <SpecPanel />
      </main>
      <PrintDrawer />
    </div>
  );
}

export default function SitelineApp() {
  return (
    <SiteProvider>
      <SitelineShell />
    </SiteProvider>
  );
}
