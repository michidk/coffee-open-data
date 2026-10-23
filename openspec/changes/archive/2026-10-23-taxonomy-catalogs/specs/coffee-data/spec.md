# Coffee data package

## MODIFIED Requirements

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
