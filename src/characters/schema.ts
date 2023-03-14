import gql from 'graphql-tag'

export const typeDefs = gql`
scalar UUID

extend type Episode @key(fields: "id") {
  id: ID! @external
}

type Character @key(fields: "id") {
  id: ID!
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
  character(id: ID!): ReturnCharacterById!
}

type Mutation {
  createCharacter(char: CharacterInput): ReturnCharacter
  deleteCharacter(id: ID!): Character
  updateCharacter(id: ID!, char: CharacterUpdateInput): Character
}
`;