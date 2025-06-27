import { Story } from "../../../db/models/index.js";
import { ErrorHandlerClass } from "../../utils/Error-class.utils.js";



export const getStoriesByCategory = async (req, res, next) => {
    const { category } = req.params;
    console.log(category);
    
    const stories = await Story.find({ category });
    res.status(200).json({ message: "success", stories });
}


export const getStoryById = async (req, res, next) => {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) {
        return next(new ErrorHandlerClass("story not found", 404));
    }
    res.status(200).json({ message: "success", story });
}