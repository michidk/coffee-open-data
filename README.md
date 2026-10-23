# coffee-open-data

A small, machine-readable catalog for coffee equipment, roasters, and coffees.

- `taxonomy/` contains controlled vocabulary lists.
- `schemas/` contains JSON Schema 2020-12 definitions for each record type.
- `data/` contains one JSON object per record, grouped by collection.
- `scripts/validate.ts` checks every data record for valid JSON, required fields, and unique kebab-case IDs.

Run `npm run validate` with Node 22 or newer.
