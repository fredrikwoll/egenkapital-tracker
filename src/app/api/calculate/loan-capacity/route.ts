import { prisma } from "@/lib/prisma";

/* - [ ] 5x annual income rule
- [ ] Dependent deduction
- [ ] Downpayment minimum (10% )
- [ ] Existing debt. */
export async function GET() {

    const getSalery = await prisma.income.findMany({});
    
 }


 