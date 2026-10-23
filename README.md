# coffee-open-data

A small, machine-readable catalog for coffee equipment, roasters, and coffees.

- `taxonomy/` contains controlled vocabulary lists.
- `schemas/` contains JSON Schema 2020-12 definitions for each record type.
- `data/` contains one JSON object per record, grouped by collection.
- `scripts/validate.ts` checks every data record for valid JSON, required fields, unique kebab-case IDs, taxonomy references, and cross-collection references.
- Equipment and coffee records can retain property-level source evidence with URLs, source kinds, and retrieval timestamps.
- Coffee records capture brew range, decaf status, origin, region, farm, variety, process, roast level, and notes.

Run `npm run validate` with Node 22 or newer.

The taxonomies keep lookup IDs separate from display names. Each entry also carries a category, and can carry aliases or domain metadata such as a coffee species. This follows the useful split in BrewForm between a stable controlled value and the information used to search, group, and explain it.

The catalogs are intentionally smaller than a commercial equipment database. New records should add a stable ID, a clear name, a category, and a source in the record's evidence when the value comes from research. Keep species, cultivars, processing methods, and market names as separate concepts rather than putting them in one undifferentiated list.
