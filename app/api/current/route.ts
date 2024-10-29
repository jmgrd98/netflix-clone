import { NextResponse } from 'next/server';
import { serverAuth } from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(req, res);
        console.log(currentUser);
        return NextResponse.json(currentUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
