# coffee-data Specification

## Purpose
TBD - created by archiving change coffee-data-foundation. Update Purpose after archive.

## Requirements

### Requirement: Taxonomies provide stable IDs
The package SHALL provide equipment types, brew methods, processing methods, and coffee varieties as JSON arrays with unique lowercase kebab-case `id` values and non-empty `name` values.

#### Scenario: Read a taxonomy
- **WHEN** a consumer loads a taxonomy file
- **THEN** each entry has a unique `id` and a non-empty `name`

### Requirement: Schemas describe record collections
The package SHALL provide JSON Schema 2020-12 files for manufacturers, grinders, espresso machines, brewers, coffees, and roasters.

#### Scenario: Validate a record shape
- **WHEN** a consumer loads a schema
- **THEN** it can identify the required fields for that record type

### Requirement: Data collections have predictable locations
The package SHALL provide one directory per record collection under `data/`, with JSON records stored in the matching directory.

#### Scenario: Locate a collection
- **WHEN** a consumer needs coffee records
- **THEN** it reads JSON files from `data/coffees/`

### Requirement: Validation is runnable locally
The package SHALL provide `scripts/validate.ts` and `npm run validate`; validation SHALL fail for malformed JSON, missing required fields, invalid IDs, or duplicate IDs within a collection.

#### Scenario: Run validation
- **WHEN** a contributor runs `npm run validate`
- **THEN** the command exits successfully for valid data and exits non-zero for invalid data
