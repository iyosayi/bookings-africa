import { Db, MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

let db: Db
let server: MongoMemoryServer = new MongoMemoryServer()
let connection: MongoClient

export async function makeDb() {
  const url = await server.getUri()
  connection = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  db = connection.db(await server.getDbName())
  // await db.dropCollection('todos')
  // beforeEach(() => db.listCollections())
  return db
}

export async function stop() {
  await connection.close()
  return server.stop()
}

export async function cleanup(col: string) {
  const aaa = db.listCollections(undefined, { nameOnly: true })
  console.log(aaa)
}

export { connection, db }
