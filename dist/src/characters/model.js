import { Character } from "./db.js";
import { v4 as uuidv4 } from 'uuid';
import { base64decode, base64encode } from "nodejs-base64";
export const getCharacters = async (limit, after, before) => {
    if (after) {
        const date = Number(base64decode(after));
        const characters = await Character.find({}).where('createdAt').gt(date).limit(limit + 1);
        console.log(characters);
        return {
            edges: characters.slice(0, limit),
            pageInfo: {
                startCursor: base64encode(characters[0].createdAt),
                endCursor: base64encode(characters[characters.length - 2].createdAt),
                hasNextPage: characters.length > limit,
                hasPrevPage: true
            }
        };
    }
    else if (before) {
        const date = Number(base64decode(before));
        const characters = await Character.find({}).where('createdAt').lt(date).limit(limit + 1).sort({ createdAt: -1 });
        return {
            edges: characters.slice(0, limit),
            pageInfo: {
                startCursor: base64encode(characters[0].createdAt),
                endCursor: base64encode(characters[characters.length - 2].createdAt),
                hasNextPage: true,
                hasPrevPage: characters.length > limit
            }
        };
    }
    else {
        const characters = await Character.find({}).limit(limit + 1);
        return {
            edges: characters.slice(0, limit),
            pageInfo: {
                startCursor: base64encode(characters[0].createdAt),
                hasPrevPage: false,
                endCursor: base64encode(characters[characters.length - 2].createdAt),
                hasNextPage: characters.length > limit
            }
        };
    }
};
export const getCharacter = async (id) => {
    const character = await Character.findOne({ id });
    if (!character) {
        return {
            message: "Персонажа с таким ID не существует"
        };
    }
    return character;
};
export const createCharacter = async (char) => {
    const id = await uuidv4();
    const duplicateCharacter = await Character.findOne({ name: char.name });
    if (duplicateCharacter) {
        return {
            message: "Такой пользователь уже существует",
            duplicateCharacter
        };
    }
    const createdAt = Date.now();
    const character = await new Character({ ...char, id, createdAt }).save();
    return character;
};
export const deleteCharacter = async (id) => {
    const character = await Character.findOneAndDelete({ id });
    return character;
};
export const updateCharacter = async (id, char) => {
    await Character.updateOne({ id }, char);
    const character = await Character.findOne({ id });
    return character;
};
