import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadPhoto, getPhotos, deletePhoto } from "../controllers/photoController";

const router = Router();

// Upload a single image file (multipart/form-data field name: "photo")
router.post("/", upload.single("photo"), uploadPhoto);

// Get the list of photos (newest first)
router.get("/", getPhotos);

// Delete a photo by MongoDB document id
router.delete("/:id", deletePhoto);

export default router;