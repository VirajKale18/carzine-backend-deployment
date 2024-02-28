import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js'
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended :true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use('/',Router);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{

console.log(`Server is running Succesfully on ${PORT} !`)
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URL || `mongodb+srv://${username}:${password}@cluster0.thyv4tm.mongodb.net/?retryWrites=true&w=majority`
Connection(URL);
})