// e2e/flujo-tareas.spec.ts
import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
   const textoTarea = `Aprender karate ${Date.now()}`

  // 1. Entrar a la aplicación
  await page.goto('/')

  // 2. Crear una tarea
  await page.getByPlaceholder('Escribe una nueva tarea...').fill(textoTarea)
  await page.getByRole('button', { name: 'Agregar' }).click()

  // 3. Verla en la lista
  await expect(page.getByText(textoTarea)).toBeVisible()
})