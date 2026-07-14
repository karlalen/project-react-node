// backend/tests/tasks.test.ts
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app'

describe('API de tareas', () => {
  it('rechaza crear una tarea con letras repetidas seguidas', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ text: 'aaaaaaaa' })

    expect(res.status).toBe(400)
  })
})