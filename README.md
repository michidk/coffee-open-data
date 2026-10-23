# coffee-open-data

A small, machine-readable catalog for coffee equipment, roasters, and coffees.

- `taxonomy/` contains controlled vocabulary lists.
- `schemas/` contains JSON Schema 2020-12 definitions for each record type.
- `data/` contains one JSON object per record, grouped by collection.
- `scripts/validate.ts` checks every data record for valid JSON, required fields, unique kebab-case IDs, taxonomy references, and cross-collection references.
- Equipment and coffee records can retain property-level source evidence with URLs, source kinds, and retrieval timestamps.
- Coffee records capture brew range, decaf status, origin, region, farm, variety, process, roast level, and notes.

Run `npm run validate` with Node 22 or newer.
