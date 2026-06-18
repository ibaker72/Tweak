# AutoFiveStar screenshots

Drop the real AutoFiveStar screenshots in this folder, replacing the dark
placeholder images that ship by default. Keep the exact filenames below so the
Work card, homepage Visual Proof card, and `/work/autofivestar` case study page
pick them up automatically — no code changes needed.

| File                  | Used as                                  | Suggested content              |
| --------------------- | ---------------------------------------- | ------------------------------ |
| `autofivestar-01.jpg` | Case study hero + card cover (first frame) | Landing page / hero            |
| `autofivestar-02.jpg` | Gallery                                  | Review request flow            |
| `autofivestar-03.jpg` | Gallery                                  | Private feedback routing       |
| `autofivestar-04.jpg` | Gallery                                  | Dashboard                      |
| `autofivestar-05.jpg` | Gallery                                  | Reputation workflow            |
| `autofivestar-06.jpg` | Gallery                                  | Reputation overview            |

Notes:
- Recommended aspect ratio is roughly **16:9 / 16:10** to match the other
  projects. The cover crops to ~16:7.5 and gallery tiles to 16:10.
- Filenames are referenced in `src/lib/data.ts` and `src/lib/visual-proof.ts`.
- If a file is missing, the UI shows a "Visual asset coming soon" placeholder
  instead of a broken image, so the layout stays stable.
