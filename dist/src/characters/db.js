import mongoose from "mongoose";
const characterSchema = new mongoose.Schema({
    id: String,
    name: String,
    status: String,
    type: String,
    gender: String,
    image: String,
    episode: [{ id: String }]
});
export const Character = mongoose.model('Characters', characterSchema);
