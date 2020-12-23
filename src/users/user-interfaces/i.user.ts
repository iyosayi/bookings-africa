import { ObjectId } from 'mongodb'

export type ID = ObjectId
export interface IUser {
  name: string
  password: string
  email: string
  todos: ID[]
}

export interface IUserResult extends IUser {
  _id: ID
  token: string
}

export interface IUserDb {
  insert({ ...todoInfo }: IUser): Promise<IUserResult>
  findById({ id: _id }: { id: string }): Promise<IUserResult | null>
  findByEmail({ email }: { email: string }): Promise<IUserResult | null>
  updateTodo({ id: _id, todoId }: { id: string; todoId: ID }): Promise<any>
}
