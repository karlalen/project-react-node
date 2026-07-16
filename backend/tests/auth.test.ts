// backend/tests/auth.test.ts
import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("Autenticación", () => {
  it("responde con un mensaje en la ruta raíz", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Backend is working!");
  });

  it("permite login con credenciales correctas y devuelve un token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "1234" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("rechaza login con credenciales incorrectas", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "incorrecta" });

    expect(res.status).toBe(401);
  });

  it("rechaza el acceso a /private sin token", async () => {
    const res = await request(app).get("/private");
    expect(res.status).toBe(401);
  });

  it("rechaza el acceso a /private con un token inválido", async () => {
    const res = await request(app)
      .get("/private")
      .set("Authorization", "Bearer token-invalido");

    expect(res.status).toBe(403);
  });

  it("permite el acceso a /private con un token válido", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "admin", password: "1234" });

    const res = await request(app)
      .get("/private")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Acceso permitido");
  });
});