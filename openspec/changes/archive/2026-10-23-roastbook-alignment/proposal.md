# Proposal: align the coffee data model with Roastbook

## Why

Roastbook keeps shared equipment identity separate from type-specific properties, models coffee provenance and roast attributes explicitly, and records evidence for researched properties. The current package has the right collection boundaries but loses those useful distinctions.

## What Changes

- Add shared identity, provenance, and source evidence requirements to the coffee data specification.
- Expand the coffee and roaster schemas with Roastbook-inspired fields.
- Make equipment schemas support manufacturer references, product/manual links, and measured properties with explicit units.
- Keep the package as portable JSON files with stable string IDs.
