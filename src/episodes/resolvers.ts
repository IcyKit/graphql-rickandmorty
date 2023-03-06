import { getEpisodes } from "./model.js";

export const resolvers = {
  Query: {
    episodes: () => getEpisodes(),
  },
};
