import {
  CreateUsernameResponse,
  GraphqlContext,
  UsernameData,
} from "@/lib/typesdefs";

const userResolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      ctx: GraphqlContext
    ): Promise<CreateUsernameResponse> => {
      const { prisma, session } = ctx;
      const { username } = args;

      if (!session?.user) {
        return {
          error: "unauthorized",
        };
      }

      const { id } = session.user;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      try {
        // username exists

        const usernameExisit = await prisma.user.findUnique({
          where: { username },
        });

        if (usernameExisit) {
          return {
            error: "Username already taken",
          };
        }

        await prisma.user.update({
          data: { username },
          where: {
            id,
          },
        });

        return { success: true };
      } catch (error) {
        console.log(error);
      }

      return {};
    },
  },
  //   Subscription: {},
};

export default userResolvers;
