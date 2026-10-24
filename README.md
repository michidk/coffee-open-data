# coffee-open-data

A small, portable reference catalog for coffee equipment, roasters, and coffees.
The data is plain JSON so it can be read by scripts, imported into a database, or bundled into an application without a service dependency.

## What is here

```text
coffee-open-data/
├── taxonomy/                         # controlled vocabularies and relationships
├── schemas/                          # JSON Schema 2020-12 definitions
├── data/                             # one JSON record per file, by collection
└── scripts/validate.ts               # structural and cross-reference checks
```

The repository currently provides these controlled vocabularies:

- `equipment-types.json` covers espresso machines, grinders, pour-over and immersion brewers, kettles, scales, roasters, and accessories.
- `brew-methods.json` covers espresso, V60, Chemex, Kalita Wave, batch brew, immersion, pressure, vacuum, cold brew, cezve, and related methods.
- `brew-method-equipment.json` describes which equipment types are compatible with each brew method.
- `processing-methods.json` covers washed, natural, honey, wet-hulled, and other post-harvest processes.
- `fermentation-methods.json` keeps fermentation styles such as anaerobic and carbonic maceration separate from post-harvest processing.
- `coffee-varieties.json` covers species and cultivars, including Arabica, Robusta, Bourbon, Typica, Geisha, SL28, SL34, and Pacamara.
- `roast-levels.json` and `coffee-types.json` provide controlled values for roast development and brew range.
- Grinder, espresso-machine, pump, water-source, control-mode, source-type, and flavor-note vocabularies support detailed records.

Taxonomy entries use stable lowercase kebab-case IDs. Display names, descriptions, categories, and aliases can change without breaking references. Entries may include domain metadata such as a coffee species or a flavor-note parent.

## Record model

Records have a stable `id` and human-readable `name`. Relationships use IDs such as `manufacturerId` and `roasterId`. Measurements name their unit in the property, for example `burrSizeMm`, `capacityMl`, and `brewPressureMaximumBar`.

Coffee records can describe brew range, decaffeination, origin, region, farm, variety, processing, fermentation, roast level, and tasting notes. Flavor notes use IDs from `taxonomy/flavor-wheel.json`. The current flavor vocabulary is a project-authored starter set, not a copy of the full SCA wheel.

Equipment and coffee records can include property-level evidence with a source URL, source kind, raw value or unit, and retrieval time. Source kinds are controlled by `taxonomy/source-types.json`.

The repository does not contain a database, application runtime, or user-owned brew history. The `data/` collection directories are ready for contributed records and currently contain only `.gitkeep` placeholders.

## Schemas

The schemas define records for manufacturers, grinders, espresso machines, brewers, coffees, and roasters. `taxonomy-entry.schema.json` defines the common shape for vocabulary entries. `brew-method-equipment.schema.json` defines compatibility records.

The schemas use controlled values where a field affects interoperability. For example, coffee `roastLevel` values come from `roast-levels.json`, grinder burr mechanisms come from `grinder-burr-mechanisms.json`, and espresso-machine pump types come from `pump-types.json`.

## Validate locally

Requires Node.js 22 or newer.

```bash
npm run validate
```

Validation checks JSON syntax, required fields, unique IDs, taxonomy IDs, taxonomy parent references, compatibility records, and relationships between data collections.

## Contributing data

1. Use a stable lowercase kebab-case ID.
2. Keep one JSON object in one file under the matching `data/` collection.
3. Use an existing taxonomy ID when one fits. Use `other` only when the original value is retained in notes or evidence.
4. Keep measurements numeric and include the unit in the property name.
5. Add source evidence for researched values.
6. Add a compatibility relationship when a new brew method or equipment type changes the supported combinations.
7. Run `npm run validate` before committing.

When adding a controlled value, include a description and aliases when they help imports or search. Keep species, cultivars, processing methods, fermentation methods, flavor notes, and market names as separate concepts. Do not copy a third-party vocabulary wholesale without recording its source and redistribution terms.

## License

The code and schema definitions are available under the [MIT License](LICENSE). Data contributors should include source and licensing information for records they add.
