import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" });
console.log(process.env.TURSO_CONNECTION_URL!);
export const db = drizzle({
  connection: {
    url: "libsql://gsglearngatedb-abdallah-shnaino.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDU0ODY5MzEsImlhdCI6MTc0Mjg5NDkzMSwiaWQiOiI0YzkwMDMyZC0xZmVjLTQ5NjgtYTFkMS1hMWNhNWM1Yzg1NzgifQ.-jk9mYCQCkMWOJsjhMKsWCWjSSEim91XufMQCGI88dWWLXHJFiQ3uGaF9gukTUs88H0lbLAE_P8bmgisx2kHBA",
  },
});

/* 
TURSO_CONNECTION_URL=libsql://gsglearngatedb-abdallah-shnaino.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDUzMjUwMzIsImlhdCI6MTc0MjczMzAzMiwiaWQiOiI2MWQ3M2IzZC1kMDhiLTQxNjktYjhmMi02MmZmOTk1ZmY4MWUifQ.1lREmdD2lyh2Rh7mNNo1j5-lk4UK1tjAvyYzdeTENjoG-8KG4CVGxSj3N8HXQVLE1cDtWI4rpy5AcCL9vi9bCA

*/
