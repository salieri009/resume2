import type { ProjectDecision, ProjectTradeoff } from '../data/types';

/**
 * Design notes attached to a section-drawing floor: the decisions and
 * rejected alternatives whose text literally names that floor's component.
 *
 * There is no authored node↔decision mapping in the data layer, and inventing
 * one here would put editorial claims in a util. Literal mention is the
 * honest criterion — it can only surface prose the author actually wrote
 * about that component. It works across locales because the KO/JA copy keeps
 * tech names in Latin script ("Spring Boot 게이트웨이", "推論サービスにFastAPI").
 */

export interface SectionNote {
  kind: 'decision' | 'tradeoff';
  title: string;
  body: string;
}

/** Generic trailing words that make a poor match on their own. */
const GENERIC = new Set(['API', 'UI', 'Feed', 'Views', 'Layer', 'System', 'Systems', 'Client', 'Pool', 'Field', 'Events', 'Alerts', 'Strategies', 'Middleware', 'Controllers', 'Graph', 'Entity', 'per']);

/**
 * Candidate substrings a node label can be recognised by in prose.
 * "FastAPI · YOLOv8" → FastAPI, YOLOv8 · "Spring Boot API" → Spring Boot
 * "DAO per Entity" → DAO · "Perlin Fluid Field" → Perlin Fluid, Perlin
 */
function candidatesFor(label: string): string[] {
  const out = new Set<string>([label]);
  for (const rawSegment of label.split('·')) {
    const segment = rawSegment.trim();
    if (segment.length >= 3) out.add(segment);
    const words = segment.split(/\s+/);
    if (words.length > 1) {
      const withoutLast = words.slice(0, -1).join(' ');
      if (withoutLast.length >= 3 && !GENERIC.has(withoutLast)) out.add(withoutLast);
      if (words[0].length >= 3 && !GENERIC.has(words[0])) out.add(words[0]);
    }
  }
  return [...out];
}

export function notesForNodes(
  nodes: string[],
  decisions: ProjectDecision[],
  tradeoffs: ProjectTradeoff[],
): SectionNote[][] {
  return nodes.map((label) => {
    const cands = candidatesFor(label);
    const mentions = (text: string) => cands.some((c) => text.includes(c));
    const notes: SectionNote[] = [];
    for (const d of decisions) {
      if (mentions(d.choice) || mentions(d.why)) {
        notes.push({ kind: 'decision', title: d.choice, body: d.why });
      }
    }
    for (const tr of tradeoffs) {
      if (mentions(tr.rejected) || mentions(tr.why)) {
        notes.push({ kind: 'tradeoff', title: tr.rejected, body: tr.why });
      }
    }
    return notes;
  });
}
