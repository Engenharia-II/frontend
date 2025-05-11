import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';

const registerSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirm_password: z.string()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não coincidem',
    path: ['confirm_password']
  });
type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  });
  const [isRegistering, setIsRegistering] = useState(false);

  async function onSubmit({ name, email, password }: RegisterData) {
    setIsRegistering(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sessions/sign-up`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ name, email, password })
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Erro ao registrar usuário');
      }
      toast.success('Usuário registrado com sucesso!');
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao registrar usuário';
      toast.error(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="font-bold text-2xl text-center">Crie sua conta</h1>
        <p className="text-slate-500 text-center">
          Registre-se para começar sua jornada de aprendizado
        </p>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-semibold">Nome</label>
            <div className="flex items-center border border-slate-200 rounded-lg p-2 w-full mb-1 focus-within:border-slate-400">
              <input
                type="text"
                placeholder="Seu nome"
                className="flex-1 focus:outline-none"
                {...register('name')}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs mb-2 block">
                {errors.name.message}
              </span>
            )}
          </div>
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
          <div>
            <label className="font-semibold">Repetir Senha</label>
            <div className="flex items-center border border-slate-200 rounded-lg p-2 w-full mb-1 focus-within:border-slate-400">
              <MdOutlineLock className="text-slate-500 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 focus:outline-none"
                {...register('confirm_password')}
              />
            </div>
            {errors.confirm_password && (
              <span className="text-red-500 text-xs mb-2 block">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isRegistering}
            className={`hover:cursor-pointer hover:bg-green-700 bg-green-600 text-white font-semibold py-2 px-4 my-2 mb-5 rounded-md w-full transition-colors duration-200 ease-in-out ${
              isRegistering
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-green-700'
            }`}
          >
            {isRegistering ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
