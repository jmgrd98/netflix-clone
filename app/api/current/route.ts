import { NextResponse } from 'next/server';
import { serverAuth } from '@/lib/serverAuth';

export async function GET() {
    try {
        const { currentUser } = await serverAuth();
        console.log(currentUser);
        return NextResponse.json(currentUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
