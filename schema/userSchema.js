const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    image: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    height:{
        type:Number,
        required:true
    }
})

const UserPost = mongoose.model ("usersGallery", userSchema)

module.exports = UserPost