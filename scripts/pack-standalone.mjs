import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");
const out = path.join(root, "dist", "standalone");

if (!existsSync(standalone)) {
  console.error("`.next/standalone` topilmadi. Avval `npm run build` ni ishga tushiring.");
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync(standalone, out, { recursive: true });
cpSync(path.join(root, "public"), path.join(out, "public"), { recursive: true });
cpSync(path.join(root, ".next", "static"), path.join(out, ".next", "static"), {
  recursive: true,
});

console.log(`Tayyor: ${out}`);
console.log("Serverga yuklash uchun shu papkani arxivlang.");
