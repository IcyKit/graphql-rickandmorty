import { getCharacters } from "./model.js";
export const resolvers = {
    Query: {
        characters: () => getCharacters(),
    },
};
