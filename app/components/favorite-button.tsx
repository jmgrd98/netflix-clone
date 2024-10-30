import axios from 'axios';
import { useCallback, useMemo } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import { mutate } from 'swr';

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    try {
      let response;
      console.log(isFavorite)
      if (isFavorite) {
        response = await axios.delete('/api/favorite', { data: { movieId } });
      } else {
        response = await axios.post('/api/favorite', { movieId });
      }
  
      const updatedFavoriteIds = response?.data?.favoriteIds;
  
      // Update `currentUser` and refetch `isFavorite`
      await mutateCurrentUser({ ...currentUser, favorites: updatedFavoriteIds });
      mutateFavorites();
  
    } catch (error) {
      console.error("Failed to update favorites", error);
    }
  }, [movieId, isFavorite, currentUser, mutateCurrentUser, mutateFavorites]);  

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
    >
      <Icon className='text-white' size={25} />
    </div>
  );
};

export default FavoriteButton;
