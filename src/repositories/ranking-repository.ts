import { prisma } from "../database/database";

async function countByGenre(): Promise<CountByGenreResult[]> {
  const result = await prisma.serie.groupBy({
    by: ["genreId"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
  });
  return result;
}

export type CountByGenreResult = { genreId: number; _count: { id: number } };

async function countByPlatform(): Promise<CountByPlatformResult[]> {
  const result = await prisma.serie.groupBy({
    by: ["platformId"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
  });
  return result;
}

export type CountByPlatformResult = {
  platformId: number;
  _count: { id: number };
};

const rankingRepository = {
  countByGenre,
  countByPlatform,
};

export default rankingRepository;
