const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT||5000;
require("./connection/conn")
const schema = require("./model/storing")
app.set("view engine",'ejs');
const path = require("path")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//const sendmail = require("../nodemailer/mailer");
const static1 = path.join(__dirname,"/views")
app.use(express.static(static1));
app.set("view engine", "ejs");



const nodemailer = require("nodemailer")

function sendmail(id,date)
{
   
 var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: "yadavvikral2003@gmail.com",
     pass: "abtywrggqylvcass",
   }
 })
 var mailOptions = {
  from: 'yadavvikral2003@gmail.com',
  to: `yadavvikral2003@gmail.com`,
  subject: 'registor email verification',
  text: `Expire details product id : ${id}
  expire date : ${date}`
}
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
}



app.get("/",(req,res)=>{

    res.render("homepage")
})

app.get("/set",async(req,res)=>{

    res.render("storing")

})
app.post("/set",async(req,res)=>{

    const id = req.body.id;
    const date = req.body.date

    const detail=
    {
        product_Id:id,
        expire_date:date
    }

    const usr = new schema(detail)
    const adnew = await usr.save()
    res.redirect("/set");


})
app.get("/info",async(req,res)=>{

    const data = await schema.find({})
    res.render("selling",{data:data})

})
app.get("/sendmail", async(req,res)=>{
    const data = await schema.find({})
    const d = new Date();
    let array =[];
    for(let  i=0;i<data.length;i++)
    {      
        let d2 = new Date(data[i].expire_date)

        
        if(d.getDate()==d2.getDate()&&d.getFullYear()==d2.getFullYear()&&d.getMonth()==d2.getMonth())
        
        {
            sendmail(data[i].product_Id,data[i].expire_date)
            array[i] = data[i]
        }
    }
    res.render("selling",{data:array})
})



app.listen(port,()=>console.log("server is up....."));
