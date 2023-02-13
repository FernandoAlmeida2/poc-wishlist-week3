import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/database";

export async function createPlatform() {
  return prisma.platform.create({
    data: {
      name: faker.datatype.string(),
    },
  });
}
