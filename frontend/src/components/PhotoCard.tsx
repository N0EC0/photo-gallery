import { Photo } from "../types";

type Props = {
    photo: Photo;
    onDelete: (id: string) => void;
    index: number;
};

// Shows a single photo + metadata + delete action
export default function PhotoCard({ photo, onDelete, index }: Props) {
    return (
        <article className={`photo-block ${(index % 6) + 1}`}>

            {/* Backend returns a data URL, so we can render the image directly */}
            <img src={photo.imageUrl} alt={photo.filename} className="photo-image" />

            <div className="photo-meta">
                <p className="photo-name">{photo.filename}</p>

                {/* uploadDate is returned as a string; convert to Date for display. */}
                <p className="photo-date">
                    {new Date(photo.uploadDate).toLocaleDateString()}
                </p>
                <button className="delete-button" onClick={() => onDelete(photo._id)}>Delete</button>
            </div>
        </article>
    );
}