import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});
type LoginData = z.infer<typeof loginSchema>;

export async function handleLogin({ email, password }: LoginData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sessions/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    }
  );
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Erro ao fazer login');
  }

  return result;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();

  async function onSubmit({ email, password }: LoginData) {
    setIsAuthenticating(true);
    try {
      await handleLogin({ email, password });
      router.push('/app');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao fazer login';
      toast.error(errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="font-bold text-2xl text-center">Bem vindo de volta</h1>
        <p className="text-slate-500 text-center">
          Entre com sua conta para continuar seus estudos
        </p>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-semibold">Email</label>
            <div className="flex items-center border border-slate-200 rounded-lg p-2 w-full mb-1 focus-within:border-slate-400">
              <AiOutlineMail className="text-slate-500 mr-2" />
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 focus:outline-none"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs mb-2 block">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="font-semibold">Senha</label>
            <div className="flex items-center border border-slate-200 rounded-lg p-2 w-full mb-1 focus-within:border-slate-400">
              <MdOutlineLock className="text-slate-500 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 focus:outline-none"
                {...register('password')}
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mb-2 block">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isAuthenticating}
            className={`hover:cursor-pointer hover:bg-blue-700 bg-blue-600 text-white font-semibold py-2 px-4 my-2 mb-5 rounded-md w-full transition-colors duration-200 ease-in-out ${
              isAuthenticating
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
