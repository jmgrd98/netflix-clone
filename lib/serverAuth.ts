import { NextApiRequest } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import prismadb from "./prismadb";

export const serverAuth = async (req: NextApiRequest) => {
    const session = await getServerSession(req);
    console.log("Session:", session);

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
