# måpp — landingsside

Enkel, rask ettsides landingsside for lead-generering til flyttevask i Oslo.
Bygget som ren HTML/CSS/JS uten rammeverk eller byggeprosess — null hosting-kostnad på f.eks. Cloudflare Pages, Netlify eller GitHub Pages.

## Filstruktur

```
index.html        Hele siden (hero, sammenligning, slik funker det, tillit, FAQ, skjema, footer)
css/style.css      All styling (design-tokens øverst i filen)
js/script.js       Mobilmeny, scroll-animasjoner, flerstegs-skjema, innsending
favicon.svg        Enkel wordmark-favicon
```

## Før du publiserer — dette MÅ gjøres

1. **Koble på skjemaet (Formspree)**
   - Opprett gratis konto på [formspree.io](https://formspree.io) og lag et nytt skjema.
   - Du får en URL som `https://formspree.io/f/xxxxxxxx`.
   - Bytt ut `REPLACE_WITH_YOUR_FORM_ID` i `index.html` (i `<form action="...">`) med din egen ID.
   - Formspree sender deg e-post for hver innsending automatisk, og du kan se alle leads i dashbordet deres (dekker "e-post + enkel lead-logg" uten at du trenger egen backend).

2. **Kjøp domene** (f.eks. `maapp.no`) og pek det til hostingen du velger.

## Anbefalt gratis/billig hosting

Siden er 100 % statisk, så alle disse funker uten kostnad ved lavt trafikkvolum:

- **Cloudflare Pages** — dra-og-slipp mappen, eller koble GitHub-repo.
- **Netlify** — samme som over, gratis SSL og eget domene inkludert.
- **GitHub Pages** — gratis hvis du er ok med GitHub som kilde.

Alle tre støtter enkelt å koble på et eget domene med gratis SSL.

## Tilpasning

- **Farger**: alt styres fra `:root` øverst i `css/style.css` (`--bg`, `--brand`, `--accent`).
- **Tekst/innhold**: alt tekstinnhold ligger direkte i `index.html` — ingen CMS.
- **Skjemafelter**: endre/legg til felter i `<form id="lead-form">`. Husk at `name`-attributtet på hvert felt blir kolonnenavnet du ser i Formspree/e-posten du mottar.

## Ting å vurdere før lansering

- **Skjemainnhold**: skjemaet spør om postnummer/bydel, boligstørrelse og ønsket dato i steg 1, og navn/telefon/e-post i steg 2. Juster gjerne basert på hva du faktisk trenger for å matche en rengjører.
- **Konkrete tall i "Hvorfor stole på måpp"-seksjonen**: teksten om kvalitetssikring er bevisst holdt generell (ingen påstander om antall rengjørere, responstid eller garantier som ikke er bekreftet). Hvis du har konkrete tall (f.eks. "matches innen 24 timer", "X kvalitetssikrede rengjørere i Oslo", en reell flyttevaskgaranti), bør disse inn — spesifikke tall konverterer bedre enn generiske påstander.
- **Anmeldelser/testimonials**: det er foreløpig ikke lagt inn noen seksjon for kundeanmeldelser siden du ikke har dette klart ennå. Dette er trolig det enkeltelementet som vil løfte konverteringen mest når du har noen — sett av plass i designet rett under "Slik funker det" når du har 3–5 gode sitater eller stjerner fra Google/Facebook.
- **Analytics**: ingen sporing er lagt inn. Vurder et personvernvennlig alternativ (f.eks. Plausible eller Cloudflare Web Analytics) for å måle konvertering fra CTA-klikk til fullført skjema.
