import { MongoClient } from 'mongodb';

const dbName = process.env.MONGODB_DB_NAME || 'branchchat';

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  if (!global.__mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not configured.');
    }
    global.__mongoClientPromise = new MongoClient(uri).connect();
  }
  return global.__mongoClientPromise;
}

let indexesEnsured = false;

export async function getDb() {
  const client = await getClientPromise();
  return client.db(dbName);
}

export async function ensureIndexes() {
  if (indexesEnsured) {
    return;
  }

  const db = await getDb();

  await Promise.all([
    db.collection('users').createIndex({ email: 1 }, { unique: true }),
    db.collection('auth_sessions').createIndex({ token: 1 }, { unique: true }),
    db.collection('auth_sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    db.collection('chat_sessions').createIndex({ userId: 1, updatedAt: -1 }),
  ]);

  indexesEnsured = true;
}
