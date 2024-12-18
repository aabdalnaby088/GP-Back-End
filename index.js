import express from 'express'
import 'dotenv/config'
import db_connection from './db/dbConnection.js'
import { globalResponse } from './src/middlewares/handleError.middleware.js'
import  bootstrap  from "./src/modules/bootstrap.js"
import cors from 'cors'


const app = express()
const port = process.env.port || 5000
app.use(cors());  
app.use(express.json());

bootstrap(app)
app.use(globalResponse)

db_connection()
app.get('/', (req, res) => res.json({'message':'Hello World!'}))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))