const express = require('express');
const mongoose = require('mongoose'); 
var bodyParser = require('body-parser'); 
app= express();
var cookieParser = require('cookie-parser')
app.use(cookieParser()); 
const dbConfig = require('./config/secret')
http = require('http');
cors = require('cors');

const _ = require('lodash'); 


app.use(express.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({extended:true , limit : '25mb'})); 


app.use((req ,res , next) => {  
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Credentials', 'true'); 
    res.header('Access-Control-Allow-Headers', 'Origin', 'X-Request-With', 'Content-Type', 'Accept', 'Authorization');
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();  
})

const server = http.createServer(app); 
const io = require('socket.io')(server);
// const logger = require('morgan'); 

app.use(cors({origin :'http://localhost:4200'})); 
// app.use(logger('dev')); 


const PORT = 3000 || process.env.PORT ;
mongoose.connect('mongodb://localhost/socialapp', {useUnifiedTopology : true , useNewUrlParser : true}); 

const {User} = require('./Helpers/UserClass')
require('./socket/streams')(io ,User , _)
require('./socket/private')(io)

app.use('/api/chatapp',require('./routes/authRoutes') ); 
app.use('/api/chatapp',require('./routes/postRoutes')); 
app.use('/api/chatapp',require('./routes/userRoutes')); 
app.use('/api/chatapp',require('./routes/friendsRoures')); 
app.use('/api/chatapp',require('./routes/messageRoutes')); 
app.use('/api/chatapp', require('./routes/imageRoutes')); 
server.listen(3000, ()=> { 
    console.log('Listening  on port 3000');
}); 



