const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

(async () => {
  const settings = await db.siteSettings.findUnique({
    where: { id: "default" },
    select: { id: true, whatsappNumber: true, updatedAt: true },
  });
  console.log("SiteSettings row:", JSON.stringify(settings, null, 2));

  const allSettings = await db.siteSettings.findMany();
  console.log("\nAll SiteSettings rows:", allSettings.length);
  allSettings.forEach((s) => {
    console.log(`  id=${s.id} whatsapp=${s.whatsappNumber} updated=${s.updatedAt}`);
  });

  await db.$disconnect();
})();
