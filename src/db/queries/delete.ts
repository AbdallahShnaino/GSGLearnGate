import { eq } from "drizzle-orm";
import { db } from "../index";
import { SelectProject, projectsTable } from "../schema";

export async function deleteUser(id: SelectProject["id"]) {
  await db.delete(projectsTable).where(eq(projectsTable.id, id));
}
