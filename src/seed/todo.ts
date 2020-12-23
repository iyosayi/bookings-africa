import faker from 'faker'
import { ObjectId } from 'mongodb'

enum Priority {
  HIGH = 'high',
  LOW = 'low',
  MEDIUM = 'medium',
}
export const makeFakeTodo = (overrides?: object) => {
  const todo = {
    todo_name: faker.name.findName(),
    start_time: new Date(),
    end_time: new Date(),
    description: faker.commerce.productAdjective(),
    priority: Priority.HIGH,
    // userId: '1234',
  }

  return { ...todo, ...overrides }
}
