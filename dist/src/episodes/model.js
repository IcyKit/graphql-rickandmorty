import { Episode } from "./db.js";
import { v4 as uuidv4 } from 'uuid';
export const getEpisodes = async () => {
    return await Episode.find({});
};
export const getEpisode = async (id) => {
    const episode = await Episode.findOne({ id });
    if (!episode) {
        return {
            message: "Эпизода с таким ID не существует"
        };
    }
    return episode;
};
export const createEpisode = async (ep) => {
    const id = await uuidv4();
    const duplicateEpisode = await Episode.findOne({ name: ep.name });
    if (duplicateEpisode) {
        return {
            message: "Такой эпизод уже существует",
            duplicateEpisode
        };
    }
    const episode = await new Episode({ ...ep, id }).save();
    return episode;
};
export const deleteEpisode = async (id) => {
    const episode = await Episode.findOneAndDelete({ id });
    return episode;
};
export const updateEpisode = async (id, ep) => {
    await Episode.updateOne({ id }, ep);
    const episode = await Episode.findOne({ id });
    return episode;
};
