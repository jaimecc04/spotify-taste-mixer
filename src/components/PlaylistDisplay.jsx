'use client'

import { useEffect, useState } from "react"
import TrackCard from "./TrackCard"

export default function PlaylistDisplay({ playlist, onRemoveTrack, onRefresh, onAddMore, isLoading, error, onClearPlaylist }) {
    const [favoriteTrackIds, setFavoriteTrackIds] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(
            localStorage.getItem('favorite_tracks') || '[]'
        );
        const ids = Array.isArray(stored) ? stored.map((t) => t.id) : [];
        setFavoriteTrackIds(ids);
    }, []);

    const handletoggleFavorite = (track) => {
        const stored = JSON.parse(
            localStorage.getItem('favorite_tracks') || '[]'
        );
        const list = Array.isArray(stored) ? stored : [];

        const exists = list.some((t) => t.id === track.id);

        const updated = exists
            ? list.filter((t) => t.id !== track.id)
            : [...list, track];

        localStorage.setItem('favorite_tracks', JSON.stringify(updated));
        setFavoriteTrackIds(updated.map((t) => t.id));
    };

    const handleRemoveFromPlaylist = (track) => {
        console.log("Request to remove track from playlist:", track.id);
        if (onRemoveTrack) {
            onRemoveTrack(track.id);
        }
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-x1 p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Playlist</h2>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onClearPlaylist}
                        disabled={isLoading || playlist.length === 0}
                        className="text-xs px-2 py-1 rounded bg-neutral-800 disable:opacity-50"
                    >
                        Borrar
                    </button>
                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={isLoading || playlist.length === 0}
                        className="text-xs px-2 py-1 rounded bg-neutral-800 disable:opacity-50"
                    >
                        Refrescar
                    </button>
                    <button
                        type="button"
                        onClick={onAddMore}
                        disabled={isLoading || playlist.length === 0}
                        className="text-xs px-2 py-1 rounded bg-neutral-800 disable:opacity-50"
                    >
                        Añadir más
                    </button>

                </div>
            </div>

            {isLoading && (
                <p className="text-xs text-neutral-400 mb-2">
                    Generando playlist...
                </p>
            )}

            {error && (
                <p className="text-xs text-red-400 mb-2">
                    Error: {error}
                </p>
            )}

            {playlist.length === 0 && !isLoading && !error && (
                <p className="text-xs text-neutral-400">
                    No hay canciones en la playlist. Genera una con tus widgets.
                </p>
            )}

            <div className="flex-1 overflow-y-auto space-y-2">
                {playlist.map((track) => (
                    <TrackCard
                        key={track.id}
                        track={track}
                        isFavorite={favoriteTrackIds.includes(track.id)}
                        onToggleFavorite={() => handletoggleFavorite(track)}
                        onRemove={() => handleRemoveFromPlaylist(track)}
                    />
                ))}
            </div>
        </div>
    );
}
