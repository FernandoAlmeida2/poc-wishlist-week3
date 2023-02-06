import dotenv from "dotenv";
import cors from "cors";
import express, { Express } from "express";
import "express-async-errors";
import { connectDb, disconnectDB } from "./database/database";
import { errorHandlingMiddleware } from "./middlewares/errors-middleware";
import genreRouter from "./routers/genre-router";
import platformRouter from "./routers/platform-router";
import rankingRouter from "./routers/ranking-router";
import seriesRouter from "./routers/series-router";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use(seriesRouter);
app.use(rankingRouter);
app.use(platformRouter);
app.use(genreRouter);
app.use(errorHandlingMiddleware);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
    await disconnectDB();
  }

export default app;