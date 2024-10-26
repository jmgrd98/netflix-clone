import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import prismadb from '@/lib/prismadb';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, name, password } = JSON.parse(req.body);

        const existingUser = await prismadb.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email taken' }), {
                status: 422,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            },
        });

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('An error occurred', { status: 400 });
    }
}
