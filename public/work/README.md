# Featured project media

Drop your real videos/screenshots here. The landing-page project rail
references these exact paths. While files are missing, each card renders a
tasteful gradient fallback with the project title — no broken images.

## Expected files

- `tweakbuild-os/demo.mp4` — Tweak & Build OS automation/agents demo (mp4, h.264, < 8 MB)
- `tweakbuild-os/poster.jpg` — Poster shown until the video plays

- `speedway/demo.mp4` — Speedway Motors inventory sync demo
- `speedway/poster.jpg` — Poster shown until the video plays

- `ppmechanical/screenshot.jpg` — PP Mechanical site screenshot

- `jerseypantry/screenshot.jpg` — JerseyPantry storefront screenshot

Videos should be muted, loop-friendly, and ideally 16:9 (matches the card
media slot). Posters and screenshots should also be 16:9.

To add a fifth project, append to `src/lib/featured-projects.ts` and drop
media into a new `public/work/<slug>/` folder.
