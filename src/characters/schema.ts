import gql from 'graphql-tag'

export const typeDefs = gql`
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
  episode: Episode!
}

type Query {
  characters: [Character!]!
  character(id: ID!): Character!
}
`;