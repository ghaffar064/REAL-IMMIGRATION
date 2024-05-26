import mongoose from "mongoose";
const ServiceSchema =  mongoose.Schema(

    {
        id:{
            type:String,
            required :true
        },
            VisaType:{
            type:String,
            required :true
        },
        TimeLimit:{
            type:String,
            required:true
        },
        Price:{
            type:String,
            required:true,

        },
        Details:{
            type:String,
            required:true
        }
        
       
    }

)
export const Service = mongoose.model("Service",ServiceSchema)