import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const movieId = searchParams.get('movieId');

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
