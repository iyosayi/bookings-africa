/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import { ITodo, Priority } from '../interfaces/i.todo'
import { InvalidParameterError, RequiredParameterError } from '../../helpers/Errors'

export const buildMakeTodoFactory = () =>
  function todoFactory(todoFields: ITodo) {
    let { todo_name, start_time, end_time, description, priority } = todoFields
    if (!todo_name) {
      throw new RequiredParameterError('Todo name')
    }

    if (!start_time) {
      throw new RequiredParameterError('Start time')
    }

    if (!description) {
      throw new RequiredParameterError('Description')
    }

    if (!priority) {
      throw new RequiredParameterError('Priority')
    }

    if (!end_time) {
      throw new RequiredParameterError('End time')
    }

    const todoPriorityFromApi = Object.values(Priority).includes(priority)
    if (!todoPriorityFromApi) {
      throw new InvalidParameterError('Priority must be either high, medium or low.')
    }

    return Object.freeze({
      getTodoName: () => todo_name,
      getStartTime: () => start_time,
      getDescription: () => description,
      getPriority: () => priority,
      getEndTime: () => end_time,
    })
  }
