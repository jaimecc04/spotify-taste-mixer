'use client'

import { useState} from "react";
import { getAccessToken } from "@/lib/auth";

export default function ArtistWidget({ selectedArtists, onChange }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchArtists = async (q) => {
        setQuery(q);

        if(!q){
            setResults([]);
            return;
        }

        const token = getAccessToken();
        if (!token) return;

        try {
            setLoading(true);
            const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(q)}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setResults(data.artists.items || []);
        } finally {
            setLoading(false);
        }
    };

    const toggleArtist = (artist) => {
        const exists = selectedArtists.find(a => a.id === artist.id);
        if (exists) {
            onChange(selectedArtists.filter(a => a.id !== artist.id));
        } else {
            onChange([...selectedArtists, artist].slice(0, 5));
        }
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-x1 p-4 h-full flex flex-col">
            <h2 className="font-semibold mb-2">Artistas</h2>

            <input
                type="text"
                placeholder="Buscar artistas..."
                value={query}
                onChange={(e) => searchArtists(e.target.value)}
                className="mb-3 w-full rounded bg-neutral-800 px-2 py-1 text-sm outline-none"
            />

            <div className="flex-1 overflow-y-auto space-y-1">
                {results.map((artist) => {
                    const active = selectedArtists.find(a => a.id === artist.id);
                    return (
                        <button
                            key={artist.id}
                            type="button"
                            onClick={() => toggleArtist(artist)}
                            className={`w-full text-left text-xs px-2 py-1 rounded flex items-center gap-2 ${
                                active 
                                ? 'bg-green-600 text-black'
                                : 'bg-neutral-800 hover:bg-neutral-700'
                            }`}
                        >
                            {artist.images[2] && (
                                <img
                                    src={artist.images[2].url}
                                    alt={artist.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            )}
                            <span>{artist.name}</span>
                        </button>
                    );
                })}

                {!loading && results.length === 0 && query && (
                    <p className="text-xs text-neutral-500">No se encontraron artistas.</p>
                )}
            </div>          
                
            {selectedArtists.length > 0 && (
                <div className="mt-3 border-t border-neutral-800 pt-2">
                    <p className="text-xs text-neutral-400 mb-1">Artistas seleccionados:</p>
                    <ul className="text-xs text-neutral-300 space-y-0.5">
                        {selectedArtists.map(artist => (
                            <li key={artist.id}>{artist.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
 