import { Router } from "express";
import { getAllGenres, postGenre, updateGenre } from "../controllers/genre-controller";
import { validateBody } from "../middlewares/validateMiddleware";
import { genreSchema } from "../schemas/genre-schema";

const genreRouter: Router = Router();

genreRouter.get("/genres", getAllGenres);
genreRouter.post("/genres", validateBody(genreSchema), postGenre);
genreRouter.put("/genres/:id", validateBody(genreSchema), updateGenre);

export default genreRouter;