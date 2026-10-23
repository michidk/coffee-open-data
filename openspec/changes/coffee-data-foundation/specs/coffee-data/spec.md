# Coffee data package

## Requirements

### Requirement: Taxonomies provide stable IDs
The package SHALL provide equipment types, brew methods, processing methods, and coffee varieties as JSON arrays with unique lowercase kebab-case `id` values and non-empty `name` values.

### Requirement: Schemas describe record collections
The package SHALL provide JSON Schema 2020-12 files for manufacturers, grinders, espresso machines, brewers, coffees, and roasters.

### Requirement: Data collections have predictable locations
The package SHALL provide one directory per record collection under `data/`, with JSON records stored in the matching directory.

### Requirement: Validation is runnable locally
The package SHALL provide `scripts/validate.ts` and `npm run validate`; validation SHALL fail for malformed JSON, missing required fields, invalid IDs, or duplicate IDs within a collection.
