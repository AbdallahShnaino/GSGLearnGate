import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" });
console.log(process.env.TURSO_CONNECTION_URL!);
export const db = drizzle({
  connection: {
    url: "libsql://gsglearngatedb-abdallah-shnaino.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDU1NjM3NTksImlhdCI6MTc0Mjk3MTc1OSwiaWQiOiJjMDNiNDU0OS02NjJkLTQ0YWItOGMxMi00NzdmYzFlN2Y4YjcifQ.jlzz_4Wjmr9PLtWbeIINDCoGegqCyaCSKUFTegQB1oyb8iwxM2tdDSfNAnK4mhvcj82fp3PliQrR89a3I5HbAA",
  },
});

/* 
TURSO_CONNECTION_URL=libsql://gsglearngatedb-abdallah-shnaino.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDUzMjUwMzIsImlhdCI6MTc0MjczMzAzMiwiaWQiOiI2MWQ3M2IzZC1kMDhiLTQxNjktYjhmMi02MmZmOTk1ZmY4MWUifQ.1lREmdD2lyh2Rh7mNNo1j5-lk4UK1tjAvyYzdeTENjoG-8KG4CVGxSj3N8HXQVLE1cDtWI4rpy5AcCL9vi9bCA

*/
