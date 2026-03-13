import { Request, Response } from "express";
import { Photo } from "../models/Photo";

// Creates a Photo document from the uploaded file (stored as base64)
export async function uploadPhoto(req: Request, res: Response) {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Store file bytes as base64 so the frontend can render via data URL
    const base64 = req.file.buffer.toString("base64");

    const created = await Photo.create({
        filename: req.file.originalname,
        imageBase64: base64,
        mimeType: req.file.mimetype,
        uploadDate: new Date(),
    });

    // Return a ready-to-use imageUrl for the frontend
    res.status(201).json({
        _id: created._id,
        filename: created.filename,
        uploadDate: created.uploadDate,
        imageUrl:`data:${created.mimeType};base64,${created.imageBase64}`,
    });
}

// Fetches photos and formats them into frontend-friendly objects (data URLs)
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

// Deletes a photo document by id
export async function deletePhoto(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await Photo.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ error: "Photo not found" });
    }

    res.json({ message: "Deleted", id });
}