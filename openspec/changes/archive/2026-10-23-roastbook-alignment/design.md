# Design

Use stable lowercase kebab-case IDs for references between files. Keep shared fields (`id`, `name`, manufacturer or roaster references, URLs, notes) at the record root. Keep measurements numeric and name their unit in the property (`capacityMl`, `burrDiameterMm`, `brewPressureMaximumBar`). Use controlled values from `taxonomy/` for categorical fields. Represent source evidence as an optional array with URL, source kind, captured value, and retrieval timestamp so a consumer can distinguish a researched value from an unverified claim.

The initial package remains file-based. It does not add database migrations, user-owned purchase history, images, or brew logs from Roastbook.
