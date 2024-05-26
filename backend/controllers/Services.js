import { Service } from "../models/ServiceSchema.js"
export const AddService=async(req,res)=>{
   
    const { id,VisaType,TimeLimit,Price, Details} = req.body

    let service = await Service.findOne({id})
    if(service)
        {
            res.status(404).json({
              success: false,
              msg: "service already existed",
            });
          } else {
            await Service.create({
                VisaType,
                TimeLimit,
                Price,
                id,
              Details
             
            });
            // return res.redirect("/user/admin");
            return res.status(200).json(
                {
                    msg:'service added'
                }
            )
          }
   
   
}
export const allServices = async (req,res)=>{
  let services =  await Service.find()
  return res.status(201).json({
    services
  })

}           
