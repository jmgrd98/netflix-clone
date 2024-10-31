'use client'

import useMovie from '@/hooks/useMovie';
import { useRouter, useParams } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
    const router = useRouter();
    const params = useParams();
    const movieId = params.movieId;

    const { data } = useMovie(movieId as string);

    return (
        <div className='h-screen w-screen bg-black'>
            <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
                <AiOutlineArrowLeft onClick={() => router.push('/')} className='text-white cursor-pointer' size={40} />
                <p className='text-white text-xl md:text-3xl font-bold'>
                    <span className='font-light'>
                        Watching:
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video
                autoPlay
                controls
                className='h-full w-full'
                src={data?.videoUrl}
            />
        </div>
    )
}

export default Watch;