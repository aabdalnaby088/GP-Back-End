import { Data } from "../../../db/models/data.model.js";
import { cloudinaryConfig } from "../../utils/cloudinary.utils.js"
import { ErrorHandlerClass } from "../../utils/Error-class.utils.js";



export const uploadDataFiles = async (req, res, next) =>{


    if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files were uploaded." })
    }
    const data = []; 
    for (const file of req.files) {
        const { secure_url, original_filename } = await cloudinaryConfig().uploader.upload(file.path, {
            folder: "gp/data",
            use_filename: true,
            resource_type: "raw"
        });
        const newData = await Data.create({
            url: secure_url,
            name: original_filename
        })
        data.push(original_filename)
        if(!newData){
            return next(new ErrorHandlerClass("data file can  not be uploaded", original_filename ))
        }
    }


    res.json({"message": "data files uploaded sussefully", data})
}