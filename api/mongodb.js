// MongoDB Atlas Database Client Helper for SriVoraTech
import { MongoClient } from 'mongodb'

const DB_NAME = 'srivoratech'

let cachedClient = null
let cachedDb = null
let connectionFailed = false

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI
  if (!uri || uri.includes('your_username') || uri.includes('your-cluster') || connectionFailed) {
    return { client: null, db: null }
  }

  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 3000,
      serverSelectionTimeoutMS: 3000
    })

    await client.connect()
    const db = client.db(DB_NAME)

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    connectionFailed = true
    console.warn('MongoDB Atlas connection skipped (using fast local JSON fallback):', error.message)
    return { client: null, db: null }
  }
}

