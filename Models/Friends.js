const {Schema,model} = require('mongoose')


const freindSchema = new Schema({
    follower:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    following:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})


const Friend = model('Friend',freindSchema)
freindSchema.index({ follower: 1, following: 1 }, { unique: true });

module.exports = Friend