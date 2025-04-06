import { seed } from "drizzle-seed";
import { drizzle } from "drizzle-orm/libsql";
import { courseSchedulesTable } from "./src/db/schema";

async function main() {
  const db = drizzle({
    connection: {
      url: "libsql://gsglearngatedb-abdallah-shnaino.turso.io",
      authToken:
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NDY0MzUxMzcsImlhdCI6MTc0Mzg0MzEzNywiaWQiOiJhMDNmMzJiYi0wNWU4LTQzMjMtYTliZS0wODE3YTZlMjAwM2MifQ.CsQWpOXkMkRo35i5P6CkpXJ7ZqykxznPM5R4gJrhVvA4T0u8Kcj91vZw0WHTid38Ad1MYWiAWoL5wZjUsA5YAA",
    },
  });

  // Seed 30 team sessions
  const days = ["Saturday", "Monday", "Wednesday"];
  const sessions = [];

  for (let week = 1; week <= 8; week++) {
    for (const day of days) {
      sessions.push({
        courseId: 1, // Assuming courseId 1 is your team course
        weekNumber: week,
        dayOfWeek: day,
        startTime: "16:00", // 4 PM
        endTime: "18:00", // 6 PM
        isRecurring: true,
      });
    }
  }

  // Seed all sessions at once
  await db.insert(courseSchedulesTable).values(sessions);

  console.log(`Successfully seeded ${sessions.length} team sessions`);
}

main().catch(console.error);
