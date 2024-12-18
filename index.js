import express from 'express'
import 'dotenv/config'
import db_connection from './db/dbConnection.js'
import { globalResponse } from './src/middlewares/handleError.middleware.js'
import  bootstrap  from "./src/modules/bootstrap.js"
import cors from 'cors'
import { ErrorHandlerClass } from './src/utils/Error-class.utils.js'


const app = express()
const port = process.env.port || 5000
app.use(cors());  
app.use(express.json());

bootstrap(app)
app.use('*', (req, res, next) => {
    next(new ErrorHandlerClass(`route not found ${req.originalUrl}`, 404))
})
app.use(globalResponse)

db_connection()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))