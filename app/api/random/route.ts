import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prismadb from '../../../lib/prismadb';
import { serverAuth } from '../../../lib/serverAuth';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        await serverAuth(req, res);

        const movieCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovie = await prismadb.movie.findMany({
            skip: randomIndex,
            take: 1,
        });

        return NextResponse.json(randomMovie[0], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}