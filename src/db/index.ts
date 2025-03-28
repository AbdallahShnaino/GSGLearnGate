import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" });
console.log(process.env.TURSO_CONNECTION_URL!);
export const db = drizzle({
  connection: {
    url: "libsql://gsglearngatedb-abdallah-shnaino.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDU2NDkxMTcsImlhdCI6MTc0MzA1NzExNywiaWQiOiI2ZGUyNWIxMy1hOGUyLTRiNjctODFhYy0wZjI0ZjU2ZjIxYTkifQ.TFFetvTi_UT1DLmJK0hIhDo1x3XqmO-EFD6oxeV6UMvStrFQbxxxak7KokQEfQhZ3VhnwbFZ6TYq_FI_ItZ3AA",
  },
});

/* 
TURSO_CONNECTION_URL=libsql://gsglearngatedb-abdallah-shnaino.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDUzMjUwMzIsImlhdCI6MTc0MjczMzAzMiwiaWQiOiI2MWQ3M2IzZC1kMDhiLTQxNjktYjhmMi02MmZmOTk1ZmY4MWUifQ.1lREmdD2lyh2Rh7mNNo1j5-lk4UK1tjAvyYzdeTENjoG-8KG4CVGxSj3N8HXQVLE1cDtWI4rpy5AcCL9vi9bCA

*/
