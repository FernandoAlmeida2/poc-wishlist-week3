import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.platform.createMany({
    data: [
      { name: "Netflix" },
      { name: "Disney+" },
      { name: "Prime Video" },
      { name: "HBO Max" },
      { name: "Paramount+" },
    ],
  });
  await prisma.genre.createMany({
    data: [
      { name: "Mystery thriller" },
      { name: "Drama" },
      { name: "Crime" },
      { name: "Sci fi" },
      { name: "Fantasy" },
      { name: "Action" },
      { name: "Comedy" },
    ],
  });
  await prisma.serie.createMany({
    data: [
      { name: "Star Trek: Strange New Worlds", platformId: 5, genreId: 4 },
      { name: "Dark", platformId: 1, genreId: 1 },
      { name: "The Office", platformId: 1, genreId: 7 },
    ],
  });
}

main()
  .then(() => console.log("Registration done successfully!"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
