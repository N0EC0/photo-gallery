import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadPhoto, getPhotos, deletePhoto } from "../controllers/photoController";

const router = Router();

router.post("/", upload.single("photo"), uploadPhoto);
router.get("/", getPhotos);
router.delete("/:id", deletePhoto);

export default router;