// news-image-20261120 entry (Node 22, standard library only).
// The entry image is entry.png beside this file: a newspaper front page
// summing up Friday 20 November 2026 — Kyiv under fire, Poland's airspace
// breached, missiles hitting Riyadh, the EU-UK summit deal, markets sliding
// and Italy's fine on Meta. The program copies it to /output/entry.png.
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 px,
// and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);
// Deterministic by construction: a plain byte copy, so both grader runs
// write identical bytes. Guard against a truncated copy before exiting.
if (statSync(source).size !== statSync(target).size) {
  throw new Error('entry.png copy incomplete');
}
