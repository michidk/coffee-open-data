# Design

Each taxonomy remains a JSON array of objects with a required `id` and `name`. Entries may include a plain-language `description` and `aliases` for search and import matching. IDs use lowercase kebab-case and the `other` entry handles values outside the controlled vocabulary. The catalogs stay independent so consumers can load only the vocabulary they need.
