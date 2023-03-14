import { createEpisode, deleteEpisode, getEpisode, getEpisodes, updateEpisode } from "./model.js";
export const resolvers = {
    Query: {
        episodes: () => getEpisodes(),
        episode: (_, { id }) => getEpisode(id)
    },
    Mutation: {
        createEpisode: (_, { ep }) => createEpisode(ep),
        deleteEpisode: (_, { id }) => deleteEpisode(id),
        updateEpisode: (_, { id, ep }) => updateEpisode(id, ep)
    },
    Episode: {
        __resolveReference: ({ id }) => getEpisode(id),
        character: episode => ({ __typename: "Character", id: episode.character })
    },
    ReturnEpisode: {
        __resolveType: (obj, contextValue, info) => {
            if (obj.name) {
                return "Episode";
            }
            return "DuplicateEpisodeError";
        },
    },
    ReturnEpisodeById: {
        __resolveType: (obj, contextValue, info) => {
            if (obj.id) {
                return "Episode";
            }
            return "NotFoundError";
        },
    }
};
