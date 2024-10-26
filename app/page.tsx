'use client'

import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      },
    };
  }

  return {
    props: {}
  }
}

export default function Home() {
  return (
    <div className="text-red-500">
      NetflixClone
      <button className='h-10 w-full bg-white' onClick={() => signOut()}></button>
    </div>
  );
}
