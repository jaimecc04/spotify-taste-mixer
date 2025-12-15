'use client'

import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";

export default function FavoriteDisplay() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(
            localStorage.getItem("favorite_tracks") || "[]"
        );
        setFavorites(stored);
    }, []);

    const handleToggleFavorite = (track) => {
        const stored = JSON.parse(
            localStorage.getItem("favorite_tracks") || "[]"
        );
        const exists = stored.find((t) => t.id === track.id);

        let updated;
        if (exists) {
            updated = stored.filter((t) => t.id !== track.id);
        } else {
            updated = [...stored, track];
        }

        localStorage.setItem("favorite_tracks", JSON.stringify(updated));
        setFavorites(updated);
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">Favoritos</h2>
            </div>

            {favorites.length === 0 ? (
                <p className="text-xs text-neutral-500">
                    No hay canciones favoritas seleccionadas.
                </p>
            ) : (
                <div className="flex-1 overflow-y-auto mt-2 space-y-2">
                    {favorites.map((track) => (
                        <TrackCard
                            key={track.id}
                            track={track}
                            isFavorite={true}
                            onToggleFavorite={() => handleToggleFavorite(track)}
                            onRemove={() => handleToggleFavorite(track)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}