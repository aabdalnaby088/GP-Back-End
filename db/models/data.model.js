
import mongoose, { model, Schema } from 'mongoose'

const dataSchema = new Schema({
    url:{
        type:String
    },
    name:{
        type:String,
        required:true
    }

}, {timestamps: true})

export const Data = mongoose.models.Data || model('Data', dataSchema)