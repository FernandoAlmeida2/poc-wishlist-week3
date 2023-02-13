import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/database";

export async function createSeries(platformId: number, genreId: number) {
  return prisma.serie.create({
    data: {
      name: faker.datatype.string(),
      platformId,
      genreId,
    },
  });
}
