import { isEmpty } from 'lodash';

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList = ({ data, title }: MovieListProps) => {
  if (isEmpty(data)) return null;
  return (
    <div className='px-4 md:px-12 mt-4 space-y-8'>
        <div>
            <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>{title}</p>
            <div className='grid grid-cols-4 gap-2'>
                {data.map((movie) => (
                    <div key={movie.id} className='h-14'>
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MovieList
