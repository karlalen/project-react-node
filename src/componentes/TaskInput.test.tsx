// src/componentes/TaskInput.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import TaskInput from './TaskInput'

describe('TaskInput', () => {
  it('llama a onAdd con el texto escrito por el usuario', async () => {
    // Arrange
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const usuario = userEvent.setup()

    // Act
    const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i)
    await usuario.type(input, 'Aprender vue')
    await usuario.click(screen.getByText('Agregar'))

    // Assert
    expect(onAdd).toHaveBeenCalledWith('Aprender vue')
  })

  it('limpia el input después de agregar una tarea', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const usuario = userEvent.setup()

    const input = screen.getByPlaceholderText(/Escribe una nueva tarea/i) as HTMLInputElement
    await usuario.type(input, 'Aprender vue')
    await usuario.click(screen.getByText('Agregar'))

    expect(input.value).toBe('')
  })

  it('no llama a onAdd si el campo está vacío (muestra alerta)', async () => {
    // Arrange: el componente usa window.alert, que jsdom no implementa,
    // así que lo simulamos para que no truene la prueba.
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const usuario = userEvent.setup()

    // Act
    await usuario.click(screen.getByText('Agregar'))

    // Assert
    expect(onAdd).not.toHaveBeenCalled()
    expect(alertMock).toHaveBeenCalledWith('Tarea no valida')

    alertMock.mockRestore()
  })
})