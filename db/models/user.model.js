import mongoose, {model, Schema} from 'mongoose'

const userSchema = new Schema({
    fullName: {
        type: String, 
        trim: true,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        trim: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type:String,
        trim: true,
        required: true,
        true: true,
    },
    age:{
        type:Number,
        required: true,
    }, 
    score:{
        type:Number,
        default:0
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    }
}, { timestamps: true  })

export const User = mongoose.models.User || model('User', userSchema)