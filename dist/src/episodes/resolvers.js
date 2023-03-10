import { getEpisode, getEpisodes } from "./model.js";
export const resolvers = {
    Query: {
        episodes: () => getEpisodes(),
        episode: (_, { id }) => getEpisode(id)
    },
    Episode: {
        __resolveReference: ({ id }) => getEpisode(id),
        character: episode => ({ __typename: "Character", id: episode.character })
    }
};
