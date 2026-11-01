# Hackathon HQ

> **Practice build** to learn React + TypeScript + Vite before the MES hackathon.
> Not an event submission. Deadline and judging criteria: n/a (practice).

A responsive web app that helps hackathon teams manage their project:
dashboard stats, tasks with status / priority / due date / category,
search and filters, and data that survives a page reload.

## Tech

- React + TypeScript, built with Vite
- Plain CSS (variables in `src/styles/global.css`, one CSS file per component)
- Storage: browser `localStorage` for now, Supabase later

## Run it

```bash
npm install     # first time only
npm run dev     # start the dev server, open the URL it prints
npm run build   # type-check + production build
npm run lint    # check code with oxlint
```

## Milestones

- [x] 1. Setup
- [x] 2. Data model + storage
- [x] 3. Task list
- [ ] 4. Create / edit / delete
- [ ] 5. Dashboard
- [ ] 6. Search, filters + tests
- [ ] 7. Responsive polish
- [ ] 8. Supabase + deploy (later)
