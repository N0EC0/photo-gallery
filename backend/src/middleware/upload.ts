import multer from "multer";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const allowedTypes = new Set(["image/png", "image/jpeg", "image/jpg"]);

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        if(!allowedTypes.has(file.mimetype)) {
            return cb(new Error("Only jpg, jpeg, png image types allowed"));
        }
        cb(null, true);
    },
});
