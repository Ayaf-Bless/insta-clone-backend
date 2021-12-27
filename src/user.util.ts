import { User } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import jwt from "jsonwebtoken";
import client from "./client";
import { Resolver } from "./types";
import { OutPut } from "./users/Interfaces";

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
  (parent, args, context, info: GraphQLResolveInfo): OutPut | null => {
    const query = info.operation.operation === "query";
    if (!context.loggedInUser) {
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "please log in to perform the action",
        };
      }
    }
    return resolver(parent, args, context, info);
  };
