 const mongoose = require("mongoose");

   mongoose.connect('mongodb+srv://namansinvns:dmxQ4NRNymFfWbhc@cluster0.9bo5aus.mongodb.net/',
   { useNewUrlParser: true, useUnifiedTopology: true }
   ).then(()=>{
       console.log('database connected')
   }).catch((err)=>{
        console.log(err)
   }
   )

   module.exports = mongoose;
   