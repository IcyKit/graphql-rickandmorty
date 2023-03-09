import { Episode } from "./db.js";

export const getEpisodes = async () => {
  return await Episode.find({});
};
