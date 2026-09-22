---
description: The material-setup habits that make Blender scenes easier to light and re-use.
date: 2026-08-28
keywords: [blender, materials, shading, 3d]
---

# Setting up materials in Blender

## Name materials before you forget

An unnamed "Material.003" is unfindable three scenes later. Name it for what it is — `metal-brushed`, `glass-frosted` — the moment you create it.

## Use a base roughness map, always

Even a flat grey roughness value beats a pure 0 or 1 — real surfaces are never perfectly matte or perfectly mirrored, and a slight variation reads as far more physical.

## Keep node graphs shallow

A reusable node group beats a fifteen-node chain repeated across twelve materials. Group early, not once it's already unmanageable.
