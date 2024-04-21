import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js'
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
dotenv.config();

app.use(cors({
    origin: ['https://carzine.netlify.app',
              'https://carzine-backend-deployment.onrender.com',
            ],
    methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify the allowed request headers
}));
app.use(bodyParser.json({extended :true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use('/',Router);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{

console.log(`Server is running Succesfully on ${PORT} !`)
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

//const URL =`mongodb+srv://${username}:${password}@cluster0.thyv4tm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`;
const URL = `mongodb+srv://vnkthebeast:RqPKLAd6EBGj4Ihq@mumbaicluster.25j0bri.mongodb.net/carzine?retryWrites=true&w=majority`;
Connection(URL);
})