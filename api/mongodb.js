// MongoDB Atlas Database Client Helper for SriVoraTech
import { MongoClient } from 'mongodb'

const DEFAULT_DB_NAME = 'srivoratech'

let cachedClient = null
let cachedDb = null
let lastFailureTime = 0
const RETRY_COOLDOWN_MS = 30000 // Retry every 30 seconds if connection failed

/**
 * Controlled index migration & verification function for SriVoraTech collections.
 * Throws on failure to ensure release-gate integrity.
 * @param {import('mongodb').Db} db 
 * @returns {Promise<Array<object>>} List of confirmed indexes
 */
export async function ensureIndexes(db) {
  if (!db) {
    throw new Error('Database handle required to ensure collection indexes.')
  }

  const collection = db.collection('contact_enquiries')

  // 1. Unique enquiryId index (enforces strict idempotency and lookup speed)
  await collection.createIndex({ enquiryId: 1 }, { unique: true, name: 'uniq_enquiryId' })

  // 2. Sorting & query index by createdAt
  await collection.createIndex({ createdAt: -1 }, { name: 'idx_createdAt' })

  // 3. TTL index: automatically deletes expired records after 180 days
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: 'ttl_expiresAt' })

  // Return and verify existing indexes
  const existingIndexes = await collection.indexes()
  return existingIndexes
}

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
      writeConcern: {
        w: 'majority',
        wtimeoutMS: 5000,
      }
    })

    await client.connect()
    const db = client.db(dbName)

    if (!customUri) {
      cachedClient = client
      cachedDb = db
      lastFailureTime = 0
    }

    // Auto-verify indexes on initial connection
    try {
      await ensureIndexes(db)
    } catch (idxErr) {
      console.warn('[MongoDB] Index synchronization warning:', idxErr.message)
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
 * Read-after-write verification helper.
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
