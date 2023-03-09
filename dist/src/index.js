import { startStandaloneServer } from "@apollo/server/standalone";
import { server as charactersServer } from "./characters/index.js";
import { server as episodesServer } from "./episodes/index.js";
import { ApolloServer } from "@apollo/server";
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource, } from "@apollo/gateway";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import mongoose from "mongoose";
export const startCharactersServer = async () => {
    const { url } = await startStandaloneServer(charactersServer, {
        listen: { port: 4002 },
    });
    console.log(`🚀 Сервер с персонажами начал прослушивание по адресу ${url}`);
};
export const startEpisodesServer = async () => {
    const { url } = await startStandaloneServer(episodesServer, {
        listen: { port: 4003 },
    });
    console.log(`🚀 Сервер с эпизодами начал прослушивание по адресу ${url}`);
};
// Federation
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        // const token = context.token;
        // console.log("AuthDataSourse context token", token);
        // request.http.headers.set("authorization", token);
    }
}
const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: "characters", url: "http://localhost:4002/" },
            { name: "episodes", url: "http://localhost:4003/" },
        ],
    }),
    buildService({ name, url }) {
        console.log("Build Service", name, url);
        return new AuthenticatedDataSource({ url });
    },
});
const startApolloServer = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/RickAndMorty");
    const server = new ApolloServer({
        gateway,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({}),
        listen: { port: 4000 },
    });
    console.log(`Суперграф начал прослушивание по адресу ${url}`);
};
startCharactersServer();
startEpisodesServer();
startApolloServer();
