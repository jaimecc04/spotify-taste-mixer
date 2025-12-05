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

export default function DashboardPage() {
    const router = useRouter();

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [popularityRange, setPopularityRange] = useState([50, 80]);
    const [selectedDecades, setSelectedDecades] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    const [activeSection, setActiveSection] = useState("genres"); //genres, popularity, decades

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/");
        }
    }, [router]);

    const renderActiveSection = () => {
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

                        </div>
                    </aside>
                    
                    {/*Widget activo*/}
                    <section className="flex-1">
                        {renderActiveSection()}
                    </section>
                </div>

                {/*Columna derecha - Playlist*/}
                <div className="w-64 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <h2 className="font-semibold mb-2">Playlist</h2>
                    <p className="text-neutral-500 text-sm mb-2">
                        Aquí se mostrará la playlist generada según los filtros seleccionados.
                    </p>

                    <pre className="text-[10px] bg-black/40 rounded p-2 overflow-x-auto">
                        {JSON.stringify(
                            { 
                                selectedGenres,
                                popularityRange,
                                selectedDecades,
                                artists: selectedArtists.map(a => a.name),
                                tracks: selectedTracks.map(t => t.name)
                            }, 
                            null,
                            2
                        )}
                    </pre>
                </div>

            </div>
        </div>
    );
}