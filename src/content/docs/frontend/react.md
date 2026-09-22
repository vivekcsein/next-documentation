---
description: The React patterns worth defaulting to — composition over configuration, colocated state, and when to reach for context.
date: 2026-09-08
keywords: [react, components, hooks, state]
---

# React patterns I default to

## Composition over configuration

A component that takes five boolean props to change its behavior is usually a sign it should take `children` instead, and let the caller compose the variation.

## Colocate state until it hurts

State starts in the component that renders it. It only moves up — to a parent, to context, to a store — once two unrelated components actually need to share it.

## Context is for identity, not data

Theme, auth, locale: things that are true for the whole subtree. Fetched data usually belongs in a query cache instead, so it isn't tied to the render tree's lifetime.
