// require for work doteenv ... process.env .. etc - 
//data from file .env
//  // npm i express-fileupload - work with IMG and files - register need
require('dotenv').config();
 
const express = require('express');

const fileUpload = require('express-fileupload');

const sequelize = require('./db');

const modeles = require('./models/models');

const cors = require('cors');

const router = require('./routes');

const path = require('path');

const errorHandler = require('./middleware/errorHandlingMiddleware'); 

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(fileUpload({})); //register for work with img , files 

app.use('/api' , router);

app.use( express.static(path.resolve(__dirname ,'static')  ));// for static file раздача статических файлов
// app.use('/ЛЮБОЙ путь' , express.static(path.resolve(__dirname ,'static')  ));// for static file раздача статических файлов
// любой путь(example- /dist/img or /upload/img etc)  

//обработка ошибок - middleware который работает с ошибками должен!! идти в конце всех подключений use !!!
app.use(errorHandler);

const start = async ()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();


        app.listen(PORT , ()=> console.log(`Server  started on PORT:${PORT}`));
        
    }catch{
        console.log('Something is going wrong');
    }
}

start();

