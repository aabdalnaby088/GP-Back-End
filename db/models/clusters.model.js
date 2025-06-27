


import mongoose, { model, Schema } from 'mongoose';

const clusterSchema = new Schema({
    cluster_id: {
        type: String,
        required: true
    },
    cluster_name: {
        type: String,
        required: true
    },
    points: [String]
});

export const Cluster = mongoose.models.Cluster || model('Cluster', clusterSchema);