import { Photo } from "../types";

type Props = {
    photo: Photo;
    onDelete: (id: string) => void;
    index: number;
};

export default function PhotoCard({ photo, onDelete, index }: Props) {
    return (
        <article className={`photo-block ${(index % 6) + 1}`}>
            <img src={photo.imageUrl} alt={photo.filename} className="photo-image" />

            <div className="photo-meta">
                <p className="photo-name">{photo.filename}</p>
                <p className="photo-date">
                    {new Date(photo.uploadDate).toLocaleDateString()}
                </p>
                <button className="delete-button" onClick={() => onDelete(photo._id)}>Delete</button>
            </div>
        </article>
    );
}