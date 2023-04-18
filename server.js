const express= require('express');
const dbConfig = require('./configs/db.config');
const app= express();
const portConfig= require('./configs/port.config');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect(dbConfig.DB_URL);
const db= mongoose.connection;

db.once("open",()=>{
   console.log("Succesfull connected to monodb");
})
db.on('error',()=>{
   console.log('error while connectin to mongodb');
   process.exit();
})

require('./routes/auth.route')(app);
require('./routes/address.route')(app);
require('./routes/product.route')(app);
require('./routes/order.route')(app);


app.listen(portConfig.PORT,()=>{
   console.log(`Server is up and running on ${portConfig.PORT}`);
})