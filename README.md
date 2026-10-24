# coffee-open-data

A small, portable reference catalog for coffee equipment, roasters, and coffees.
The data is plain JSON so it can be used from a script, imported into a database, or bundled into an application without a service dependency.

## What is here

```text
coffee-open-data/
├── taxonomy/                 # shared vocabularies and lookup IDs
├── schemas/                  # JSON Schema 2020-12 record definitions
│   └── taxonomy-entry.schema.json
├── data/                     # one JSON record per file, grouped by collection
└── scripts/validate.ts       # structural and cross-reference checks
```

The current taxonomies cover:

- Equipment types, including espresso machines, grinders, brewers, kettles, scales, and accessories.
- Brew methods, including espresso, pour over, batch brew, immersion, pressure, vacuum, and cold brew.
- Processing methods, including washed, natural, honey, anaerobic, wet hulled, and carbonic maceration.
- Coffee species and cultivars, including Arabica, Robusta, Bourbon, Typica, Geisha, SL28, SL34, and Pacamara.
- Roast levels, coffee types, fermentation methods, grinder properties, espresso-machine properties, pump types, water sources, and evidence source types.
- A starter flavor vocabulary with parent categories and a separate brew-method/equipment compatibility relation.

Taxonomy entries use stable lowercase kebab-case IDs. Display names, descriptions, categories, and aliases can change without breaking references.

## Record model

Records have a stable `id` and human-readable `name`. Relationships use IDs such as `manufacturerId` and `roasterId`. Measurements name their unit in the property, for example `burrSizeMm`, `capacityMl`, and `brewPressureMaximumBar`.

Coffee records can describe brew range, decaffeination, origin, region, farm, variety, processing, fermentation, roast level, and tasting notes. Flavor notes use IDs from `taxonomy/flavor-wheel.json`; the starter vocabulary is project-authored and does not copy the full SCA wheel. Equipment and coffee records can include property-level evidence with a source URL, source kind, raw value or unit, and retrieval time.

The repository does not contain a database, application runtime, or user-owned brew history. It is a source package for those systems.

## Validate locally

Requires Node.js 22 or newer.

```bash
npm run validate
```

Validation checks JSON syntax, required fields, unique IDs, taxonomy references, and relationships between collections. Empty collection directories contain `.gitkeep` files until records are added.

## Contributing data

1. Use a stable lowercase kebab-case ID.
2. Keep one JSON object in one file under the matching `data/` collection.
3. Use an existing taxonomy ID when one fits. Use `other` only when the original value is retained in notes or evidence.
4. Keep measurements numeric and include the unit in the property name.
5. Add source evidence for researched values.
6. Run `npm run validate` before committing.

When adding a new controlled value, include a description and aliases when they help imports or search. Keep species, cultivars, processing methods, fermentation methods, flavor notes, and market names as separate concepts. Add compatibility relationships to `taxonomy/brew-method-equipment.json` instead of embedding equipment assumptions in brew-method names.

## License

The code and schema definitions are available under the [MIT License](LICENSE). Data contributors should include source and licensing information for records they add.
