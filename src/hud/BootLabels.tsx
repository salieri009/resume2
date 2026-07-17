import { useSite } from '../building/SiteContext';

/** Micro labels during / after boot — CAD title block voice. */
export function BootLabels() {
  const { phase, bootDone } = useSite();
  const visible = phase === 'boot' || bootDone;

  if (!visible) return null;

  return (
    <div className={`site-boot-labels${phase === 'boot' && !bootDone ? ' is-inking' : ''}`} aria-hidden="true">
      <span>SITE 009</span>
      <span>SALIERI</span>
      <span>ORTHOGRAPHIC MODE</span>
      <span>REVISION A</span>
    </div>
  );
}
