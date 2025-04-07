import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" });

let db: any | undefined;

try {
  const connectionUrl = process.env.TURSO_CONNECTION_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN!;

  if (!connectionUrl || !authToken) {
    throw new Error(
      "Missing required environment variables: TURSO_CONNECTION_URL or TURSO_AUTH_TOKEN"
    );
  }

  db = drizzle({
    connection: {
      url: connectionUrl,
      authToken: authToken,
    },
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error initializing database connection:", error.message);
  } else {
    console.error("An unknown error occurred during database initialization.");
  }
}

export { db };
