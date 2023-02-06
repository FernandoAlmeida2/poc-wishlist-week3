import { Genre } from "@prisma/client";
import { prisma } from "../database/database";

function findMany(): Promise<Genre[]> {
  return prisma.genre.findMany();
}

function findByName(name: string): Promise<Genre> {
  return prisma.genre.findUnique({ where: { name } });
}

function findById(id: number): Promise<Genre> {
  return prisma.genre.findUnique({ where: { id } });
}

async function insertOne(newGenre: string): Promise<void> {
  await prisma.genre.create({ data: { name: newGenre } });
}

async function updateOne(id: number, updateName: string): Promise<void> {
  await prisma.genre.update({
    where: { id },
    data: { name: updateName },
  });
}

const genreRepository = {
  findMany,
  findByName,
  findById,
  insertOne,
  updateOne,
};

export default genreRepository;
