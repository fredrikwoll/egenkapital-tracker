# Egenkapital Tracker

## Prosjektbeskrivelse
[Beskriv hva appen gjør og hovedmålet]

## Teknisk Stack
### Frontend
- [ ] NextJS med TypeScript
- [ ] Tailwind CSS
- [ ] 

### Backend
- [ ] NextJS API Routes
- [ ] PostgreSQL
- [ ] Prisma ORM

### Deployment
- [ ] PM2 på VPS

## Funksjonalitet
### Kjernefeatures
- [ ] Kontoer med typer (aksjesparekonto, sparekonto, etc.)
- [ ] Records/historikk per konto
- [ ] Gjeldsoversikt
- [ ] Inntektshåndtering
- [ ] Lånesimulator
- [ ] Dashboard med oversikt

### Låneberegning
- [ ] 5x årsinntekt regel
- [ ] Forsørgerfradrag
- [ ] Egenkapitalandel ved boligkjøp
- [ ] Eksisterende gjeld

## Implementeringsplan
### Fase 1: Grunnlag
- [ ] NextJS prosjekt setup
- [ ] Database setup (PostgreSQL + Prisma)
- [ ] Grunnleggende API struktur

### Fase 2: Database & API
- [ ] Database schema design
- [ ] API endpoints for kontoer
- [ ] API endpoints for records
- [ ] API endpoints for gjeld/inntekt

### Fase 3: Onboarding
- [ ] Første gangs oppsett flow
- [ ] Opprett kontoer
- [ ] Sett startverdier

### Fase 4: Dashboard
- [ ] Oversikt over egenkapital
- [ ] Gjeld og inntekt visning
- [ ] Grunnleggende statistikk

### Fase 5: Lånesimulator
- [ ] Beregningslogikk
- [ ] Boligkjøp simulator
- [ ] Resultat visning

### Fase 6: Historikk & Statistikk
- [ ] Trendvisning
- [ ] Periode-sammenligning
- [ ] Grafer og visualisering

## Database Design
### Tabeller
- [ ] `accounts` - Kontoer
- [ ] `account_records` - Historiske verdier
- [ ] `debt` - Gjeldsposter
- [ ] `income` - Inntekt
- [ ] `users` - (fremtidig bruk)

## API Endpoints
### Kontoer
- [ ] `GET /api/accounts` - Hent alle kontoer
- [ ] `POST /api/accounts` - Opprett konto
- [ ] `PUT /api/accounts/[id]` - Oppdater konto
- [ ] `DELETE /api/accounts/[id]` - Slett konto

### Records
- [ ] `GET /api/records` - Hent records
- [ ] `POST /api/records` - Opprett record
- [ ] `GET /api/records/[accountId]` - Records for konto

### Gjeld & Inntekt
- [ ] `GET /api/debt` - Hent gjeld
- [ ] `POST /api/debt` - Opprett gjeld
- [ ] `GET /api/income` - Hent inntekt
- [ ] `POST /api/income` - Oppdater inntekt

### Beregninger
- [ ] `POST /api/calculate/loan-capacity` - Lånekapasitet
- [ ] `GET /api/calculate/net-worth` - Total egenkapital

## Setup/Installation
### Forutsetninger
- [ ] Node.js
- [ ] Yarn
- [ ] PostgreSQL (DBngin)

### Lokalt oppsett
```bash
# Installer dependencies
yarn install

# Setup database
npx prisma migrate dev

# Start utviklingsserver
yarn dev
```

## Deployment
### VPS Setup
- [ ] PM2 konfiguration
- [ ] PostgreSQL produksjon
- [ ] Environment variabler
- [ ] SSL sertifikat

## Fremtidige Features
- [ ] Flere brukere/husholdninger
- [ ] Import fra bank (CSV)
- [ ] Budsjett-funksjonalitet
- [ ] Mål og progresjon
- [ ] Notifikasjoner