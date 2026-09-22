---
description: Why Hono is my default for small APIs — the parts that matter for a Next.js-adjacent backend.
date: 2026-09-05
keywords: [hono, backend, api, typescript]
---

# Why I reach for Hono

Hono is a fast, web-standard-based router that runs the same way on Node, Bun, and edge runtimes — one API regardless of where it's deployed.

## Middleware is just functions

No framework-specific plugin system to learn — a middleware is `(c, next) => {}`, composable the same way anywhere else in the codebase.

## Typed end to end

Combined with `hono/zod-validator`, request bodies and params are validated and typed from the same schema, so the client and server never drift silently.
