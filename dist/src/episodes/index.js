import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import { readFileSync } from "fs";
const typeDefs = readFileSync("./dist/src/episodes/schema.graphql", {
    encoding: "utf-8",
});
export const server = new ApolloServer({
    typeDefs,
    resolvers,
});
