import AuthRouter from "./Auth/auth.routes.js";



export default function bootstrap(app){
    app.use('/api/auth', AuthRouter);
}