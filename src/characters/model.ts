import { Character } from "./db.js";
import { v4 as uuidv4 } from 'uuid';

export const getCharacters = async () => {
  return await Character.find({});
};

export const getCharacter = async (id: string) => {
  const character = await Character.findOne({id});
  if (!character) {
    return {
      message: "Персонажа с таким ID не существует"
    }
  }
  return character
}

export const createCharacter = async (char) => {
  const id = await uuidv4();
  const duplicateCharacter = await Character.findOne({name: char.name});
  if (duplicateCharacter) {
    return {
      message: "Такой пользователь уже существует",
      duplicateCharacter
    }
  }
  const character = await new Character({...char, id}).save();
  return character;
}

export const deleteCharacter = async (id: string) => {
  const character = await Character.findOneAndDelete({id});
  return character;
}

export const updateCharacter = async (id: string, char) => {
  await Character.updateOne({id}, char);
  const character = await Character.findOne({id});
  return character;
}