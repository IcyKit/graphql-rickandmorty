import { getCharacters, getCharacter } from "./model.js";
export const resolvers = {
    Query: {
        characters: () => getCharacters(),
        character: (_, { id }) => getCharacter(id)
    },
    Character: {
        __resolveReference: ({ id }) => getCharacter(id),
        episode: character => ({ __typename: "Episode", id: character.episode })
    }
};
