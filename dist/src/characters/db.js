import mongoose from "mongoose";
const characterSchema = new mongoose.Schema({
    id: String,
    name: String,
    status: String,
    type: String,
    gender: String,
    species: String,
    image: String,
    createdAt: Number,
    episodes: [{ id: String }],
});
export const Character = mongoose.model('Characters', characterSchema);
