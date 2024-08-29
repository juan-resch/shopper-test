/* eslint-disable */
const dotenv = require('dotenv')
const { Client } = require('pg')

dotenv.config()

async function createDatabaseIfNotExists() {
  const dbName = process.env.DATABASE_NAME
  const user = process.env.DATABASE_USER
  const password = process.env.DATABASE_PASSWORD
  const host = process.env.DATABASE_HOST
  const port = parseInt(process.env.DATABASE_PORT || '5432', 10)

  if (!dbName || !user || !password || !host) {
    console.error('Missing database configuration in environment variables')
    return
  }

  const client = new Client({
    host,
    port,
    user,
    password,
  })

  try {
    await client.connect()

    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${dbName}'`
    )

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`)
      console.log(`Database "${dbName}" created.`)
    } else {
      console.log(`Database "${dbName}" already exists.`)
    }
  } catch (error) {
    console.error('Error creating database:', error)
  } finally {
    await client.end()
  }
}

dotenv.config()

createDatabaseIfNotExists()
