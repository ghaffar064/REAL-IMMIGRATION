import { User } from "../models/UserSchema.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateToken=user=>{
    return jwt.sign({id:user._id},"KJLDJDLDSLDSLDSKLDDLDKSJSDNDCUSKCNCSDJKCNDCHDSJKCCHDDDUEWKNCBNDHKFNBSJWIQWEIDM",{
        expiresIn:'1d'
    })


}
export const register=async(req,res)=>{
    const {fname,lname,email,password} = req.body;
   

    try {
       const user = await User.findOne({email})
       if(user){
            res.status(400).json({
                success:false,
                msg:"user already existed"
            })
       }
       else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
         user =await User.create({
            fname,lname,email,
            password:hashedPassword
         })
        return    res.status(200).json({
            success:true,
            msg:'user created'
         })
       }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:"internal server error"
        })
    }
}
export  const login = async(req,res)=>{

    const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password")
    if(!user)
    {
     return res.status(404).json({
         success:false,
         msg:"user does not exist"
     })
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched)
    {
     return res.status(404).json({
         success:false,
         msg:"invalid password"
     })
    }
  
     
    const token = generateToken(user)

     return res.json({
         success:true,
         token:token
      })
             
 };