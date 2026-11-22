import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

const size = statSync(dst).size;
if (size === 0 || size > 1024 * 1024) {
  throw new Error(`entry.png size out of range: ${size}`);
}
console.log(`wrote ${dst} (${size} bytes)`);
