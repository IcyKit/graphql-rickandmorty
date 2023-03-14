import gql from 'graphql-tag'

export const typeDefs = gql`
scalar UUID

extend type Episode @key(fields: "id") {
  id: UUID! @external
}

type Character @key(fields: "id") {
  id: UUID!
  name: String!
  status: String!
  species: String!
  type: String!
  gender: String!
  image: String!
  episodes: [Episode!]!
}

input CharacterInput {
  name: String
  status: String!
  species: String!
  type: String!
  gender: String!
  image: String!
}

input CharacterUpdateInput {
  name: String
  status: String
  species: String
  type: String
  gender: String
  image: String
}

type DuplicateCharacterError {
  message: String!
  duplicateCharacter: Character!
}

type NotFoundError {
  message: String!
}

union ReturnCharacter = Character | DuplicateCharacterError
union ReturnCharacterById = Character | NotFoundError

type Query {
  characters: [Character!]!
  character(id: UUID!): ReturnCharacterById!
}

type Mutation {
  createCharacter(char: CharacterInput): ReturnCharacter
  deleteCharacter(id: UUID!): Character
  updateCharacter(id: UUID!, char: CharacterUpdateInput): Character
}
`;