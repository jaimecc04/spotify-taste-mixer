'use client'

import { useState } from "react";
import { getAccessToken } from "@/lib/auth";

export default function TrackWidget({ selectedTracks, onChange }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchTracks = async (q) => {
        setQuery(q);

        if(!q){
            setResults([]);
            return;
        }

        const token = getAccessToken();
        if (!token) return;

        try {
            setLoading(true);
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(q)}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setResults(data.tracks.items || []);
        } finally {
            setLoading(false);
        }
    };

    const toggleTrack = (track) => {
        const exists = selectedTracks.some(t => t.id === track.id);
        if (exists) {
            onChange(selectedTracks.filter(t => t.id !== track.id));
        } else {
            onChange([...selectedTracks, track].slice(0, 5));
        }
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-x1 p-4 h-full flex flex-col">
            <h2 className="font-semibold mb-2">Canciones</h2>

            <input
                type="text"
                placeholder="Buscar canciones..."
                value={query}
                onChange={(e) => searchTracks(e.target.value)}
                className="mb-3 w-full rounded bg-neutral-800 px-2 py-1 text-sm outline-none"
            />

            {loading && (<p className="text-xs text-neutral-500 mb-2">Cargando...</p>)}

            <div className="flex-1 overflow-y-auto space-y-1">
                {results.map((track) => {
                    const active = selectedTracks.some(t => t.id === track.id);
                    const mainArtist = track.artists[0]?.name || "Desconocido";

                    return (
                        <button
                            key={track.id}
                            type="button"
                            onClick={() => toggleTrack(track)}
                            className={`w-full text-left text-xs px-2 py-1 rounded flex items-center gap-2 ${
                                active 
                                ? 'bg-green-600 text-black'
                                : 'bg-neutral-800 hover:bg-neutral-700'
                            }`}
                        >
                            {track.album?.images[2] && (
                                <img
                                    src={track.album.images[2].url}
                                    alt={track.name}
                                    className="w-6 h-6 rounded object-cover"
                                />
                            )}
                            <span className="truncate">
                                {track.name} - {mainArtist}
                            </span>
                        </button>
                    );
                })}

                {!loading && results.length === 0 && query && (
                    <p className="text-xs text-neutral-500">No se encontraron canciones.</p>
                )}
            </div>

            {selectedTracks.length > 0 && (
                <div className="mt-3 border-t border-neutral-800 pt-2">
                    <p className="text-xs text-neutral-400 mb-1">Canciones seleccionadas:</p>
                    <ul className="text-xs text-neutral-300 space-y-0.5">
                        {selectedTracks.map(track => (
                            <li key={track.id}>
                                {track.name} - {track.artists[0]?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}    
                    