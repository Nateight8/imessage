import conversationsResolvers from "./conversations";
import userResolvers from "./user";
import merge from "lodash.merge";

const resolvers = merge({}, userResolvers, conversationsResolvers);

export default resolvers;
