// make.fun entry: u-shino-convince-the-ai-judge-to-visit-your-house-a-84092aee
// A letter in one image: the invitation is pre-rendered as entry.png
// (hand-lettered cream-paper letter, 1024x1024, under 1 MiB).
// This program only copies it to the output directory.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dest = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
const bytes = statSync(dest).size;
if (bytes <= 0) throw new Error("entry.png copied but empty");
if (bytes > 1048576) throw new Error(`entry.png too large: ${bytes} bytes`);
// Gate check: the output must be a whole PNG, so confirm the magic bytes.
const head = readFileSync(dest);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a valid PNG (bad magic bytes)");
}
console.log(`wrote ${dest} (${bytes} bytes)`);
