import { useEffect, useState } from "react";
import { fetchPhotos, deletePhoto } from "../services/api";
import { Photo } from "../types";
import PhotoCard from "./PhotoCard";

export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);

    async function loadPhotos() {
        const data = await fetchPhotos();
        setPhotos(data);
    }

    useEffect(() => {
        loadPhotos();
    }, []);

    async function handleDelete(id: string) {
        await deletePhoto(id);
        setPhotos(photos.filter((p) => p._id !== id));
    }

    if (photos.length === 0) {
        return <p className="empty-state">No photos uploaded yet.</p>;
    }

    return (
        <div className="editorial-grid">
            {photos.map((photo, index) => (
                <PhotoCard key={photo._id} photo={photo} onDelete={handleDelete} index={index} />
            ))}
        </div>
    );
}