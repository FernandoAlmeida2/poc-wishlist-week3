import { prisma } from "../src/database/database";

export async function cleanDB() {
  await prisma.serie.deleteMany({});
  await prisma.genre.deleteMany({});
  await prisma.platform.deleteMany({});
}
