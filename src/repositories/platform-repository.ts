import { Platform } from "@prisma/client";
import { prisma } from "../database/database";

function findMany(): Promise<Platform[]> {
  return prisma.platform.findMany();
}

function findByName(name: string): Promise<Platform> {
  return prisma.platform.findUnique({ where: { name } });
}

function findById(id: number): Promise<Platform> {
  return prisma.platform.findUnique({ where: { id } });
}

async function insertOne(newPlatform: string): Promise<void> {
  await prisma.platform.create({ data: { name: newPlatform } });
}

async function updateOne(id: number, updateName: string): Promise<void> {
  await prisma.platform.update({
    where: { id },
    data: { name: updateName },
  });
}

const platformRepository = {
  findMany,
  findByName,
  findById,
  insertOne,
  updateOne,
};

export default platformRepository;
