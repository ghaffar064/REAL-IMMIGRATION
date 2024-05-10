import { MigrationAgent } from "../models/MigrationAgentSchema.js"

export const createAgent= async (req,res)=>{
     const {agentName,email,age,experience,MARN,languagesSpoken} = req.body;
     const {fileName} = req.file.fileName;
     let agent = await MigrationAgent.findOne({email});
     if(agent)
          {
             res.status(404).json(
                    {
                         success:false,
                         msg:"agent already existed"
                    }
               )
          }
          else{
               await MigrationAgent.create({
                    agentName,email,age,experience,MARN,languagesSpoken, fileName
               })
               return res.redirect("/user/admin")
              
               
                    }

         
    


     }