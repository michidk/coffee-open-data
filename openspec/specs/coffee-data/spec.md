# coffee-data Specification

## Purpose
Define a portable, auditable coffee catalog whose stable IDs and controlled vocabularies can be consumed by applications such as Roastbook.

## Requirements

### Requirement: Taxonomies provide stable IDs
The package SHALL provide equipment types, brew methods, processing methods, and coffee varieties as JSON arrays. Every entry SHALL have a unique lowercase kebab-case `id` and a non-empty `name`. Entries MAY include a plain-language `description` and an `aliases` array for import matching. Each taxonomy SHALL include an `other` entry for documented values outside the controlled vocabulary.

#### Scenario: Read a taxonomy
- **WHEN** a consumer loads a taxonomy file
- **THEN** each entry has a unique `id` and a non-empty `name`

#### Scenario: Read a taxonomy entry
- **WHEN** a consumer loads a taxonomy file
- **THEN** each entry has a unique `id` and non-empty `name`, and optional descriptions or aliases can be displayed or searched

#### Scenario: Match an imported name
- **WHEN** an imported value matches an entry name or alias
- **THEN** the consumer stores the stable taxonomy `id`

#### Scenario: Preserve an uncommon value
- **WHEN** a value is documented but absent from the controlled list
- **THEN** the consumer can use the taxonomy’s `other` entry while retaining the original value in the record’s notes or evidence

### Requirement: Schemas describe record collections
The package SHALL provide JSON Schema 2020-12 files for manufacturers, grinders, espresso machines, brewers, coffees, and roasters. Schemas SHALL keep shared identity fields at the record root, use references to stable IDs for relationships, and encode measurements as numeric properties whose names include their unit.

#### Scenario: Validate a record shape
- **WHEN** a consumer loads a schema
- **THEN** it can identify the required fields for that record type

#### Scenario: Resolve a relationship
- **WHEN** a consumer loads a grinder or coffee record
- **THEN** `manufacturerId` or `roasterId` identifies the related record without duplicating its full object

#### Scenario: Interpret a measurement
- **WHEN** a consumer reads a property such as `burrDiameterMm` or `capacityMl`
- **THEN** the value is numeric and the property name identifies the unit

### Requirement: Data collections have predictable locations
The package SHALL provide one directory per record collection under `data/`, with JSON records stored in the matching directory. Records SHALL use stable lowercase kebab-case IDs so references remain valid when display names change.

#### Scenario: Locate a collection
- **WHEN** a consumer needs coffee records
- **THEN** it reads JSON files from `data/coffees/`

#### Scenario: Rename a display name
- **WHEN** a record’s `name` changes
- **THEN** references using its `id` remain unchanged

### Requirement: Validation is runnable locally
The package SHALL provide `scripts/validate.ts` and `npm run validate`; validation SHALL fail for malformed JSON, missing required fields, invalid IDs, duplicate IDs within a collection, invalid taxonomy IDs, or dangling relationship IDs.

#### Scenario: Run validation
- **WHEN** a contributor runs `npm run validate`
- **THEN** the command exits successfully for valid data and exits non-zero for invalid data

#### Scenario: Reject a dangling reference
- **WHEN** a coffee references a roaster ID that has no matching roaster record
- **THEN** validation exits non-zero and identifies the missing relationship

### Requirement: Coffee records preserve provenance
A coffee record SHALL support bean type (`espresso`, `filter`, or `omni`), decaffeination, origin, region, farm, variety, processing method, roast level, and notes. A coffee MAY reference a roaster by `roasterId`.

#### Scenario: Describe a coffee
- **WHEN** a consumer loads a coffee record
- **THEN** it can distinguish its intended brew range, decaffeination status, origin, processing, and roast level

### Requirement: Records can carry source evidence
Equipment and coffee records MAY include property-level evidence. Each evidence item SHALL include a property key, HTTP(S) source URL, source kind, and retrieval timestamp, and MAY retain the raw value and unit.

#### Scenario: Audit a researched property
- **WHEN** a consumer inspects a measured property
- **THEN** it can find the source URL, source kind, and time the value was retrieved
