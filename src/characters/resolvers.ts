import { getCharacters, getCharacter, createCharacter, deleteCharacter, updateCharacter } from "./model.js";
import { UUIDResolver } from "graphql-scalars";
import { TimestampResolver } from "graphql-scalars";

export const resolvers = {
  UUID: UUIDResolver,
  Timestamp: TimestampResolver,
  Query: {
    characters: (_, {limit, after, before}) => getCharacters(limit, after, before),
    character: (_, {id}) => getCharacter(id)
  },
  Mutation: {
    createCharacter: (_, {char}) => createCharacter(char),
    deleteCharacter: (_, {id}) => deleteCharacter(id),
    updateCharacter: (_, {id, char}) => updateCharacter(id, char)
  },
  Character: {
    __resolveReference: ({id}) => getCharacter(id),
    episode: character => ({__typename: "Episode", id: character.episode})
  },
  ReturnCharacter: {
    __resolveType: (obj, contextValue, info) => {
      if (obj.name) {
        return "Character"
      } 
      return "DuplicateCharacterError"
    },
  },
  ReturnCharacterById: {
    __resolveType: (obj, contextValue, info) => {
      if (obj.id) {
        return "Character"
      } 
      return "NotFoundError"
    },
  }
};
