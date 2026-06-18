# Ministry of Foreign Affairs — Front-End Clone

A responsive, framework-free front-end clone of the Ministry of Foreign Affairs,
Federal Republic of Nigeria website (`foreignaffairs.gov.ng`), built with semantic
HTML5, vanilla CSS, and vanilla JavaScript.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, Latest News, Consular Services slider, Welcome Message, Locations & Missions |
| `about.html` | About Us — Who We Are, Mandate, Mission, Vision, Core Values, Leadership |
| `services.html` | Services — Document Authentication + Visa & Consular |
| `press.html` | Press Center — Latest News, Public Documents, Press Releases |

## Shared

- `styles.css` — design tokens (palette & Inter font sampled from the live site), all components, responsive rules
- `nav.js` — mobile nav drawer, mega-menu accordion, news filter, and homepage slider (guarded per page)
- `assets/` — logo, hero, minister portrait and other imagery

## Run locally

Any static file server works, e.g.:

```bash
python -m http.server 8123
# then open http://localhost:8123
```

## Note

Imagery and textual content belong to the Federal Republic of Nigeria and are used
here for a non-commercial UI prototype only.
