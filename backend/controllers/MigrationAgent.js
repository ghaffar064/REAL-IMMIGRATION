import { MigrationAgent } from "../models/MigrationAgentSchema.js";
export const createAgent = async (req, res) => {
  const { agentName, email, age, experience, MARN, languagesSpoken, availableTimeSlot } = req.body;
  const fileName = req.file.filename;
  
  // Split the availableTimeSlot string into an array
  const availableTimeSlotArray = availableTimeSlot.split(',');

  try {
    let agent = await MigrationAgent.findOne({ email });
    if (agent) {
      return res.status(404).json({
        success: false,
        msg: "Agent already exists",
      });
    } else {
      await MigrationAgent.create({
        agentName,
        email,
        age,
        experience,
        MARN,
        languagesSpoken,
        availableTimeSlot: availableTimeSlotArray, // Store as an array
        fileName,
      });
      return res.redirect("/user/admin");
    }
  } catch (error) {
    console.error('Error creating agent:', error.message, error.stack);
    return res.status(500).json({
      success: false,
      msg: "Error creating agent",
      error: error.message,
    });
  }
};

export const allAgents = async (req,res)=>{
             let agents =  await MigrationAgent.find()
             return res.status(201).json({
               agents
             })

}           
         