import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import { buildSubgraphSchema } from "@apollo/federation";
import { typeDefs } from "./schema.js";

export const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers})
});
