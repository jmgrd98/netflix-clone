import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../../lib/prismadb';
import { serverAuth } from '../../../lib/serverAuth';
import { NextResponse } from 'next/server';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        await serverAuth(req, res);
        const movies = await prismadb.movie.findMany();
        return NextResponse.json(movies, { status: 200 });
    } catch (error) {
        console.error();
        return NextResponse.error();
    }
}