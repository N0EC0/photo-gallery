import { useRef, useState } from "react";
import { uploadPhoto } from "../services/api";

export default function UploadForm({ onUpload }: { onUpload: (photo: any) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (!file) {
            setError("Please choose a file!");
            return;
        }

        try {
            setError("");
            const newPhoto = await uploadPhoto(file);
            setFile(null);
            onUpload(newPhoto);
        } catch (err) {
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