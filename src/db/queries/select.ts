import { db } from "../index";
import { postsTable, projectsTable } from "../schema";
import { delay } from "@/utils/delay";
import { PostBlock } from "@/types";
import { eq } from "drizzle-orm";

export async function getPosts(): Promise<
  Array<{
    id: number;
    title: string;
    date: number;
    description: string;
    topic: string;
  }>
> {
  await delay();

  return await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      date: postsTable.date,
      description: postsTable.description,
      topic: postsTable.topic,
    })
    .from(postsTable);
}

export async function getProjects(): Promise<
  Array<{
    id: number;
    title: string;
    year: number;
    imageURL: string;
    description: string;
    techStack: string;
  }>
> {
  await delay();
  return await db
    .select({
      id: projectsTable.id,
      title: projectsTable.title,
      year: projectsTable.year,
      imageURL: projectsTable.imageURL,
      description: projectsTable.description,
      techStack: projectsTable.techStack,
    })
    .from(projectsTable);
}

export async function getProject(projectId: number): Promise<{
  content: PostBlock[];
  title: string;
  techStack: string;
  year: number;
}> {
  await delay();
  const rowProject = await db
    .select({
      content: projectsTable.content,
      title: projectsTable.title,
      techStack: projectsTable.techStack,
      year: projectsTable.year,
    })
    .from(projectsTable)
    .where(eq(projectsTable.id, projectId));

  return rowProject.map((project) => ({
    ...project,
    content: parseBlocks(project.content),
  }))[0];
}

export async function getPost(postId: number): Promise<{
  content: PostBlock[];
  date: number;
  title: string;
  topic: string;
}> {
  await delay();
  const rowPost = await db
    .select({
      content: postsTable.content,
      date: postsTable.date,
      title: postsTable.title,
      topic: postsTable.topic,
    })
    .from(postsTable)
    .where(eq(postsTable.id, postId));

  return rowPost.map((post) => ({
    ...post,
    content: parseBlocks(post.content),
  }))[0];
}

function parseBlocks(jsonString: unknown): PostBlock[] {
  if (typeof jsonString !== "string") {
    console.error("Invalid JSON format: Expected a string but got", jsonString);
    return [];
  }

  try {
    const parsed = JSON.parse(jsonString);
    return typeof parsed === "string" ? JSON.parse(parsed) : parsed;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
}

/* 

  year: number;
  imageURL: string;
  description: string;
  techStack: string;
export async function getUserById(
  id: SelectProject["id"]
): Promise<Array<Project>> {
  return db.select().from(projectsTable).where(eq(projectsTable.id, id));
}
export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    postsCount: number;
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    id: number;
    title: string;
  }>
> {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title,
    })
    .from(postsTable)
    .where(gt(postsTable.createdAt, sql`(datetime('now','-24 hour'))`))
    .orderBy(asc(postsTable.title), asc(postsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}


*/
