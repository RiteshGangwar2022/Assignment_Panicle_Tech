const mongoose=require("mongoose");
const DBurl=process.env.DBurl;

const connectdb=async () =>{

    try{
        const connect=await mongoose.connect(DBurl);
        console.log("server connected to database");
    }
    catch(err){
        console.log(err);
    }

}

//we will call connectdb fn inside serverjs to connect database to backend(nodejs)
module.exports=connectdb;