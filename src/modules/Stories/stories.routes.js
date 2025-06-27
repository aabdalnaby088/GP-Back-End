

import { Router } from "express";

import { getStoriesByCategory, getStoryById } from "./stories.controller.js";
import { handleError } from "../../middlewares/handleError.middleware.js";

const storiesRouter = Router();

storiesRouter.get('/storiesByCategory/:category', handleError(getStoriesByCategory));
storiesRouter.get('/:id', handleError(getStoryById));

export default storiesRouter;