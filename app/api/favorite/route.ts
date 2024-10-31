import { without } from 'lodash';
import prismadb from '@/lib/prismadb';
import { serverAuth } from '@/lib/serverAuth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { currentUser } = await serverAuth();
        
        const { movieId } = await req.json();

        if (!movieId) {
            return NextResponse.json({ error: "movieId is required" }, { status: 400 });
        }

        const existingMovie = await prismadb.movie.findUnique({
            where: { id: movieId },
        });

        if (!existingMovie) {
            return NextResponse.json({ error: "Invalid movie ID" }, { status: 404 });
        }

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || '',
            },
            data: {
                favoriteIds: {
                    push: movieId,
                },
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { currentUser } = await serverAuth();
        
        const { movieId } = await req.json();
        
        if (!movieId) {
            return NextResponse.json({ error: "movieId is required" }, { status: 400 });
        }

        const existingMovie = await prismadb.movie.findUnique({
            where: { id: movieId },
        });

        if (!existingMovie) {
            return NextResponse.json({ error: "Invalid movie ID" }, { status: 404 });
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || '',
            },
            data: {
                favoriteIds: updatedFavoriteIds,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
