
import mongoose, { model, Schema } from 'mongoose'

const OTPSchema = new Schema({
    otp: { type: String, required: true },
    email:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10,
    },
})

export const OTP = mongoose.models.OTP || model('OTP', OTPSchema)