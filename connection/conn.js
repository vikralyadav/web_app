const mongoose = require("mongoose");
mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://vikralyadav:vikral2002@cluster0.u0gkyqb.mongodb.net/test",
).then(()=> console.log("connected ...."))
.catch(()=>console.log("not connected"));