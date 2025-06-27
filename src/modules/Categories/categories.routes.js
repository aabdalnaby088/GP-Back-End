

import { Router } from "express";

import { getCategories } from "./categories.controller.js";
import { handleError } from "../../middlewares/handleError.middleware.js";

const categoriesRouter = Router();

categoriesRouter.get('/', handleError(getCategories));

export default categoriesRouter;