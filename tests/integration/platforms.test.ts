import app, { init } from "../../src/app";
import { cleanDB } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/database";
import { createPlatform } from "../factories/platforms-factory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST/ platforms", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .post("/platforms")
      .send({ platformName: faker.datatype.string() });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const newPlatform = faker.datatype.string();

    await server.post("/platforms").send({ name: newPlatform });
    const response = await server
      .post("/platforms")
      .send({ name: newPlatform });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 201 when body is valid", async () => {
    const newPlatform = faker.datatype.string();
    const response = await server
      .post("/platforms")
      .send({ name: newPlatform });
    const platformInserted = prisma.platform.findFirst({
      where: {
        name: newPlatform,
      },
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(platformInserted).toBeDefined();
  });
});

describe("GET/ platforms", () => {
  it("should respond with status 200 and a empty array", async () => {
    const response = await server.get("/platforms");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });

  it("should respond with status 200 and a platform array", async () => {
    const platformInserted = await createPlatform();
    const response = await server.get("/platforms");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([platformInserted]);
  });
});

describe("PUT/ platforms/:id", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .put("/platforms/1")
      .send({ genreName: faker.datatype.string() });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 404 when platform not found", async () => {
    const response = await server
      .put("/platforms/100")
      .send({ name: faker.datatype.string() });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const platformInserted = await createPlatform();
    const platformRepeatedName = await createPlatform();
    const response = await server
      .put(`/platforms/${platformInserted.id}`)
      .send({ name: platformRepeatedName.name });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 200 when body is valid", async () => {
    const platformInserted = await createPlatform();
    const newName = faker.datatype.string();
    const response = await server
      .put(`/platforms/${platformInserted.id}`)
      .send({ name: newName });

    const platformUpdated = await server.get("/platforms");

    expect(response.status).toBe(httpStatus.OK);
    expect(platformUpdated.body[0].name).toEqual(newName);
  });
});
