const mongoose=require("mongoose");

const userschema=new mongoose.Schema({

    product_Id:{
        type:String,
         },
    expire_date:{
        type:String,
             },
});
const usr= new mongoose.model("Data_manish_detail",userschema);
module.exports=usr;