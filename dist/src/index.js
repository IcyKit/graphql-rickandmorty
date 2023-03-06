import { startStandaloneServer } from "@apollo/server/standalone";
import { server as charactersServer } from "./characters/index.js";
import { server as episodesServer } from "./episodes/index.js";
const startCharactersServer = async () => {
    const { url } = await startStandaloneServer(charactersServer, {
        listen: { port: 4001 },
    });
    console.log(`🚀 Сервер с персонажами начал прослушивание по адресу ${url}`);
};
const startEpisodesServer = async () => {
    const { url } = await startStandaloneServer(episodesServer, {
        listen: { port: 4002 },
    });
    console.log(`🚀 Сервер с эпизодами начал прослушивание по адресу ${url}`);
};
startCharactersServer();
startEpisodesServer();
