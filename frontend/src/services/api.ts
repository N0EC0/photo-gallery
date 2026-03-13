// Backend API base URL
const BASE = "http://localhost:3001/api";

// Returns list of photos with imageUrl ready for rendering
export async function fetchPhotos() {
    const res = await fetch(`${BASE}/photos`);
    if (!res.ok) throw new Error("Failed to fetch photos");
    return res.json();
}

// Uploads a single image file under the "photo" form field
export async function uploadPhoto(file: File) {
    const fd = new FormData();
    fd.append("photo", file);

    const res = await fetch(`${BASE}/photos`, {
        method: "POST",
        body: fd,
    });

    // Parse JSON either way so we can catch backend error messages
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Upload failed");
    }

    return data;
}

// Removes a photo by id
export async function deletePhoto(id: string) {
    const res = await fetch(`${BASE}/photos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
}