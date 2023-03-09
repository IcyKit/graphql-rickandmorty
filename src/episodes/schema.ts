import gql from 'graphql-tag';

export const typeDefs = gql`
type CharacterID {
  id: ID!
}

type Episode {
  id: ID!
  name: String!
  air_date: String!
  episode: String!
  characters: [CharacterID!]!
}

type Query {
  episodes: [Episode!]!
}
`