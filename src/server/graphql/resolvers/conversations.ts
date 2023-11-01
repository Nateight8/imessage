import { GraphqlContext } from "@/lib/typesdefs";

const conversationsResolvers = {
  //   Queries: {},
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantId: string },
      context: GraphqlContext
    ) => {
      console.log("INSIDE CREATING CONVERSATION", args);
    },
  },
  //   Subscriptions: {},
};

export default conversationsResolvers;
