import { MongoClient } from 'mongodb'
require('dotenv').config()

const dbName = process.env.DB_NAME

const url = process.env.DB_URL_LIVE || process.env.DB_LOCAL_URL

// @ts-ignore
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export async function makeDb() {
  if (!client.isConnected()) {
    await client.connect()
  }
  const db = client.db(dbName)
  return db
}

;(async function startupDB() {
  console.log('Starting up---')
  const db = await makeDb()
  await db.collection('todos').createIndex({ todo_name: 'text', priority: 'text' })
  console.log('Done')
})()
