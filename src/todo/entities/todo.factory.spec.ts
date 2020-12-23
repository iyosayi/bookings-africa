import makeTodo from '.'
import { makeFakeTodo } from '../../seed/todo'

describe('Todo Factory', () => {
  it('must have a todo_name', async () => {
    const todo = makeFakeTodo({ todo_name: null })
    expect(() => makeTodo(todo)).toThrow('Todo name cannot be empty, null or undefined.')
  })
  it('must have a start_time', async () => {
    const todo = makeFakeTodo({ start_time: null })
    expect(() => makeTodo(todo)).toThrow('Start time cannot be empty, null or undefined.')
  })
  it('must have an end_time', async () => {
    const todo = makeFakeTodo({ end_time: null })
    expect(() => makeTodo(todo)).toThrow('End time cannot be empty, null or undefined.')
  })
  it('must have a description', async () => {
    const todo = makeFakeTodo({ description: null })
    expect(() => makeTodo(todo)).toThrow('Description cannot be empty, null or undefined.')
  })
  it('must have a priority', async () => {
    const todo = makeFakeTodo({ priority: null })
    expect(() => makeTodo(todo)).toThrow('Priority cannot be empty, null or undefined.')
  })

  it('only accepts a range of priorities', async () => {
    const todo = makeFakeTodo({ priority: '@@@@' })
    expect(() => makeTodo(todo)).toThrow('Priority must be either high, medium or low.')
  })
})
