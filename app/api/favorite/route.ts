import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';
import { serverAuth } from '@/lib/serverAuth';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(req, res);

        const { movieId } = req.body;

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!existingMovie) {
            throw new Error('Invalid ID');
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: updatedFavoriteIds
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(req, res);

        console.log(req.body)
        const { movieId } = await req.body.json();

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!existingMovie) {
            throw new Error('Invalid ID');
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: updatedFavoriteIds
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}


