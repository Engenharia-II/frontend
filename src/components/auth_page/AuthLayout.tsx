'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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
    <div className="flex flex-col items-center justify-center bg-white border-none rounded-lg">
      <div className="flex items-center justify-center bg-slate-100 p-2 border-none rounded-t-lg w-full">
        <button
          className={`px-16 py-2 rounded-lg cursor-pointer ${isLogin ? 'bg-white font-bold text-black' : 'bg-slate-100 text-gray-700'}`}
          onClick={handleLoginToggle}
        >
          Login
        </button>
        <button
          className={`px-16 py-2 rounded-lg cursor-pointer ${isRegister ? 'bg-white font-bold text-black' : 'bg-slate-100 text-gray-700'}`}
          onClick={handleRegisterToggle}
        >
          Register
        </button>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
