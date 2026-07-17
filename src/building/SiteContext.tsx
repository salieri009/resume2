import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Lang, Theme } from '../data/types';
import { INK, PAPER } from '../scene/palette';
import { FLOORS, parseHash, toHash, type FloorId, type RoomId, SHIPPED_ROOMS } from './program';

export type Phase = 'boot' | 'lobby' | 'room' | 'end';

interface SiteState {
  phase: Phase;
  floor: FloorId;
  room: RoomId;
  lang: Lang;
  theme: Theme;
  reducedMotion: boolean;
  prefer2d: boolean;
  printOpen: boolean;
  bootDone: boolean;
  /** Sub-station stop inside a room with a lateral pan (timeline hall, archive). */
  subStop: number;
  setSubStop: (i: number) => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  setPrintOpen: (open: boolean) => void;
  finishBoot: () => void;
  goTo: (floor: FloorId, room: RoomId) => void;
  returnLobby: () => void;
  /** The roof's farewell — the building is undrawn (bible 03). */
  endSite: () => void;
  /** Reopen the set: run the boot again from the empty sheet. */
  reopen: () => void;
}

const SiteCtx = createContext<SiteState | null>(null);

const LANG_KEY = 'sal-lang';
const THEME_KEY = 'sal-theme';

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'ko' || stored === 'ja') return stored;
  } catch {
    /* private */
  }
  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('ja')) return 'ja';
  return 'en';
}

function initialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function initialReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initialPrefer2d(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const bootLoc = parseHash(window.location.hash);
  const [phase, setPhase] = useState<Phase>('boot');
  const [floor, setFloor] = useState<FloorId>(bootLoc.floor);
  const [room, setRoom] = useState<RoomId>(bootLoc.room);
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [reducedMotion] = useState(initialReduced);
  const [prefer2d, setPrefer2d] = useState(initialPrefer2d);
  const [printOpen, setPrintOpen] = useState(false);
  const [bootDone, setBootDone] = useState(reducedMotion);
  const [subStop, setSubStop] = useState(0);
  /** Guards late/duplicate boot completion from resetting lobby after goTo. */
  const bootSettledRef = useRef(false);
  /** Latest phase for finishBoot — avoids settling to lobby after L0→room nav. */
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const roomRef = useRef(room);
  roomRef.current = room;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setPrefer2d(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.experience = 'siteline';
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* private */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? PAPER : INK);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* private */
    }
  }, [lang]);

  const syncHash = useCallback((f: FloorId, r: RoomId) => {
    const next = toHash(f, r);
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next);
    }
  }, []);

  useEffect(() => {
    const onHash = () => {
      const loc = parseHash(window.location.hash);
      setFloor(loc.floor);
      setRoom(loc.room);
      roomRef.current = loc.room;
      setSubStop(0);
      if (loc.room !== 'lobby' && SHIPPED_ROOMS.includes(loc.room)) {
        phaseRef.current = 'room';
        setPhase('room');
      } else if (bootDone) {
        phaseRef.current = 'lobby';
        setPhase('lobby');
        setRoom('lobby');
        roomRef.current = 'lobby';
        setFloor('L0');
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [bootDone]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  const finishBoot = useCallback(() => {
    setBootDone(true);
    // Late GSAP / StrictMode / plan-fallback completions must not yank the
    // visitor back to the lobby thesis after they already left via goTo
    // (repro: hard refresh on #/L0 then navigate to #/L1/timeline).
    // Bail only when the visitor has actually advanced past boot — a deep
    // load (#/L2/crowd) legitimately starts with room ≠ lobby while phase
    // is still 'boot', and finishBoot must carry them into that room
    // (repro: hard refresh on #/L1/timeline stayed stuck at the boot
    // station with no rail and an opaque shell).
    if (bootSettledRef.current) return;
    if (phaseRef.current === 'room' || phaseRef.current === 'end') {
      bootSettledRef.current = true;
      return;
    }
    bootSettledRef.current = true;

    const loc = parseHash(window.location.hash);
    if (loc.room !== 'lobby' && SHIPPED_ROOMS.includes(loc.room)) {
      setFloor(loc.floor);
      setRoom(loc.room);
      roomRef.current = loc.room;
      phaseRef.current = 'room';
      setPhase('room');
      syncHash(loc.floor, loc.room);
      return;
    }
    phaseRef.current = 'lobby';
    setPhase('lobby');
    setFloor('L0');
    setRoom('lobby');
    roomRef.current = 'lobby';
    syncHash('L0', 'lobby');
  }, [syncHash]);

  const goTo = useCallback(
    (f: FloorId, r: RoomId) => {
      const floorDef = FLOORS.find((x) => x.id === f);
      const entry = floorDef?.rooms.find((x) => x.id === r);
      if (!entry) return;
      if (!SHIPPED_ROOMS.includes(r) && r !== 'lobby') return;
      // Navigation means boot is over — block any pending finishBoot reset.
      // Mark settled + write hash BEFORE React state so a late finishBoot
      // that slipped past the ref still honors #/L1/timeline via parseHash.
      const nextPhase: Phase = r === 'lobby' ? 'lobby' : 'room';
      bootSettledRef.current = true;
      phaseRef.current = nextPhase;
      roomRef.current = r;
      setBootDone(true);
      syncHash(f, r);
      setFloor(f);
      setRoom(r);
      setSubStop(0);
      setPhase(nextPhase);
    },
    [syncHash],
  );

  const endSite = useCallback(() => {
    phaseRef.current = 'end';
    setPhase('end');
    setSubStop(0);
  }, []);

  const reopen = useCallback(() => {
    bootSettledRef.current = false;
    phaseRef.current = 'boot';
    roomRef.current = 'lobby';
    setBootDone(false);
    setPhase('boot');
    setFloor('L0');
    setRoom('lobby');
    setSubStop(0);
    syncHash('L0', 'lobby');
  }, [syncHash]);

  const returnLobby = useCallback(() => {
    bootSettledRef.current = true;
    phaseRef.current = 'lobby';
    roomRef.current = 'lobby';
    setBootDone(true);
    setPhase('lobby');
    setFloor('L0');
    setRoom('lobby');
    setSubStop(0);
    syncHash('L0', 'lobby');
  }, [syncHash]);

  const value = useMemo<SiteState>(
    () => ({
      phase,
      floor,
      room,
      lang,
      theme,
      reducedMotion,
      prefer2d,
      printOpen,
      bootDone,
      subStop,
      setSubStop,
      setLang,
      setTheme,
      setPrintOpen,
      finishBoot,
      goTo,
      returnLobby,
      endSite,
      reopen,
    }),
    [
      phase,
      floor,
      room,
      lang,
      theme,
      reducedMotion,
      prefer2d,
      printOpen,
      bootDone,
      subStop,
      setLang,
      setTheme,
      finishBoot,
      goTo,
      returnLobby,
      endSite,
      reopen,
    ],
  );

  return <SiteCtx.Provider value={value}>{children}</SiteCtx.Provider>;
}

export function useSite(): SiteState {
  const ctx = useContext(SiteCtx);
  if (!ctx) throw new Error('useSite outside SiteProvider');
  return ctx;
}
