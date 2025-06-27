import { Cluster } from "../../../db/models/index.js";


export const getCategories = async (req, res, next) => {
    const categories = await Cluster.find({}, { cluster_name: 1, _id: 0 });
    res.status(200).json({ message: "success", categories });
}