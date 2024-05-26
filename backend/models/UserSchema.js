import mongoose from "mongoose";
const UserSchema =  mongoose.Schema(
    {
        fname:{
            type:String,
            required :true
        },
        lname:{
            type:String,
            required :true
        },
        email:{
            type:String,
            required:true
        },
        password:
        {type: String,
         select: false,
         required: true
        },
        
        createdAt:{
            type: Date,
            default: Date.now
        }
     
    }

)
export const User = mongoose.model("User",UserSchema)