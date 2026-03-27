# AlgoViva AI Governance Platform

A comprehensive AI regulatory intelligence and compliance platform built with React + Vite.

## Features

- **Regulatory Map** — 28 countries across all regions, filterable by region and status
- **Build & Track** — Stage-aware compliance checker with obligation tracking, citation popups, and PDF download
- **Regulation Library** — 35+ indexed regulations searchable by country, theme, and status
- **Intelligence Feed** — Synthesised regulatory intelligence with collapsible source evidence
- **Regional Donut Charts** — Real country counts across 5 regions (Africa: 54 countries)

## Tech Stack

React 18 · Vite 5 · No external CSS frameworks — custom design system using CSS variables

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no config needed
4. Deploy

## Data

All regulatory data is in `src/data.js`. To add a new country:
- Add to `COUNTRIES` array
- Add compliance data to `CDB` object (or it will fall back to ISO 42001 / NIST baseline)

---

*Informational only — not legal advice. Consult a qualified lawyer before deployment.*  
*AlgoViva — advisory@algoviva.com*
