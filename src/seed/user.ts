import faker from 'faker'

export const makeFakeUser = (overrides?: object) => {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    todos: [],
  }

  return { ...user, ...overrides }
}
