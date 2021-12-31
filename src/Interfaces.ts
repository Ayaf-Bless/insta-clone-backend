import { User } from "@prisma/client";

interface OutPut {
  ok: boolean;
  error?: string;
  token?: string;
  user?: User | undefined;
}
const NEW_MESSAGE = "NEW_MESSAGE";

export { OutPut, NEW_MESSAGE };
