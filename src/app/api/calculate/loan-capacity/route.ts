import { prisma } from "@/lib/prisma";

/* - [ ] 5x annual income rule
- [ ] Dependent deduction
- [ ] Downpayment minimum (10% )
- [ ] Existing debt. */

/* 
1. Inputdata
[ ] Brutto inntekt for hver låntaker
[ ] Eksisterende gjeld (total)
[ ] Netto inntekt per måned
[ ] Standard livsopphold (SIFO)
[ ] Andre faste kostnader (fellesutgifter, forsikring, kommunale avgifter osv.)
[ ] Terminbeløp på eksisterende lån
[ ] Kjøpesum eller verdi på bolig
[ ] Årlig rente på nytt lån
[ ] Rentepåslag for stresstest (for eksempel +5 prosentpoeng)
[ ] Maks gjeldsgrad (for eksempel 5 ganger inntekt)
[ ] Maks belåningsgrad (for eksempel 85 prosent)
[ ] Løpetid på lånet i år

2. Beregn godkjent inntekt
[ ] Summer brutto inntekter
[ ] Juster hvis noe av inntekten ikke teller fullt ut (f.eks. variabel inntekt)

3. Beregn maks lån ut fra gjeldsgrad
[ ] Maks samlet gjeld = gjeldsgrad x godkjent inntekt
[ ] Trekk fra eksisterende gjeld
[ ] Resultatet er maks nytt lån etter gjeldsgrad

4. Beregn maks lån ut fra belåningsgrad (egenkapital)
[ ] Maks lån = boligverdi x maks belåningsgrad
[ ] Trekk fra eventuelle eksisterende heftelser på boligen

5. Beregn maks lån ut fra betalingsevne (kontantstrøm)
[ ] Disponibelt per måned = netto inntekt minus (livsopphold + faste kostnader + terminbeløp på eksisterende lån)
[ ] Regn ut annuitetsfaktor basert på stresstest-rente og løpetid
[ ] Maks lån = disponibelt per måned delt på annuitetsfaktor

6. Finn endelig maks lån
[ ] Maks lån = det laveste av
    [ ] maks lån etter gjeldsgrad
    [ ] maks lån etter belåningsgrad
    [ ] maks lån etter betalingsevne 
*/
export async function GET() {

    const allIncome = await prisma.income.findMany({});
    
 }


 