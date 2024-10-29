import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import prismadb from "./prismadb";

export const serverAuth = async (req?: NextApiRequest, res?: NextApiResponse) => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("Not signed in");
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new Error("Not signed in");
    }

    return { currentUser };
};
