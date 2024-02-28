import mongoose from "mongoose"



 const Connection = async (URL) =>{
    try {        
       await mongoose.connect(URL,{ useNewUrlParser:true })
       console.log('DB Connnected Succesfully')
    } catch (error) {
        console.log('Error while Connecting with DB !',error);
    }
}

export default Connection;