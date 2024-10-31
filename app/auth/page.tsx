'use client';

import { useCallback, useState } from "react";
import Input from "../components/input";
import axios from 'axios';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Image from "next/image";

const AuthPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant(currentVariant => currentVariant === 'login' ? 'register' : 'login')
    }, []);

    const login = useCallback(async () => {
      try {
        const loggedIn = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/'
        });
        
        if (loggedIn?.error) {
          console.error(loggedIn.error);
        } else {
          router.push('/profiles');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }, [email, password, router]);

    const register = useCallback(async () => {
      try {
        await axios.post('/api/register', {
          email,
          name,
          password
        });
        await login();
      } catch (error) {
        console.error('Registration error:', error);
      }
    }, [email, name, password, login]);

    return (
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <Image width={100} height={100} src="/images/logo.png" className="h-12" alt="Logo" />
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === 'login' ? 'Sign In' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
                )}
                <Input
                  label="Email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition" >
                {variant === 'login' ? 'Login' : 'Sign-up'}
              </button>

              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div 
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={32} />
                </div>
                <div
                  onClick={() => signIn('github', { callbackUrl: '/' })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub size={32} />
                </div>
              </div>

              <p className="text-neutral-500 mt-12">
                {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                <span onClick={toggleVariant} className="text-white ml-1 font-semibold cursor-pointer hover:underline">
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AuthPage;
