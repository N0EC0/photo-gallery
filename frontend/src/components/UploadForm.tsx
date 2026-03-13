import { useRef, useState } from "react";
import { uploadPhoto } from "../services/api";

// Selects an image file and posts it to the backend
export default function UploadForm({ onUpload }: { onUpload: (photo: any) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Validates file, uploads, then notifies parent with the new photo
    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (!file) {
            setError("Please choose a file!");
            return;
        }

        try {
            setError("");
            const newPhoto = await uploadPhoto(file);

            // Reset local selection after successful upload
            setFile(null);

            onUpload(newPhoto);

        } catch (err) {

            // Display backend error message when available
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Upload failed");
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="upload-form">
                {/* Hidden ugly file input button, it's triggered from "Choose File" button. */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden-file-input"
                    onChange={(e) => {
                        setError("");
                        if (e.target.files) setFile(e.target.files[0]);
                    }}
                />

                <button
                    type="button"
                    className="upload-button"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Choose File
                </button>

                <button type="submit" className="upload-button">
                    Upload
                </button>

                {file && <p className="selected-file">{file.name}</p>}
                {error && <p>{error}</p>}
            </form>
        </>
    );
}