import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  // Seed sponsors
  await db.sponsor.createMany({
    data: [
      { name: "MTN", tier: "Title Sponsor", logoUrl: "/images/sponsor-mtn.png", description: "Connectivity partner", startDate: new Date() },
      { name: "Capitec", tier: "Premium", logoUrl: "/images/premium-capitec.png", startDate: new Date() },
      { name: "Vodacom", tier: "Supporting", logoUrl: "/images/support-vodacom.png", startDate: new Date() },
    ],
    skipDuplicates: true
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
