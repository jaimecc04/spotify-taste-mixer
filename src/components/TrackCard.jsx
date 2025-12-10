'use client'

export default function TrackCard({ track, isFavorite, onToggleFavorite, onRemove }) {
    const mainArtist = track.artists?.[0]?.name ?? "Desconocido";
    const image = track.album?.images?.[1] || track.album?.images?.[0];

    const handleClickRemove = () => {
        console.log("Removing track:", track.id);
        onRemove(track.id);
    };

    return (
        <div className="flex gap-3 items-center bg-neutral-900 border border-neutral-800 rounded-x1 p-3">
            {image && (
                <img
                    src={image.url}
                    alt={track.name}
                    className="w-12 h-12 rounded object-cover"
                />
            )}

            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{track.name}</div>
                <div className="text-xs text-neutral-500 truncate">{mainArtist}</div>
            </div>

            <button
                type="button"
                onClick={onToggleFavorite}
                className={`text-sm mr-2 ${
                    isFavorite ? 'text-yellow-400' : 'text-neutral-500'
                }`}
            >
                Fav
            </button>

            <button
                type="button"
                onClick={handleClickRemove}
                className="text-xs text-red-400 hover:text-red-300"
            >
                Eliminar
            </button>
        </div>
    );
}
