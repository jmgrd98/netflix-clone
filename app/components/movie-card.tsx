import { BsFillPlayFill } from 'react-icons/bs';
import FavoriteButton from './favorite-button';
import { useRouter } from 'next/navigation';
import useInfoModal from '@/hooks/useInfoModal';
import { BiChevronDown } from 'react-icons/bi'; 
import Image from 'next/image';

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

interface MovieCardProps {
  data: Movie
}

const MovieCard = ({ data }: MovieCardProps) => {
  const router = useRouter();
  const { openModal } = useInfoModal();
  return (
    <div className='group bg-zinc-900 col-span relative h-[12vw]'>
      <Image className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]" src={data.thumbnailUrl} alt='Movie thumbnail' />
      <div className='opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:opacity-100 group-hover:translate-x-[2vw]'>
        <Image className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]" src={data.thumbnailUrl} alt='Movie thumbnail' />
        <div className='z-10 bg-zinc-900 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
          <div className='flex flex-row items-center gap-3'>
            <div onClick={() => router.push(`/watch/${data?.id}`)} className='cursor-pointer ml-auto w-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
              <BsFillPlayFill className='text-black' size={30} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div onClick={() => openModal(data?.id)} className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
              <BiChevronDown size={30} className='text-white group-hover/item:text-neutral-300' />
            </div>
          </div>
          <p className='text-green-400 font-semibold mt-4'>
            New <span className='text-white'>2023</span>
          </p>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{data.duration}</p>
          </div>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
