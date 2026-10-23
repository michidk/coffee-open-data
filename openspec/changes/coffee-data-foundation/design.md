# Design

Use JSON for data and schemas. Taxonomies are arrays of `{ "id", "name" }` entries. Collection records are individual JSON objects under their matching `data/` directory. IDs use lowercase kebab-case. `scripts/validate.ts` performs local structural checks without adding a dependency.
