import { NextResponse } from 'next/server';
import { serverAuth } from '@/lib/serverAuth';

export async function GET(request: any, response: any) {
    try {
        const { currentUser } = await serverAuth(request);
        console.log(currentUser)
        return NextResponse.json(currentUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
