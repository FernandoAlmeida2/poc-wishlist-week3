import { PrismaPromise, typeStatus } from "@prisma/client";
import { prisma } from "../database/database";
import { NewSeries, Series, UpdateData } from "../protocols/series";

function findMany() {
  return prisma.serie.findMany();
}

function findByName(name: string): PrismaPromise<Series> {
  return prisma.serie.findUnique({ where: { name } });
}

function findById(id: number): PrismaPromise<Series> {
  return prisma.serie.findUnique({ where: { id } });
}

async function insertOne(series: NewSeries): Promise<void> {
  await prisma.serie.create({ data: series });
}

async function updateOne(id: number, updateData: UpdateData): Promise<void> {
  await prisma.serie.update({
    where: { id },
    data: { ...updateData, status: updateData.status as typeStatus },
  });
}

async function deleteOne(id: number): Promise<void> {
  await prisma.serie.delete({ where: { id } });
}

const seriesRepository = {
  findMany,
  findByName,
  insertOne,
  findById,
  updateOne,
  deleteOne,
};

export default seriesRepository;
