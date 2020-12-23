import { ObjectId } from 'mongodb'
import { Request } from 'express'

export function transformId(id: string) {
  return new ObjectId(id)
}

export enum Priority {
  HIGH = 'high',
  LOW = 'low',
  MEDIUM = 'medium',
}
export type ID = ObjectId

export interface ITodo {
  todo_name: string
  start_time: Date
  end_time: Date
  description: string
  priority: Priority
}

export interface IHttpRequest {
  body: Pick<Request, 'body'>
  pathParams?: Pick<Request, 'params'>
  query: Pick<Request, 'query'>
  method: Pick<Request, 'method'>
  path: Pick<Request, 'path'>
  headers: {
    'Content-Type': string
  }
}

export interface ITodoResult extends ITodo {
  id: ID
  userId: string
}

export interface ITodoDb {
  insert({ userId, ...todoInfo }: { userId: string } & ITodo): Promise<ITodoResult>
  update({
    id,
    ...todoInfo
  }: { id: string | ID } & ITodo): Promise<{
    todo_name: string
    start_time: Date
    end_time: Date
    description: string
    priority: string
  } | null>
  remove({ id: _id }: { id: string | ID }): Promise<object>
  findAll(): Promise<ITodoResult[]>
  findById({ id: _id }: { id: string | ID }): Promise<ITodoResult | null>
  dropDb(col: string): Promise<any>
  search({ param }: { param: string }): Promise<ITodoResult[]>
}
