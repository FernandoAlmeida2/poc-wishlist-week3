import app, { init } from "../../src/app";
import { cleanDB } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createPlatform } from "../factories/platforms-factory";
import { createGenre } from "../factories/genres-factory";
import { createSeries } from "../factories/series-factory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST/ series", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const seriesTest = { seriesName: faker.datatype.string() };
    const response = await server.post("/series").send(seriesTest);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201 when body is valid", async () => {
    const platform = await createPlatform();
    const genre = await createGenre();
    const seriesTest = {
      name: faker.datatype.string(),
      genre: genre.name,
      platform: platform.name,
    };
    const response = await server.post("/series").send(seriesTest);

    const seriesInserted = await server.get("/series");

    expect(response.status).toBe(httpStatus.CREATED);
    expect(seriesInserted.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: seriesTest.name,
          genreId: genre.id,
          platformId: platform.id,
        }),
      ])
    );
  });

  it("should respond with status 409 when the name already exists", async () => {
    const platform = await createPlatform();
    const genre = await createGenre();
    const seriesTest = {
      name: faker.datatype.string(),
      genre: genre.name,
      platform: platform.name,
    };

    await server.post("/series").send(seriesTest);
    const response = await server.post("/series").send(seriesTest);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});

describe("PUT/ series", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .patch("/series")
      .send({ seriesName: faker.datatype.string() });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 404 when series not found", async () => {
    const updateBody = {
      name: faker.datatype.string(),
      status: faker.helpers.arrayElement(["finished", "ongoing"]),
      review: faker.lorem.paragraph(),
      rate: faker.datatype.number({ min: 1, max: 5 }),
    };
    const response = await server.patch("/series").send(updateBody);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 when body is valid", async () => {
    const platform = await createPlatform();
    const genre = await createGenre();
    const seriesCreated = await createSeries(platform.id, genre.id);

    const updateBody = {
      name: seriesCreated.name,
      status: faker.helpers.arrayElement(["finished", "ongoing"]),
      review: faker.lorem.paragraph(),
      rate: faker.datatype.number({ min: 1, max: 5 }),
    };
    const response = await server.patch("/series").send(updateBody);

    const seriesUpdated = await server.get("/series");

    expect(response.status).toBe(httpStatus.OK);
    expect(seriesUpdated.body).toEqual(
      expect.arrayContaining([expect.objectContaining(updateBody)])
    );
  });
});

describe("GET/ series", () => {
  it("should respond with status 200 and a empty array", async () => {
    const response = await server.get("/series");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });

  it("should respond with status 200 and a Series array", async () => {
    const platform = await createPlatform();
    const genre = await createGenre();
    const seriesCreated = await createSeries(platform.id, genre.id);

    const response = await server.get("/series");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([expect.objectContaining(seriesCreated)]);
  });
});

describe("DELETE/ series/:id", () => {
  it("should respond with status 404 when series not found", async () => {
    const response = await server.delete("/series/100");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 when body is valid", async () => {
    const platform = await createPlatform();
    const genre = await createGenre();
    const seriesCreated = await createSeries(platform.id, genre.id);

    const response = await server.delete(`/series/${seriesCreated.id}`);

    const seriesArray = await server.get("/series");

    expect(response.status).toBe(httpStatus.OK);
    expect(seriesArray.body).toEqual([]);
  });
});
