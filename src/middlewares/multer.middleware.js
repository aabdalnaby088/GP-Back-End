import multer, { diskStorage } from "multer";
import fs from "fs";
import path from "path";
import {DateTime} from "luxon"
import { nanoid } from "nanoid";
import { ErrorHandlerClass } from "../utils/Error-class.utils.js";
export const multerMiddleware = ({filePath = "general"} = {}) => {
    const destinationPath = path.resolve(`src/uploads/${filePath}`);
    if(!fs.existsSync(destinationPath)){
        fs.mkdirSync(destinationPath, { recursive: true});
    }

    const storage = diskStorage({
        destination: (req, file, cb) => {
            cb(null, destinationPath );
        }, 
        filename: (req, file, cb) => {
            const uniqueFilename = DateTime.now().toFormat("yyyy-MM-dd") + "__" + nanoid(4) + "__" + file.originalname
            cb(null, uniqueFilename)
        }
    });

    const fileFilter = (req, file, cb) => {
        // accept .pdf files only 
        if (file.mimetype === "application/pdf") {
            return cb(null, true);
        }
        return cb(new ErrorHandlerClass("Error in file extension pdf only is allowed", 400)); 
    }

    return multer({fileFilter, storage})
}


export const multerHost = () => {

    const storage = multer.diskStorage({
        filename: (req, file, cb) => {
            const uniqueFilename = DateTime.now().toFormat("yyyy-MM-dd") + "__" + nanoid(4) + "__" + file.originalname
            cb(null, uniqueFilename)
        }
    });


    const fileFilter = (req, file, cb) => {
        // accept .pdf files only 
        // return cb(null, true);
        console.log(file.mimetype);
        
        if (file.mimetype == "application/pdf") {
            return cb(null, true);
        }
        return cb(new ErrorHandlerClass("Error in file extension pdf only is allowed", 400));
    }

    return multer({ fileFilter, storage })
}

