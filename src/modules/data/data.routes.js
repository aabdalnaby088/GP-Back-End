import { Router } from "express";
import { multerHost } from "../../middlewares/multer.middleware.js";
import { handleError } from "../../middlewares/handleError.middleware.js";
import { uploadDataFiles } from "./data.controller.js";


const dataRouter = Router()


dataRouter.post('/uploadData', multerHost().array('dataFiles', 3), handleError(uploadDataFiles))


export default dataRouter;