import AuthRouter from "./Auth/auth.routes.js";
import categoriesRouter from "./Categories/categories.routes.js";
import dataRouter from "./data/data.routes.js";
import storiesRouter from "./Stories/stories.routes.js";



export default function bootstrap(app){
    app.use('/api/auth', AuthRouter);
    app.use('/api/data', dataRouter);
    app.use('/api/stories', storiesRouter);
    app.use('/api/categories', categoriesRouter);
}