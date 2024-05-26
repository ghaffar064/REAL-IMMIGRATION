import mongoose from "mongoose";
const BookingSchema =  mongoose.Schema(
    {
        serviceId:{
            type:String,
            required :true
        },
        agentMARN:{
            type: Number,
            required: true

        },
       
        customerFirstName:{
            type:String,
            required:true
        },
        customerLastName:{
            type:String,
            required:true,

        },
        customerPhoneNumber:{
            type:String,
            required:true
        }
        ,
        customerEmail:{
            type:String,
            required:true
        }
        ,
        date:{
        type: Date,
        required: true
       },
       time:{
        type: String,
        required: true
       },
          
      
        createdAt:{
            type: Date,
            default: Date.now
        }
     
    }

)
export const Booking = mongoose.model("Booking",BookingSchema)