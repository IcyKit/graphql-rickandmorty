import { Episode } from "./db.js";
export const getEpisodes = async () => {
    return await Episode.find({});
};
export const getEpisode = async (id) => {
    return await Episode.findOne({ id });
};
