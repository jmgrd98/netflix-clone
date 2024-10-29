import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import {serverAuth} from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { currentUser } = await serverAuth(req, res);

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });

        return NextResponse.json(favoriteMovies, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}