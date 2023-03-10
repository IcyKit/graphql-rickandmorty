import { Character } from "./db.js";

export const getCharacters = async () => {
  return await Character.find({});
};

export const getCharacter = async (id: string) => {
  return await Character.findOne({id})
}