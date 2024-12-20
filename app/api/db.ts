import { MongoClient, Db, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const uri =
    "mongodb+srv://szokou45:UyUHiMaZ9OypPVEy@cluster0.zheqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  cachedClient = client;
  cachedDb = client.db("ecommerce-nextjs");

  return { client, db: client.db("ecommerce-nextjs") };
}
