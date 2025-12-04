'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
      /*<>
        🎵 Spotify Taste Mixer
      </> */
    <main
      className="min-h-screen flex items-center justify-center bg-black text-white"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          🎵 Spotify Taste Mixer
        </h1>

        <button
          onClick={handleLogin}
          className="px-4 py-2 rounded bg-green-500 text-black font-semibold"
        >
          Iniciar sesión con Spotify
        </button>
      </div>
    </main>   
  );
}


