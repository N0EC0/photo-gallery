// import { useState } from "react";
// import { uploadPhoto } from "../services/api";
//
// export default function UploadForm({ onUpload }: { onUpload: () => void }) {
//     const [file, setFile] = useState<File | null>(null);
//
//     async function handleSubmit(e: React.FormEvent) {
//         e.preventDefault();
//         if (!file) return;
//
//         await uploadPhoto(file);
//         setFile(null);
//         onUpload();
//     }
//
//     return (
//         <form onSubmit={handleSubmit} className="upload-form">
//             <input
//                 type="file"
//                 accept="image/png,image/jpeg"
//                 onChange={(e) => {
//                     if (e.target.files) setFile(e.target.files[0]);
//                 }}
//             />
//
//             <button type="submit">Upload</button>
//         </form>
//     );
// }


import { useState } from "react";
import { uploadPhoto } from "../services/api";

export default function UploadForm({ onUpload }: { onUpload: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (!file) {
            setError("Please choose a file");
            return;
        }

        try {
            setError("");
            await uploadPhoto(file);
            setFile(null);
            onUpload();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Upload failed");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="upload-form">
            <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                    setError("");
                    if (e.target.files) setFile(e.target.files[0]);
                }}
            />
            <button type="submit">Upload</button>
            {error && <p>{error}</p>}
        </form>
    );
}