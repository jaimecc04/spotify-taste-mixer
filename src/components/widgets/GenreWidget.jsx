'use client'

import { useState, useMemo } from "react"

const ALL_GENRES = [ 
    'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues',
    'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy',
    'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 
    'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth',
    'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house',
    'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin',
    'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release',
    'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop',
    'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock',
    'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep',
    'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance',
    'trip-hop', 'turkish', 'work-out', 'world-music' 
];

export default function GenreWidget({ selectedGenres, onChange }) {
    const [search, setSearch] = useState("");

    const filteredGenres = useMemo(() => {
        return ALL_GENRES.filter(genre => genre.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            onChange(selectedGenres.filter(g => g !== genre));
        } else {
            onChange([...selectedGenres, genre].slice(0, 5));
        }
    };

    return (
        <div className="bbg-neutral-900 border border-neutral-800 rounded-x1 p-4 h-full flex flex-col">
            <h2 className="font-semibold mb-2">Géneros</h2>

        <input
            type="text"
            placeholder="Buscar géneros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 w-full rounded bg-neutral-800 px-2 py-1 text-sm outline-none"
        />

        <div className="flex-1 overflow-y-auto space-y-1">
            {filteredGenres.map((genre) => {
                const active = selectedGenres.includes(genre);
                return (
                    <button
                        key={genre}
                        type="button"
                        onClick={() => toggleGenre(genre)}
                        className={`w-full text-left text-xs px-2 py-1 rounded ${
                            active 
                            ? 'bg-green-600 text-black'
                            : 'bg-neutral-800 hover:bg-neutral-700'
                        }`}
                    >
                        {genre}
                    </button>
                );
            })}
        </div>
    </div>
    );
}

