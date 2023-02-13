import app, { init } from "../../src/app";
import { cleanDB } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/database";
import { createGenre } from "../factories/genres-factory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST/ genres", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .post("/genres")
      .send({ genreName: faker.datatype.string() });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const newgenre = faker.datatype.string();
    await server.post("/genres").send({ name: newgenre });

    const response = await server.post("/genres").send({ name: newgenre });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 201 when body is valid", async () => {
    const newgenre = faker.datatype.string();
    const response = await server.post("/genres").send({ name: newgenre });
    const genreInserted = prisma.genre.findFirst({
      where: {
        name: newgenre,
      },
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(genreInserted).toBeDefined();
  });
});

describe("GET/ genres", () => {
  it("should respond with status 200 and a empty array", async () => {
    const response = await server.get("/genres");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });

  it("should respond with status 200 and a genre array", async () => {
    const genreInserted = await createGenre();
    const response = await server.get("/genres");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([genreInserted]);
  });
});

describe("PUT/ genres/:id", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .put("/genres/1")
      .send({ genreName: faker.datatype.string() });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 404 when genre not found", async () => {
    const response = await server
      .put("/genres/100")
      .send({ name: faker.datatype.string() });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const genreInserted = await createGenre();
    const genreRepeatedName = await createGenre();

    const response = await server
      .put(`/genres/${genreInserted.id}`)
      .send({ name: genreRepeatedName.name });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 200 when body is valid", async () => {
    const genreInserted = await createGenre();
    const newName = faker.datatype.string();
    const response = await server
      .put(`/genres/${genreInserted.id}`)
      .send({ name: newName });

    const genreUpdated = await server.get("/genres");

    expect(response.status).toBe(httpStatus.OK);
    expect(genreUpdated.body[0].name).toEqual(newName);
  });
});
