'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CaminhoDevLogo from '@/../public/assets/logos/caminho_dev_logo.png';
import Link from 'next/link';

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  function handleLoginToggle() {
    if (!isLogin) {
      setIsLogin(!isLogin);
      setIsRegister(!isRegister);
    }
  }

  function handleRegisterToggle() {
    if (!isRegister) {
      setIsRegister(!isRegister);
      setIsLogin(!isLogin);
    }
  }

  return (
    <>
      <Link href={'/'} className="flex justify-center mt-6">
        <Image
          src={CaminhoDevLogo}
          alt="Caminho Dev Logo"
          width={100}
          height={100}
        />
      </Link>
      <div className="flex flex-col items-center justify-center bg-white border-none rounded-lg w-full max-w-lg mx-auto">
        <div className="flex items-center justify-center bg-slate-100 p-2 border-none rounded-t-lg w-full">
          <button
            className={`px-8 py-2 rounded-lg cursor-pointer ${
              isLogin
                ? 'bg-white text-black font-semibold'
                : 'bg-slate-100 text-gray-500'
            }`}
            onClick={handleLoginToggle}
          >
            Entrar
          </button>
          <button
            className={`px-8 py-2 rounded-lg cursor-pointer ${
              isRegister
                ? 'bg-white text-black font-semibold'
                : 'bg-slate-100 text-gray-500'
            }`}
            onClick={handleRegisterToggle}
          >
            Cadastrar
          </button>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </>
  );
}
