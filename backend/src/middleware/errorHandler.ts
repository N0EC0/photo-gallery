import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const msg = err?.message || "Server error";

    // Multer file-size errors show as err.code === 'LIMIT_FILE_SIZE'
    if (err?.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File too large (max 5MB)" });
    }

    return res.status(400).json({ error: msg });
}