import gql from 'graphql-tag';

export const typeDefs = gql`
scalar UUID

extend type Character @key(fields: "id") {
  id: UUID! @external
}

type Episode @key(fields: "id") {
  id: UUID!
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
  episode(id: UUID!): ReturnEpisodeById!
}

type Mutation {
  createEpisode(ep: EpisodeInput): ReturnEpisode
  deleteEpisode(id: UUID!): Episode
  updateEpisode(id: UUID!, ep: EpisodeUpdateInput): Episode
}
`