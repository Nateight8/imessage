import gql from "graphql-tag";

const conversationsTypedefs = gql`
  type Mutation {
    createConversation(participantId: [String]): ConversationResponse
  }

  type ConversationResponse {
    conversationId: String
  }
`;

export default conversationsTypedefs;
