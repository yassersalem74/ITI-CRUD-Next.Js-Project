const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    imageUrl : String,
    details : String
})
 
//get from database , if no , build it
export default mongoose.models.Post || mongoose.model('Post', postSchema)