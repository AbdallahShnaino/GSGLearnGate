import { eq } from "drizzle-orm";
import { db } from "../index";
import { SelectProject, projectsTable } from "../schema";

export async function updatePost(
  id: SelectProject["id"],
  data: Partial<Omit<SelectProject, "id">>
) {
  await db.update(projectsTable).set(data).where(eq(projectsTable.id, id));
}
