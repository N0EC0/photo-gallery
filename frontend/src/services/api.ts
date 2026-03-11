const BASE = "http://localhost:3001/api";

export async function fetchPhotos() {
    const res = await fetch(`${BASE}/photos`);
    if (!res.ok) throw new Error("Failed to fetch photos");
    return res.json();
}

export async function uploadPhoto(file: File) {
    const fd = new FormData();
    fd.append("photo", file);

    const res = await fetch(`${BASE}/photos`, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
}

export async function deletePhoto(id: string) {
    const res = await fetch(`${BASE}/photos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
}