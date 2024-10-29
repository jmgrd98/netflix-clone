'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './components/navbar';

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
      <Navbar />
    </div>
  );
}
