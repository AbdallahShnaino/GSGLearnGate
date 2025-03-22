import { db } from "../index";
import { InsertProject, projectsTable } from "../schema";

export async function createProject(data: InsertProject) {
  await db.insert(projectsTable).values(data);
}
