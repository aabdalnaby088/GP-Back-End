import AuthRouter from "./Auth/auth.routes.js";
import dataRouter from "./data/data.routes.js";



export default function bootstrap(app){
    app.use('/api/auth', AuthRouter);
    app.use('/api/data', dataRouter)
}