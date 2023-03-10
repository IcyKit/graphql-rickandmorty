import gql from 'graphql-tag';

export const typeDefs = gql`
extend type Character @key(fields: "id") {
  id: ID! @external
}

type Episode @key(fields: "id") {
  id: ID!
  name: String!
  air_date: String!
  characters: [Character!]!
  character: Character!
}

type Query {
  episodes: [Episode!]!
  episode(id: ID!): Episode!
}
`