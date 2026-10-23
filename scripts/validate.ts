import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

type JsonObject = Record<string, unknown>;
const root = new URL("..", import.meta.url);
const requiredByCollection: Record<string, string[]> = {
  manufacturers: ["id", "name"],
  grinders: ["id", "name", "manufacturerId"],
  "espresso-machines": ["id", "name", "manufacturerId"],
  brewers: ["id", "name", "manufacturerId", "brewMethods"],
  coffees: ["id", "name", "roasterId", "origin", "variety", "processingMethod"],
  roasters: ["id", "name", "roastingLocation"],
};
const isObject = (value: unknown): value is JsonObject => typeof value === "object" && value !== null && !Array.isArray(value);
const isId = (value: unknown): value is string => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

const errors: string[] = [];
for (const [collection, required] of Object.entries(requiredByCollection)) {
  const dir = new URL(`./data/${collection}/`, root);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
  const ids = new Set<string>();
  for (const file of files) {
    const path = join(dir.pathname, file);
    let value: unknown;
    try { value = JSON.parse(await readFile(path, "utf8")); }
    catch (error) { errors.push(`${path}: invalid JSON (${String(error)})`); continue; }
    if (!isObject(value)) { errors.push(`${path}: record must be an object`); continue; }
    for (const field of required) if (!(field in value)) errors.push(`${path}: missing ${field}`);
    if (!isId(value.id)) errors.push(`${path}: id must be lowercase kebab-case`);
    if (typeof value.id === "string" && ids.has(value.id)) errors.push(`${path}: duplicate id ${value.id}`);
    if (typeof value.id === "string") ids.add(value.id);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("coffee-open-data: validation passed");
