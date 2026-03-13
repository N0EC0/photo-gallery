import { useEffect, useState } from "react";
import { fetchPhotos, deletePhoto } from "../services/api";
import { Photo } from "../types";
import PhotoCard from "./PhotoCard";
import UploadForm from "./UploadForm";

// Container component: loads photos, handles upload/delete, renders the gallery grid
export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);

    // Fetch initial photo list from the backend
    async function loadPhotos() {
        const data = await fetchPhotos();
        setPhotos(data);
    }

    // Load once
    useEffect(() => {
        loadPhotos();
    }, []);

    // Delete photo on the server, then remove it from local state
    async function handleDelete(id: string) {
        await deletePhoto(id);
        setPhotos((prev) => prev.filter((p) => p._id !== id));
    }

    // Prepend newly uploaded photo to the list
    function handleUpload(newPhoto: Photo) {
        setPhotos((prev) => [newPhoto, ...prev]);
    }

    return (
        <>
            <UploadForm onUpload={handleUpload} />

            {photos.length === 0 ? (
                <p className="empty-state">No photos uploaded yet.</p>
            ) : (
                <div className="editorial-grid">
                    {photos.map((photo, index) => (
                        <PhotoCard
                            key={photo._id}
                            photo={photo}
                            onDelete={handleDelete}
                            index={index}
                        />
                    ))}
                </div>
                )}
        </>
    );
}