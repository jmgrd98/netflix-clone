'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: user } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (!session) {
        router.push('/auth');
      }
    }

    checkSession();
  }, [router]);

  return (
    <div>
      <h1 className='text-4xl text-red-500'>NetflixClone</h1>
      <p className='text-white'>Logged in as {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout</button>
    </div>
  );
}
