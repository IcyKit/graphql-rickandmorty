import { Character } from "./db.js";
export const getCharacters = async () => {
    return await Character.find({});
};
