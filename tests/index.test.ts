import app, { init } from "../src/app";
import { cleanDB } from "./helpers";
import supertest from "supertest";
import httpStatus from "http-status";

beforeAll(async () => {
  await init();
  await cleanDB();
});

const server = supertest(app);

describe("POST/ genres", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server.post("/genres").send({ genreName: "Comedy" });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201 when body is valid", async () => {
    const response = await server.post("/genres").send({ name: "Comedy" });

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const response = await server.post("/genres").send({ name: "Comedy" });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});

describe("GET/ genres", () => {
  it("should respond with status 200 and a genre array", async () => {
    const response = await server.get("/genres");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({ name: "Comedy" }),
    ]);
  });
});

describe("PUT/ genres/:id", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server.put("/genres/1").send({ genreName: "Drama" });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 404 when genre not found", async () => {
    const response = await server.put("/genres/100").send({ name: "Drama" });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const response = await server.put("/genres/1").send({ name: "Comedy" });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 200 when body is valid", async () => {
    const genres = await server.get("/genres");
    const response = await server
      .put(`/genres/${genres.body[0].id}`)
      .send({ name: "Drama" });

    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("POST/ platforms", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .post("/platforms")
      .send({ platformName: "Amazon Prime" });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201 when body is valid", async () => {
    const response = await server
      .post("/platforms")
      .send({ name: "Amazon Prime" });

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const response = await server
      .post("/platforms")
      .send({ name: "Amazon Prime" });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});

describe("GET/ platforms", () => {
  it("should respond with status 200 and a platform array", async () => {
    const response = await server.get("/platforms");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({ name: "Amazon Prime" }),
    ]);
  });
});

describe("PUT/ platforms/:id", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .put("/platforms/1")
      .send({ genreName: "Netflix" });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 404 when platform not found", async () => {
    const response = await server
      .put("/platforms/100")
      .send({ name: "Netflix" });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const response = await server.put("/platforms/1").send({ name: "Amazon Prime" });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should respond with status 200 when body is valid", async () => {
    const platforms = await server.get("/platforms");
    const response = await server
      .put(`/platforms/${platforms.body[0].id}`)
      .send({ name: "Netflix" });

    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("POST/ series", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const seriesTest = { seriesName: "Dark" };
    const response = await server.post("/series").send(seriesTest);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201 when body is valid", async () => {
    const seriesTest = {
      name: "Dark",
      genre: "Drama",
      platform: "Netflix",
    };
    const response = await server.post("/series").send(seriesTest);

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 409 when the name already exists", async () => {
    const seriesTest = {
      name: "Dark",
      genre: "Drama",
      platform: "Netflix",
    };
    const response = await server.post("/series").send(seriesTest);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});

describe("PUT/ series", () => {
  it("should respond with status 422 when body is not valid", async () => {
    const response = await server
      .patch("/series")
      .send({ seriesName: "Netflix" });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 404 when series not found", async () => {
    const updateBody = {
      name: "1899",
      status: "finished",
      rate: 4,
      review: "not bad",
    };
    const response = await server.patch("/series").send(updateBody);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 when body is valid", async () => {
    const updateBody = {
      name: "Dark",
      status: "finished",
      rate: 5,
      review: "great!",
    };
    const response = await server.patch("/series").send(updateBody);

    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("GET/ series", () => {
  it("should respond with status 200 and a Series array", async () => {
    const genres = await server.get("/genres");
    const platforms = await server.get("/platforms");
    const response = await server.get("/series");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        name: "Dark",
        genreId: genres.body[0].id,
        platformId: platforms.body[0].id,
        status: "finished",
        rate: 5,
        review: "great!",
      }),
    ]);
  });
});

describe("DELETE/ series/:id", () => {
  it("should respond with status 404 when series not found", async () => {
    const response = await server.delete("/series/100");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 when body is valid", async () => {
    const series = await server.get("/series");
    const response = await server.delete(`/series/${series.body[0].id}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
