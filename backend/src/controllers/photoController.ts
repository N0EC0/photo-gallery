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
        uploadDate: new Date(),
    });

    res.status(201).json(created);
}

export async function getPhotos(req: Request, res: Response) {
    const photos = await Photo.find().sort({ uploadDate: -1 });
    res.json(photos);
}

export async function deletePhoto(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await Photo.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ error: "Photo not found" });
    }

    res.json({ message: "Deleted", id });
}