# Deutsch Tag für Tag

A static German A1/A2 learning tracker: daily words, weekly plan, grammar, progress. No build step.

## Deploy on Vercel
1. Put these files in a new GitHub repo. `index.html` must sit at the repo root (a missing root index is what caused your earlier 404).
2. In Vercel: Add New > Project > import the repo. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Deploy.
3. Every `git push` redeploys automatically.

## Adding the Goethe word lists
The official lists are free PDFs from goethe.de (A1: https://www.goethe.de/pro/relaunch/prf/ca/A1_SD1_Wortliste_02.pdf; find the A2 list on the Goethe-Zertifikat A2 page). They are German only, so you need to add meanings.
1. Put the words in a CSV: `level,german,english,pronunciation` (the last two are optional), e.g. `A1,das Wasser,water,VAH-ser`.
2. Run `npm run add-words -- my-words.csv`. Duplicates are skipped and new words are appended.
3. Commit and push.

Only ever append words. Progress is saved by each word's position in `data/words.json`, so reordering or deleting entries would shift saved progress.

## Not included
Accounts and cross-device sync. Progress lives in each browser's localStorage. Real login needs a backend such as Supabase or Firebase Auth.
