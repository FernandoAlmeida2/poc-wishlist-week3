import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/database";

export async function createGenre() {
  return prisma.genre.create({
    data: {
      name: faker.datatype.string(),
    },
  });
}
