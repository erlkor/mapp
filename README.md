# måpp: renhold i Gudbrandsdalen

Statisk nettside (HTML/CSS/JS, ingen byggeprosess) for måpp: flyttevask, utflyttingsvask for leietakere og vask av korttidsutleie. Kan hostes gratis på Cloudflare Pages eller Netlify.

## Filer

```
index.html         Forsiden (hero, tjenester, inkludert, slik funker det, pris, tillit, FAQ, skjema)
personvern.html    Personvernerklæring
vilkaar.html       Vilkår (pris, avbestilling, garanti, angrerett)
css/style.css      All styling (farger og mål øverst i filen)
js/script.js       Skjema (3 steg), prisestimat, scroll-animasjoner
Sharp_Grotesk/     Skrifttype for overskrifter og logo
robots.txt, sitemap.xml, _redirects
```

Footer og header er kopiert inn i alle tre HTML-filene. Endrer du telefon, e-post eller org.nr, må du endre det i alle tre.

## Pris

Prisen per m² (100 kr, inkl. mva) styres av `PRICE_PER_M2` øverst i `js/script.js`. Den brukes av prisberegneren (slider) i seksjonen «Fast pris per kvadratmeter» og av prisestimatet i skjemaet. Selve teksten «100 kr per m²» står i tillegg i seksjonsingressen og FAQ i `index.html`, og i «Pris og betaling» i `vilkaar.html`. Slideren går fra 20 til 250 m² (`CALC_MIN`/`CALC_MAX`), og feltet tar imot opptil 1000 m².

## Før lansering

1. **Formspree:** lag et skjema på formspree.io og bytt ut `REPLACE_WITH_YOUR_FORM_ID` i `<form action>` i `index.html`. Slå på e-postvarsler på mobilen, siden du lover svar innen noen timer.
2. **Arbeidstilsynet:** renholdsvirksomhet må være godkjent (gjelder også enkeltpersonforetak uten ansatte og privatkunder). Du kan selge mens søknaden er «under behandling». Send søknaden via Altinn, sjekk også at næringskode og mva-registrering er på plass.
3. **Mva:** passerer du 50 000 kr på 12 måneder må du registrere deg. Prisene på siden er oppgitt inkl. mva.
4. **Påstander må stemme:** ikke skriv «Godkjent renholdsvirksomhet» før Arbeidstilsynet har godkjent deg, og ikke «Forsikret» før forsikringen er på plass. Legg dem til i banneret og «Hvorfor stole på måpp» når det er sant.
5. **Tekster som må leses gjennom av deg (og gjerne en jurist):** `vilkaar.html` (særlig avbestillingsgebyr, angrerett og garantivilkår) og `personvern.html` (leverandører, lagring, overføring utenfor EØS).
6. **Avbestillingsgebyr:** vilkårene sier bare at et «rimelig gebyr» kan kreves etter 24 timer. Bestem et konkret beløp.
7. **DNS:** `maapp.no` ligger på den gamle siden. Når du flytter domenet, behold e-postoppsettet (MX-postene), ellers slutter `post@maapp.no` å virke.
8. **Redirect:** `_redirects` sender `/personvernerklaering` (gammel URL) til `/personvern.html`. Det virker på Netlify og Cloudflare Pages, ikke på GitHub Pages.
9. **Etter lansering:** Search Console (send inn `sitemap.xml`), Google Bedriftsprofil som tjenesteområde-bedrift, og en enkel analyse (f.eks. Plausible).

## Parkert til senere

- **Reisetillegg:** kjerneområdet er Sel, Vågå, Lom, Nord-Fron, Dovre og Sør-Fron. Resten av Gudbrandsdalen er utvidet område. Ingen reisetillegg foreløpig; hvis det innføres, kan skjemaet sjekke postnummer og vise pris deretter.
- **Bilder og «Om meg»:** legg til portrett, før/etter-bilder og navn når du er klar.
- **Anmeldelser:** egen seksjon etter de første oppdragene.
- **Minstepris**, pris for korttidsutleie og eventuelle tillegg (utvendig vindusvask).
