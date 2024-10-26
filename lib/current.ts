import { NextApiRequest, NextApiResponse } from "next";
import { serverAuth } from "./serverAuth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(req);
        return res.status(200).json(currentUser);
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}