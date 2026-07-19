import { lazy, Suspense, useEffect, useState } from 'react';
import { isWebGLAvailable } from '../lib/webgl';
import { SiteProvider, useSite } from '../building/SiteContext';
import { BootLabels } from '../hud/BootLabels';
import { FloorRail } from '../hud/FloorRail';
import { SpecPanel } from '../hud/SpecPanel';
import { LobbyPanel } from '../hud/LobbyPanel';
import { TimelinePanel } from '../hud/panels/TimelinePanel';
import { CorePanel } from '../hud/panels/CorePanel';
import { ServerPanel } from '../hud/panels/ServerPanel';
import { ArchivePanel } from '../hud/panels/ArchivePanel';
import { RoofPanel } from '../hud/panels/RoofPanel';
import { PlanFallback } from '../hud/PlanFallback';
import { SiteChrome } from '../hud/SiteChrome';
import { TitleBlock } from '../hud/TitleBlock';
import { STRINGS } from '../data/strings';
import '../styles/siteline.css';

// The entire WebGL experience (three, R3F, drei, gsap, every room) loads only
// when the 3D path actually renders — the plan fallback (mobile / no-WebGL)
// never downloads it. The print set loads only when the DOC drawer opens.
const SiteRoot = lazy(() => import('../scene/SiteRoot').then((m) => ({ default: m.SiteRoot })));
const PrintSet = lazy(() => import('../components/PrintSet').then((m) => ({ default: m.PrintSet })));

/* ?sheets renders the drawing set on screen for inspection — the printed
   R-002 footer points here. `?sheets` = the full A-000–A-600 set, `?sheets=r`
   = the two R-series résumé pages. Read once; this is a page mode, not state. */
const SHEETS_PARAM =
  typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('sheets') : null;

function SheetsStandalone() {
  const { lang } = useSite();
  return (
    <div className="site-sheets-standalone">
      <Suspense fallback={null}>
        <PrintSet lang={lang} preview standalone variant={SHEETS_PARAM === 'r' ? 'resume' : 'set'} />
      </Suspense>
    </div>
  );
}

function PrintDrawer() {
  const { printOpen, setPrintOpen, lang } = useSite();
  const t = STRINGS[lang];

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
    <div className="site-print-drawer" role="dialog" aria-label="SITE 009 · Résumé · R-series">
      <div className="site-print-drawer-bar">
        <div className="site-print-drawer-stamp">
          <span className="site-print-drawer-site">SITE 009 · SALIERI · REVISION A</span>
          <span className="site-print-drawer-doc">RÉSUMÉ · R-001 / R-002</span>
        </div>
        <div className="site-print-drawer-actions">
          <button type="button" className="site-btn" autoFocus onClick={() => window.print()}>
            {t.navDownload}
          </button>
          <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(false)}>
            {t.closeDoc}
          </button>
        </div>
      </div>
      <div className="site-print-drawer-body">
        <Suspense fallback={null}>
          <PrintSet lang={lang} preview variant="resume" />
        </Suspense>
      </div>
    </div>
  );
}

function SitelineShell() {
  const { prefer2d, reducedMotion, phase, bootDone, finishBoot, returnLobby, printOpen } = useSite();
  const [webgl] = useState(() => isWebGLAvailable());

  const usePlan = !webgl || prefer2d;

  useEffect(() => {
    // Plan mode skips the WebGL boot scene; reduced-motion starts with
    // bootDone already true so SiteRoot never mounts BootScene either.
    // Either way phase must leave 'boot' or the lobby thesis never mounts
    // and the rail stays hidden.
    if (phase === 'boot' && (usePlan || bootDone || reducedMotion)) {
      finishBoot();
    }
  }, [usePlan, phase, bootDone, reducedMotion, finishBoot]);

  useEffect(() => {
    // Escape returns to the lobby from any room (the print drawer owns Escape
    // while it is open, so defer to it). Keyboard parity for the floor rail.
    if (phase !== 'room' || printOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') returnLobby();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, printOpen, returnLobby]);

  return (
    <div className="site-app">
      <a className="site-skip" href="#site-main">
        Skip to content
      </a>

      {/* Identity before the scene in reading order — recruiter's who/how-to-reach. */}
      {!usePlan && <TitleBlock />}

      {!usePlan && (
        <Suspense fallback={null}>
          <SiteRoot webgl={webgl} />
        </Suspense>
      )}
      {usePlan && (
        <PlanFallback reason={!webgl ? 'webgl' : reducedMotion ? 'reduced' : 'mobile'} />
      )}

      <BootLabels />
      <SiteChrome />
      {!usePlan && <FloorRail />}
      <main id="site-main" className="site-main">
        <LobbyPanel />
        <SpecPanel />
        <TimelinePanel />
        <CorePanel />
        <ServerPanel />
        <ArchivePanel />
        <RoofPanel />
      </main>
      <PrintDrawer />
    </div>
  );
}

export default function SitelineApp() {
  return (
    <SiteProvider>{SHEETS_PARAM !== null ? <SheetsStandalone /> : <SitelineShell />}</SiteProvider>
  );
}
