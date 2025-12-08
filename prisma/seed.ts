import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  await db.admin.upsert({
    where: { email: "admin@res.local" },
    update: {},
    create: {
      email: "admin@res.local",
      password: "$2a$10$REPLACE_WITH_BCRYPT_HASH", // create using bcryptjs
      name: "Super Admin",
    }
  });

  await db.sponsor.createMany({
    data: [
      { name: "MTN", tier: "Title Sponsor", logoUrl: "/images/sponsor-mtn.png", description: "Connectivity partner" },
      { name: "Capitec", tier: "Premium", logoUrl: "/images/premium-capitec.png" },
      { name: "Vodacom", tier: "Supporting", logoUrl: "/images/support-vodacom.png" },
    ],
    skipDuplicates: true
  });
}
main().catch(console.error).finally(()=>process.exit());
