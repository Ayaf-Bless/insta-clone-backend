import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import client from "./client";
import { OutPut } from "./users/Interfaces";
import { Resolver } from "./users/types";

export const getUser = async (
  token: string | undefined
): Promise<User | null> => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(
      token,
      process.env.JWT_SECRET || "VFaI/_QXzM.xDf:ew~r]"
    );
    if ("id" in verifiedToken) {
      const user = client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      if (!user) {
        return null;
      }
      return user;
    }
    return null;
  } catch {
    return null;
  }
};

export const protectedResolver =
  (resolver: Resolver) =>
  (parent, args, context, info): OutPut => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "please log in to perform the action",
      };
    }
    return resolver(parent, args, context, info);
  };
