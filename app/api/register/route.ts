import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
    try {
        const { email, name, password } = await req.json();

        const existingUser = await prismadb.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email taken' }), {
                status: 422,
                headers: { 'Content-Type': 'application/json' },
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

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
