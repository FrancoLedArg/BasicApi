import bcrypt from "bcrypt";

export async function verifyPassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);

  if (!isMatch) {
    throw new Error("Bad Credentials");
  }

  return isMatch;
}
