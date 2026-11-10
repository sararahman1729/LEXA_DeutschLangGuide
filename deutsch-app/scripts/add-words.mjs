// Usage: npm run add-words -- my-words.csv
// CSV/TSV columns: level, german, english, pronunciation (last two optional). Level is A1 or A2.
import fs from "node:fs";
const file = process.argv[2];
if (!file) { console.error("Usage: npm run add-words -- my-words.csv"); process.exit(1); }
const out = "data/words.json";
const words = JSON.parse(fs.readFileSync(out, "utf8"));
const seen = new Set(words.map(w => w.l + "|" + w.d.toLowerCase()));
function parse(line) {
  const r = []; let c = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) { if (ch === '"' && line[i + 1] === '"') { c += '"'; i++; } else if (ch === '"') q = false; else c += ch; }
    else if (ch === '"') q = true;
    else if (ch === "," || ch === "\t") { r.push(c); c = ""; }
    else c += ch;
  }
  r.push(c);
  return r.map(s => s.trim());
}
let added = 0, dupes = 0, bad = 0;
for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
  if (!line.trim()) continue;
  const [l, d, e = "", p = ""] = parse(line);
  if (!/^A[12]$/i.test(l) || !d) { bad++; continue; }
  const k = l.toUpperCase() + "|" + d.toLowerCase();
  if (seen.has(k)) { dupes++; continue; }
  seen.add(k);
  words.push({ l: l.toUpperCase(), d, e, p });
  added++;
}
fs.writeFileSync(out, JSON.stringify(words, null, 1));
console.log(`Added ${added}, duplicates ${dupes}, skipped rows ${bad} (header or bad level). Total ${words.length}.`);
