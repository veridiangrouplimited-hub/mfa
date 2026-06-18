# Ministry of Foreign Affairs — Front-End Clone

A responsive, framework-free front-end clone of the Ministry of Foreign Affairs,
Federal Republic of Nigeria website (`foreignaffairs.gov.ng`), built with semantic
HTML5, vanilla CSS, and vanilla JavaScript.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, Latest News (HMFA/HMOS/MFA), Consular slider, Welcome Message, Locations & Missions |
| `about.html` | About Us — Who We Are, Mandate, Mission, Vision, Core Values, History, Organization, Leadership |
| `nigeria.html` | Nigeria — History, Natural resources, Investment, People, Culture, Tourism, National symbols |
| `policy.html` | Policy — 4D foreign policy (brief, activities, brochure) and issues |
| `services.html` | Services — Document Authentication + Visa & Consular |
| `press.html` | Press Center — Latest News, Public Documents, Press Releases |
| `missions.html` | Diplomatic Missions — searchable, filterable directory of 46 missions with flags |

## Shared

- `styles.css` — design tokens (palette & Inter font sampled from the live site), all components, responsive rules
- `site.js` — injects the shared header/footer into every page (via `#site-header` / `#site-footer` placeholders and `<body data-page>`), then wires up the mobile nav, mega-menu accordion, news filter, slider, missions directory, scrollspy and back-to-top
- `missions-data.js` — the 46 mission records (name, address, hours, category, flag), parsed from the live directory
- `assets/` — logo, hero, minister portrait, watermarks, and `assets/flags/` mission flags

## Run locally

Any static file server works, e.g.:

```bash
python -m http.server 8123
# then open http://localhost:8123
```

## Note

Imagery and textual content belong to the Federal Republic of Nigeria and are used
here for a non-commercial UI prototype only.
