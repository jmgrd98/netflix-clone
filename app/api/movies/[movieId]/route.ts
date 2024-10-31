import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
    params: {
        movieId: string;
    };
}

export async function GET(req: NextRequest, { params }: Context) {
    try {
        const { movieId } = params;

        if (!movieId || typeof movieId !== 'string') {
            throw new Error('Invalid ID');
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movie) {
            throw new Error('Movie not found');
        }

        return NextResponse.json(movie);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
    }
}
