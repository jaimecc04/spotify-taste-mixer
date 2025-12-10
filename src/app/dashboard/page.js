'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

//Widgets
import GenreWidget from "@/components/widgets/GenreWidget";
import PopularityWidget from "@/components/widgets/PopularityWidget";
import DecadeWidget from "@/components/widgets/DecadeWidget";
import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";
import PlaylistDisplay from "@/components/PlaylistDisplay";

import { generatePlaylist } from "@/lib/spotify";

export default function DashboardPage() {
    const router = useRouter();

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [popularityRange, setPopularityRange] = useState([50, 80]);
    const [selectedDecades, setSelectedDecades] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    const [activeSection, setActiveSection] = useState("genres"); //genres, popularity, decades

    const [playlist, setPlaylist] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [playlistError, setPlaylistError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/");
        }
    }, [router]);

     const buildPreferences = () => ({
        artists: selectedArtists,
        tracks: selectedTracks,
        genres: selectedGenres,
        decades: selectedDecades,
        popularity: popularityRange,
    });

    const handleGeneratePlaylist = async (mode = 'replace') => {
        try {
            setIsGenerating(true);
            setPlaylistError(null);

            const preferences = buildPreferences();
            if (preferences.genres.length === 0) {
                preferences.genres = ["pop"];
                return;
            }
            const tracks = await generatePlaylist(preferences);


            if (mode === 'replace') {
                setPlaylist(tracks)
            } else{
                setPlaylist((prev) => {
                    const map = new Map();
                    [...prev, ...tracks].forEach((t) => {
                        map.set(t.id, t);
                    });
                    return Array.from(map.values());
                });
            }
        } catch (error) {
            console.error("Error generating playlist:", error);
            setPlaylistError(error.message || "Hubo un error al generar la playlist.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRemoveTrack = (trackId) => {
        setPlaylist((prev) => prev.filter((t) => t.id !== trackId));
    };

    const handleRefresh = () => handleGeneratePlaylist('replace');
    const handleAddMore = () => handleGeneratePlaylist('append');

    const renderActiveWidget = () => {
        switch (activeSection) {
            case "genres":
                return (
                    <GenreWidget
                        selectedGenres={selectedGenres}
                        onChange={setSelectedGenres}
                    />
                );
            case "popularity":
                return (
                    <PopularityWidget
                        popularityRange={popularityRange}
                        onChange={setPopularityRange}
                    />
                );
            case "decades":
                return (
                    <DecadeWidget
                        selectedDecades={selectedDecades}
                        onChange={setSelectedDecades}
                    />
                );
            case "artists":
                return (
                    <ArtistWidget
                        selectedArtists={selectedArtists}
                        onChange={setSelectedArtists}
                    />
                );
            case "tracks":
                return (
                    <TrackWidget
                        selectedTracks={selectedTracks}
                        onChange={setSelectedTracks}
                    />
                );
            default:
                return null;
        }
    };


    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Panel de Control (Dashboard)</h1>

            <div className="grid gap-4 md:grid-cols-3">
                
                {/* Menú de selección + widget activo*/}
                <div className="md:col-span-2 flex gap-4">

                    {/*Menú lateral*/}
                    <aside className="w-40 bg-neutral-900 border border-neutral-800 rounded-xl p-3 h-fit">
                        <h2 className="font-semibold mb-3 text-sm">Seleccionar Filtros</h2>
                        <div className="flex flex-col gap-2 text-sm">

                            <button
                                type="button"
                                onClick={() => setActiveSection('genres')}
                                className={`text-left px-3 py-2 rounded ${
                                    activeSection === 'genres'
                                    ? 'bg-green-500 text-black'
                                    : 'bg-neutral-800 hover:bg-neutral-700'
                                }`}
                            >
                                Géneros
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveSection('decades')}
                                className={`text-left px-3 py-2 rounded ${
                                    activeSection === 'decades'
                                    ? 'bg-green-500 text-black'
                                    : 'bg-neutral-800 hover:bg-neutral-700'
                                }`}
                            >
                                Décadas
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveSection('popularity')}
                                className={`text-left px-3 py-2 rounded ${
                                    activeSection === 'popularity'
                                    ? 'bg-green-500 text-black'
                                    : 'bg-neutral-800 hover:bg-neutral-700'
                                }`}
                            >
                                Popularidad
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveSection('artists')}
                                className={`text-left px-3 py-2 rounded ${
                                    activeSection === 'artists'
                                    ? 'bg-green-500 text-black'
                                    : 'bg-neutral-800 hover:bg-neutral-700'
                                }`}
                            >
                                Artistas
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => setActiveSection('tracks')}
                                className={`text-left px-3 py-2 rounded ${
                                    activeSection === 'tracks'
                                    ? 'bg-green-500 text-black'
                                    : 'bg-neutral-800 hover:bg-neutral-700'
                                }`}
                            >
                                Canciones
                            </button>

                            <button
                                type="button"
                                onClick={() => handleGeneratePlaylist('replace')}
                                className="mt-4 w-full text-center text-xs px-3 py-2 rounded bg-emerald-500 text-black font-semibold disabled_opacity-50"
                                disabled={isGenerating}
                            >
                                Generar Playlist
                            </button>

                        </div>
                    </aside>
                    
                    {/*Widget activo*/}
                    <section className="flex-1">
                        {renderActiveWidget()}
                    </section>
                </div>

                {/*Columna derecha - Playlist*/}
                <PlaylistDisplay
                    playlist={playlist}
                    onRemoveTrack={handleRemoveTrack}
                    onRefresh={handleRefresh}
                    onAddMore={handleAddMore}
                    isLoading={isGenerating}
                    error={playlistError}
                />
            </div>
        </div>
    );
}