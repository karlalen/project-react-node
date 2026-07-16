// backend/tests/tasks.test.ts
import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("API de tareas", () => {
  it("rechaza crear una tarea con letras repetidas seguidas", async () => {
    const res = await request(app).post("/tasks").send({ text: "aaaaaaaa" });
    expect(res.status).toBe(400);
  });

  it("crea una tarea nueva con texto válido", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ text: `Tarea de prueba ${Date.now()}` });
      
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(false);
  });

  it("lista las tareas existentes", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("actualiza el campo done de una tarea existente", async () => {
    const creada = await request(app)
      .post("/tasks")
      .send({ text: `Tarea para actualizar ${Date.now()}` });

    const res = await request(app)
      .put(`/tasks/${creada.body.id}`)
      .send({ done: true });

    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });

  it("elimina una tarea existente", async () => {
    const creada = await request(app)
      .post("/tasks")
      .send({ text: `Tarea para borrar ${Date.now()}` });

    const res = await request(app).delete(`/tasks/${creada.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Tarea eliminada");
  });

  it("responde 404 al intentar eliminar una tarea que no existe", async () => {
    const res = await request(app).delete("/tasks/999999999");
    expect(res.status).toBe(404);
  });
});