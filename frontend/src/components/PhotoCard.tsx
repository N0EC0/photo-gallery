import { Photo } from "../types";

type Props = {
    photo: Photo;
    onDelete: (id: string) => void;
    index: number;
};

export default function PhotoCard({ photo, onDelete, index }: Props) {
    // return (
    //     <div className="photo-card">
    //         <img src={photo.imageUrl} alt={photo.filename} />
    //
    //         <div className="photo-info">
    //             <p>{photo.filename}</p>
    //             <p>{new Date(photo.uploadDate).toLocaleDateString()}</p>
    //             <button onClick={() => onDelete(photo._id)}>Delete</button>
    //         </div>
    //     </div>
    // );

    return (
        <article className={`photo-block block-${(index % 6) + 1}`}>
            <div className="date-number">{String(index + 1).padStart(2, "0")}</div>

            <img src={photo.imageUrl} alt={photo.filename} className="photo-image" />

            <div className="photo-meta">
                <p className="photo-name">{photo.filename}</p>
                <p className="photo-date">
                    {new Date(photo.uploadDate).toLocaleDateString()}
                </p>
                <button onClick={() => onDelete(photo._id)}>Delete</button>
            </div>
        </article>
    );


}