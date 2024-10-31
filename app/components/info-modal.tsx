import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './play-button';
import FavoriteButton from './favorite-button';
import useInfoModal from '@/hooks/useInfoModal';
import { useCallback, useEffect, useState } from 'react';
import useMovie from '@/hooks/useMovie';

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
}

const InfoModal = ({ visible, onClose }: InfoModalProps) => {
    const [isVisible, setIsVisible] = useState(!!visible);

    const { movieId } = useInfoModal();

    const { data = {} } = useMovie(movieId); 

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
      setIsVisible(false);

      setTimeout(() => {
        onClose();
      }, 300);

    }, [onClose]);

    if (!visible) return null;

  return (
    <div className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0'>
      <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 reltive flex-auto bg-zinc-900 drop-shadow-md`}>
          <div className='relative h-96'>
            <video src={data?.videoUrl} poster={data?.thumbnailUrl} autoPlay muted loop className='w-full brightness-[60%] object-cover h-full'></video>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
