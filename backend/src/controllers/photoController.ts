import { Request, Response } from "express";
import { Photo } from "../models/Photo";

export async function uploadPhoto(req: Request, res: Response) {
    // console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const base64 = req.file.buffer.toString("base64");

    const created = await Photo.create({
        filename: req.file.originalname,
        imageBase64: base64,
        mimeType: req.file.mimetype,
        uploadDate: new Date(),
    });

    res.status(201).json({
        _id: created._id,
        filename: created.filename,
        uploadDate: created.uploadDate,
        imageUrl:`data:${created.mimeType};base64,${created.imageBase64}`,
    });
}

export async function getPhotos(req: Request, res: Response) {
    const photos = await Photo.find().sort({ uploadDate: -1 });
    // Converting the raw base64 into a data URL before return it
    const formatted = photos.map((p) => ({
        _id: p._id,
        filename: p.filename,
        uploadDate: p.uploadDate,
        imageUrl: `data:${p.mimeType};base64,${p.imageBase64}`,
    }));
    // More efficient when this is called from frontend since its in imgurl
    res.json(formatted);
}

export async function deletePhoto(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await Photo.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ error: "Photo not found" });
    }

    res.json({ message: "Deleted", id });
}