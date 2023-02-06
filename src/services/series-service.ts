import { Genre, Platform } from "@prisma/client";
import { Series, UpdateSeries } from "../protocols/series";
import genreRepository from "../repositories/genre-repository";
import platformRepository from "../repositories/platform-repository";
import seriesRepository from "../repositories/series-repository";
import { duplicatedNameError, notFoundError } from "./errors";

async function getAllSeries(): Promise<Series[]> {
  const series: Series[] = await seriesRepository.findMany();
  return series;
}

async function insertSeries(series: NewSeriesParams): Promise<void> {
  const alreadyExists: Series = await seriesRepository.findByName(series.name);
  if (alreadyExists) {
    throw duplicatedNameError("series");
  }
  const platformExists: Platform = await platformRepository.findByName(series.platform);
  
  if (!platformExists) {
    throw notFoundError("platform");
  }

  const genreExists: Genre = await genreRepository.findByName(series.genre);

  if (!genreExists) {
    throw notFoundError("genre");
  }

  await seriesRepository.insertOne({
    name: series.name,
    platformId: platformExists.id,
    genreId: genreExists.id,
  });
}

export type NewSeriesParams = { name: string; platform: string; genre: string };

async function updateSeries(updateData: UpdateSeries): Promise<void> {
  const alreadyExists: Series = await seriesRepository.findByName(updateData.name);
  if (!alreadyExists) {
    throw notFoundError("series");
  }
  await seriesRepository.updateOne(alreadyExists.id, updateData);
}

async function deleteSeries(id: number): Promise<void> {
  const alreadyExists: Series = await seriesRepository.findById(id);
  if (!alreadyExists) {
    throw notFoundError("series");
  }
  await seriesRepository.deleteOne(id);
}

const seriesService = {
  getAllSeries,
  insertSeries,
  updateSeries,
  deleteSeries,
};

export default seriesService;
