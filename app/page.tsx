'use client';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './components/navbar';
import Billboard from './components/billboard';
import MovieList from './components/movie-list';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (!session) {
        router.push('/auth');
      }
    }

    checkSession();
  }, [router]);

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favorites} />
      </div>
    </div>
  );
}
