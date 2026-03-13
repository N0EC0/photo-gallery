// Shared app types matching the backend API logic
export type Photo = {
    _id: string;
    filename: string;
    imageBase64: string;
    uploadDate: string;
    mimeType: string;
    imageUrl: string;
};