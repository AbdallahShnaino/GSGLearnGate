import { insertUser } from "@/src/db/queries/insert";
import { Role } from "@/types";
import { hashPassword } from "@/utils/crypt";

export async function createNewUser(
  city: string,
  dateOfBirth: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string
) {
  const hashedPassword = await hashPassword(password);

  return await insertUser({
    data: {
      city,
      dateOfBirth: new Date(dateOfBirth),
      email,
      firstName,
      lastName,
      password: hashedPassword,
      image: "/profile (1).png",
      role: Role.STUDENT,
    },
    role: Role.STUDENT,
  });
}
