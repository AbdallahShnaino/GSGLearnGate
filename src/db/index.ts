// import { config } from "dotenv";
// import { drizzle } from "drizzle-orm/libsql";

// config({ path: ".env" });

// let db: any | undefined;

// try {
//   const connectionUrl = process.env.TURSO_CONNECTION_URL;
//   const authToken = process.env.TURSO_AUTH_TOKEN;

//   if (!connectionUrl || !authToken) {
//     throw new Error("CODE:999");
//   }

//   db = drizzle({
//     connection: {
//       url: connectionUrl,
//       authToken: authToken,
//     },
//   });
// } catch (error: unknown) {
//   if (error instanceof Error) {
//     throw new Error("CODE:998");
//   } else {
//     throw new Error("CODE:997");
//   }
// }

// export { db };

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" });

let db: any | undefined;

try {
  const connectionUrl = "libsql://gsglearngatedb-abdallah-shnaino.turso.io";
  const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDY0MzUxMzcsImlhdCI6MTc0Mzg0MzEzNywiaWQiOiJhMDNmMzJiYi0wNWU4LTQzMjMtYTliZS0wODE3YTZlMjAwM2MifQ.CsQWpOXkMkRo35i5P6CkpXJ7ZqykxznPM5R4gJrhVvA4T0u8Kcj91vZw0WHTid38Ad1MYWiAWoL5wZjUsA5YAA";

  if (!connectionUrl || !authToken) {
    throw new Error("CODE:999");
  }

  db = drizzle({
    connection: {
      url: connectionUrl,
      authToken: authToken,
    },
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    throw new Error("CODE:998");
  } else {
    throw new Error("CODE:997");
  }
}

export { db };
