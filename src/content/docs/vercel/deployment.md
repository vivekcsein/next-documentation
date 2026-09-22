---
description: Deploying a Next.js app to Vercel — project setup, environment variables, and preview deployments.
date: 2026-09-10
keywords: [vercel, deployment, nextjs, ci]
---

# Deploying to Vercel

Vercel builds and deploys on every push once a repository is connected — no pipeline config required for a standard Next.js app.

## Environment variables

Set them per environment (Production, Preview, Development) in the project's Settings → Environment Variables. Anything prefixed `NEXT_PUBLIC_` is inlined at build time, so changing it requires a redeploy, not just a restart.

## Preview deployments

Every pull request gets its own URL automatically. That's the fastest way to review a UI change without pulling the branch locally.
