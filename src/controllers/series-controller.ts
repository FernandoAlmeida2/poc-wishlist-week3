import { Request, Response } from "express";
import { Series, UpdateSeries } from "../protocols/series";
import seriesService, { NewSeriesParams } from "../services/series-service";

export async function getAllSeries(req: Request, res: Response): Promise<void> {
  const series: Series[] = await seriesService.getAllSeries();
  res.status(200).send(series);
}

export async function postSeries(req: Request, res: Response): Promise<void> {
  const series = req.body as NewSeriesParams;

  try {
    await seriesService.insertSeries(series);
    res.status(201).send("Series successfully inserted!");
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      res.status(409).send(error);
    }
    if (error.name === "NotFoundError") {
      res.status(404).send(error);
    }
  }
}

export async function patchSeries(req: Request, res: Response): Promise<void> {
  const updateData = req.body as UpdateSeries;

  try {
    await seriesService.updateSeries(updateData);
    res.status(200).send("Series successfully updated!");
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.status(404).send(error);
    }
  }
}

export async function deleteSeries(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    await seriesService.deleteSeries(Number(id));
    res.status(200).send("Series successfully deleted!");
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.status(404).send(error);
    }
  }
}
