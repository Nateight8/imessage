import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import typeDefs from "@/server/graphql/typeDefs";
import resolvers from "@/server/graphql/resolvers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/authOptions";
import { NextRequest } from "next/server";
import { GraphqlContext } from "@/lib/typesdefs";
import prisma from "@/server/db";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (): Promise<GraphqlContext> => {
    const session = await getServerSession(authOptions);

    return { session, prisma };
  },
});

export { handler as GET, handler as POST };
