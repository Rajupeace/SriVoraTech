// MongoDB Atlas Database Client Helper for SriVoraTech
import { MongoClient } from 'mongodb'

const DB_NAME = 'srivoratech'

let cachedClient = null
let cachedDb = null
let lastFailureTime = 0
const RETRY_COOLDOWN_MS = 60000 // Retry every 60 seconds if initial attempt failed

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI
  if (!uri || uri.includes('your_username') || uri.includes('your-cluster')) {
    return { client: null, db: null }
  }

  // Avoid spamming a failed remote connection on every serverless invocation
  const now = Date.now()
  if (lastFailureTime && (now - lastFailureTime < RETRY_COOLDOWN_MS)) {
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
    lastFailureTime = 0

    return { client, db }
  } catch (error) {
    lastFailureTime = Date.now()
    console.warn('MongoDB Atlas connection skipped (using fallback store):', error.message)
    return { client: null, db: null }
  }
}
