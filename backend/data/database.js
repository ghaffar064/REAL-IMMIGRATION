import mongoose from "mongoose";

export const connectdb=()=>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName: 'REAL-IMMIGRATION'
    }).then(()=>{console.log("db connected")})
    .catch((e)=>{console.log(e)})
}