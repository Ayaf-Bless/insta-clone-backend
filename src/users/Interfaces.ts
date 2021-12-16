import { User } from "@prisma/client";

export interface OutPut {
  ok: boolean;
  error?: string;
  token?: string;
  user?: User | undefined;
}
