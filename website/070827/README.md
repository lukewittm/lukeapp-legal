# website/070827

Save-the-date site for Lukas & Celine — 07 August 2027.

## Structure

```
website/070827/
├── index.html      # PIN/gate keypad + save-the-date card + RSVP modal
├── css/
│   └── styles.css  # "Filigree Gate · Classic" design tokens
├── js/
│   ├── main.js      # PIN keypad + gate animation, language toggle, RSVP logic
│   └── i18n.js       # DE/EN copy strings
├── assets/          # watercolor gate + castle illustrations
│   ├── gate-left.png / gate-right.png                  # mobile/portrait crop
│   └── gate-left-desktop.png / gate-right-desktop.png  # wide crop, walls extended
└── README.md
```

## Status

Fully built. Visual design recreated from the Claude Design handoff
("Filigree Gate · Classic" — `design_handoff_save_the_date`): watercolor
garden gate that swings open (3D door-fold) on the correct PIN via an
on-screen numeric keypad, revealing the save-the-date card. RSVP dialog
collects up to 6 guest names + attendance and posts to Formspree.
Real save-the-date video and Formspree endpoint are both wired in and
tested end-to-end.

The design handoff itself is German-only; the DE/EN toggle from the
original brief was kept and styled to match (small corner pill, top
left), with English copy added on top.

Above 900px width, the gate art switches (via a CSS media query) to a
wider version with the walls/hedges extended so there's no visible
page-background edge on desktop; narrower viewports keep the original
portrait crop, which frames better on mobile.

## Design reference

The original handoff bundle (`Wedding Save-the-Date.dc.html` + README +
source assets) is not stored in this repo — ask for it again if the
design needs revisiting. Key values (colors, type, spacing, motion
timings) are documented as comments/tokens directly in `css/styles.css`.

## Cache-busting

`css/styles.css` and `js/*.js` are linked with a `?v=N` query string in
`index.html`. GitHub Pages' CDN caches these for ~10 minutes, and browsers
cache them separately on top of that — without a version bump, visitors
(and you, testing right after a push) can end up with a stale mix of old
CSS and new HTML. **Bump `v` on every deploy that touches `styles.css`,
`main.js`, or `i18n.js`**, or changes may not show up for several minutes,
and cache staleness can desync CSS from HTML in confusing ways (e.g. an
element referenced in fresh HTML but not yet styled by cached CSS).

## Known follow-ups

- [ ] The watercolor PNGs in `assets/` are large (1.5–2MB each, ~5MB
      total) — consider compressing (e.g. `pngquant`) before this goes
      live, since mobile guests will load all of them upfront.
- [ ] Client-side PIN check (`0708`) is decorative, not real security —
      fine for this use case per the brief.
