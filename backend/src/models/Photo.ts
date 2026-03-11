import { Schema, model } from "mongoose";

export interface PhotoDoc {
    filename: string;
    imageBase64: string;
    uploadDate: Date;
}

const photoSchema = new Schema<PhotoDoc> (
    {
        filename: {type: String, required: true},
        imageBase64: {type: String, required: true},
        uploadDate: {type: Date, required: true, default: Date.now},
    },
    { versionKey: false },
);

export const Photo = model<PhotoDoc>("Photo", photoSchema);