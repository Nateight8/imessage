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

export interface SearchUserInput {
  username: string;
}

export interface SearchsUsersData {
  searchUsers: SearchedUser[];
}

export interface SearchedUser {
  id: string;
  username: string;
}
