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
npm test        # run tests and re-run them as you edit (Ctrl+C to stop)
npm run test:run # run tests once
```

## Tests

Vitest + React Testing Library, running in jsdom (a fake browser).

- `src/utils/*.test.ts`: dates, dashboard stats, search / filter / sort
- `src/services/taskStorage.test.ts`: saving, loading, broken saved data
- `src/App.test.tsx`: create, validate, delete, and filter like a real user

## Milestones

- [x] 1. Setup
- [x] 2. Data model + storage
- [x] 3. Task list
- [x] 4. Create / edit / delete
- [x] 5. Dashboard
- [x] 6. Search, filters + tests
- [x] 7. Responsive polish
- [ ] 8. Supabase + deploy (later)
