import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import client from "./client";

export const getUser = async (
  token: string | undefined
): Promise<User | null> => {
  try {
    if (!token) {
      return null;
    }
    const { id }: { id: number } = await jwt.verify(
      token,
      process.env.JWT_SECRET || "VFaI/_QXzM.xDf:ew~r]"
    );
    const user = client.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};
