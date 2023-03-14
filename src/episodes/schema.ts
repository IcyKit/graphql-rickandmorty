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
}

input EpisodeInput {
  name: String!
  air_date: String!
}

input EpisodeUpdateInput {
  name: String
  air_date: String
}

type DuplicateEpisodeError {
  message: String!
  duplicateEpisode: Episode!
}

type NotFoundError {
  message: String!
}

union ReturnEpisode = Episode | DuplicateEpisodeError
union ReturnEpisodeById = Episode | NotFoundError

type Query {
  episodes: [Episode!]!
  episode(id: ID!): ReturnEpisodeById!
}

type Mutation {
  createEpisode(ep: EpisodeInput): ReturnEpisode
  deleteEpisode(id: ID!): Episode
  updateEpisode(id: ID!, ep: EpisodeUpdateInput): Episode
}
`