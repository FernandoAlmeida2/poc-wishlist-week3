import rankingRepository, {
  CountByGenreResult,
  CountByPlatformResult,
} from "../repositories/ranking-repository";

async function rankingByGenre(): Promise<RankingByGenreResult[]> {
  const ranking: CountByGenreResult[] = await rankingRepository.countByGenre();
  const result: RankingByGenreResult[] = [];
  ranking.forEach((item) =>
    result.push({ genreId: item.genreId, seriesCount: item._count.id })
  );
  return result;
}

export type RankingByGenreResult = {
  genreId: number;
  seriesCount: number;
};

async function rankingByPlatform(): Promise<RankingByPlatformResult[]> {
  const ranking: CountByPlatformResult[] =
    await rankingRepository.countByPlatform();
  const result: RankingByPlatformResult[] = [];
  ranking.forEach((item) =>
    result.push({ platformId: item.platformId, seriesCount: item._count.id })
  );
  return result;
}

export type RankingByPlatformResult = {
  platformId: number;
  seriesCount: number;
};

const rankingService = {
  rankingByGenre,
  rankingByPlatform,
};

export default rankingService;
