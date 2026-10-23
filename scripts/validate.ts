import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

type JsonObject = Record<string, unknown>;
const root = new URL("..", import.meta.url);
const requiredByCollection: Record<string, string[]> = {
  manufacturers: ["id", "name"],
  grinders: ["id", "name", "manufacturerId"],
  "espresso-machines": ["id", "name", "manufacturerId"],
  brewers: ["id", "name", "manufacturerId", "brewMethods"],
  coffees: ["id", "name", "origin", "variety", "processingMethod"],
  roasters: ["id", "name", "roastingLocation"],
};
const isObject = (value: unknown): value is JsonObject => typeof value === "object" && value !== null && !Array.isArray(value);
const isId = (value: unknown): value is string => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

const errors: string[] = [];
const taxonomyIds = new Map<string, Set<string>>();
for (const file of (await readdir(new URL("./taxonomy/", root))).filter((name) => name.endsWith(".json"))) {
  try {
    const entries = JSON.parse(await readFile(new URL(`./taxonomy/${file}`, root), "utf8")) as unknown;
    if (!Array.isArray(entries)) throw new Error("taxonomy must be an array");
    const ids = new Set<string>();
    for (const entry of entries) {
      if (!isObject(entry) || !isId(entry.id) || typeof entry.name !== "string" || !entry.name.trim() || ids.has(entry.id)) errors.push(`taxonomy/${file}: invalid or duplicate entry`);
      if (isObject(entry) && typeof entry.id === "string") ids.add(entry.id);
    }
    taxonomyIds.set(file, ids);
  } catch (error) { errors.push(`taxonomy/${file}: invalid JSON (${String(error)})`); }
}
for (const [collection, required] of Object.entries(requiredByCollection)) {
  const dir = new URL(`./data/${collection}/`, root);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
  const ids = new Set<string>();
  const recordIds = new Set<string>();
  for (const file of files) {
    const path = join(dir.pathname, file);
    let value: unknown;
    try { value = JSON.parse(await readFile(path, "utf8")); }
    catch (error) { errors.push(`${path}: invalid JSON (${String(error)})`); continue; }
    if (!isObject(value)) { errors.push(`${path}: record must be an object`); continue; }
    for (const field of required) if (!(field in value)) errors.push(`${path}: missing ${field}`);
    if (!isId(value.id)) errors.push(`${path}: id must be lowercase kebab-case`);
    if (typeof value.id === "string" && ids.has(value.id)) errors.push(`${path}: duplicate id ${value.id}`);
    if (typeof value.id === "string") { ids.add(value.id); recordIds.add(value.id); }
    if (collection === "coffees" && typeof value.processingMethod === "string" && !taxonomyIds.get("processing-methods.json")?.has(value.processingMethod)) errors.push(`${path}: unknown processingMethod ${value.processingMethod}`);
    if (collection === "coffees" && Array.isArray(value.variety) && value.variety.some((id) => typeof id !== "string" || !taxonomyIds.get("coffee-varieties.json")?.has(id))) errors.push(`${path}: unknown coffee variety`);
  }
}
const collections = new Map<string, Set<string>>();
for (const [collection, required] of Object.entries(requiredByCollection)) {
  const dir = new URL(`./data/${collection}/`, root); const ids = new Set<string>();
  for (const file of (await readdir(dir)).filter((name) => name.endsWith(".json"))) { try { const v = JSON.parse(await readFile(join(dir.pathname, file), "utf8")); if (isObject(v) && typeof v.id === "string") ids.add(v.id); } catch {} }
  collections.set(collection, ids);
}
for (const file of (await readdir(new URL("./data/coffees/", root))).filter((name) => name.endsWith(".json"))) { const path = `data/coffees/${file}`; const v = JSON.parse(await readFile(new URL(`./${path}`, root), "utf8")) as unknown; if (isObject(v) && typeof v.roasterId === "string" && !collections.get("roasters")?.has(v.roasterId)) errors.push(`${path}: unknown roasterId ${v.roasterId}`); }
for (const collection of ["grinders", "espresso-machines", "brewers"]) for (const file of (await readdir(new URL(`./data/${collection}/`, root))).filter((name) => name.endsWith(".json"))) { const path = `data/${collection}/${file}`; const v = JSON.parse(await readFile(new URL(`./${path}`, root), "utf8")) as unknown; if (isObject(v) && typeof v.manufacturerId === "string" && !collections.get("manufacturers")?.has(v.manufacturerId)) errors.push(`${path}: unknown manufacturerId ${v.manufacturerId}`); }
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("coffee-open-data: validation passed");
