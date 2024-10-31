'use client'

import useCurrentUser from '@/hooks/useCurrentUser';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProfilesPage = () => {
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
    <div className='flex items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching</h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
           <div onClick={() => router.push('/')}>
              <div className='group flex-row w-44 mx-auto'>
                 <div
                    className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'
                 >
                    <Image src="/images/default-blue.png" alt="Profile" />
                 </div>
                 <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                    {user?.name}
                 </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilesPage
