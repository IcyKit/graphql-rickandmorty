import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  id: String,
  name: String,
  air_date: String,
  episode: String,
  characters: [{id: String}]
})

export const Episode = mongoose.model('Episodes', episodeSchema);