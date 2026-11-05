// MongoDB Atlas Database Client Helper for SriVoraTech
import { MongoClient } from 'mongodb'

const DEFAULT_DB_NAME = 'srivoratech'

let cachedClient = null
let cachedDb = null
let lastFailureTime = 0
const RETRY_COOLDOWN_MS = 30000 // Retry every 30 seconds if connection failed

/**
 * Connect to MongoDB Atlas cluster
 * Reuses connection across serverless invocations
 * @param {string} [customUri] - Optional custom connection string (for staging/testing)
 * @param {string} [customDb] - Optional custom database name
 * @returns {Promise<{ client: MongoClient | null, db: import('mongodb').Db | null, error?: string }>}
 */
export async function connectToDatabase(customUri = null, customDb = null) {
  if (cachedClient && cachedDb && !customUri) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = customUri || process.env.MONGODB_URI
  const dbName = customDb || process.env.MONGODB_DB || DEFAULT_DB_NAME

  if (!uri || uri.includes('your_username') || uri.includes('your-cluster')) {
    return { client: null, db: null, error: 'MONGODB_URI is not configured.' }
  }

  // Avoid spamming a failed remote connection on every serverless invocation within cooldown
  const now = Date.now()
  if (!customUri && lastFailureTime && (now - lastFailureTime < RETRY_COOLDOWN_MS)) {
    return { client: null, db: null, error: 'Database cooldown in effect following previous failure.' }
  }

  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })

    await client.connect()
    const db = client.db(dbName)

    if (!customUri) {
      cachedClient = client
      cachedDb = db
      lastFailureTime = 0
    }

    // Ensure essential indexes on first successful connection
    try {
      await db.collection('contact_enquiries').createIndex({ enquiryId: 1 }, { unique: true })
      await db.collection('contact_enquiries').createIndex({ createdAt: -1 })
      // TTL index: auto-delete enquiries after 180 days (retention policy)
      await db.collection('contact_enquiries').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
    } catch (idxErr) {
      // Index creation non-blocking
    }

    return { client, db }
  } catch (error) {
    if (!customUri) {
      lastFailureTime = Date.now()
    }
    return { client: null, db: null, error: error.message }
  }
}

/**
 * Read-after-write verification helper for staging and integration tests.
 * Confirms that a document is durably committed to the database.
 * @param {import('mongodb').Db} db
 * @param {string} collectionName
 * @param {object} query
 * @returns {Promise<boolean>}
 */
export async function verifyDatabaseWrite(db, collectionName, query) {
  if (!db) return false
  try {
    const doc = await db.collection(collectionName).findOne(query)
    return Boolean(doc)
  } catch (err) {
    return false
  }
}

/**
 * Disconnect database client (useful for tests teardown)
 */
export async function disconnectDatabase() {
  if (cachedClient) {
    try {
      await cachedClient.close()
    } catch (e) {
      // Ignore teardown errors
    }
    cachedClient = null
    cachedDb = null
  }
}
