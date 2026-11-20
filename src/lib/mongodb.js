import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME || "PromptVerse";

let client;
let clientPromise;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export async function getDatabase() {
  if (!clientPromise) {
    throw new Error("MongoDB client is not initialized.");
  }
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}
