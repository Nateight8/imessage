import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export interface UsernameData {
  createUsername: {
    succeess: boolean;
    error: string;
  };
}

export interface UsernameVariables {
  username: string;
}

export interface GraphqlContext {
  session: Session | null;
  prisma: PrismaClient;
}

export interface CreateUsernameResponse {
  success?: Boolean;
  error?: String;
}
