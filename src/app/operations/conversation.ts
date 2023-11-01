import gql from "graphql-tag";

const conversationOperations = {
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantId: [String]!) {
        createConversation(participantId: $participantId) {
          conversationId
        }
      }
    `,
  },
};

export default conversationOperations;
