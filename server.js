const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');

const connectDB = require('./server/database/connection')

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

//mongodb connection
connectDB();

//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
// app.set("views",path.join(__dirname,"views"))

//load assets
app.use('/bootstrap',express.static(path.resolve(__dirname,"assets/bootstrap")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load route
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`);
})
