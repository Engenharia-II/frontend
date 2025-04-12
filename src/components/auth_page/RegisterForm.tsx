import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineLock } from 'react-icons/md';

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="font-bold text-2xl">Crie sua conta</h1>
        <p className="text-slate-500">
          Registre-se para começar sua jornada de aprendizado
        </p>
      </div>
      <div className="w-96">
        <div>
          <div>
            <label className="font-semibold">Email</label>
            <div className="flex items-center border border-slate-200 rounded-lg p-2 w-full mb-4 focus-within:border-slate-400">
              <AiOutlineMail className="text-slate-500 mr-2" />
              <input
                type="text"
                placeholder="seu@email.com"
                className="flex-1 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold">Senha</label>
            <div className="flex items-center border border-slate-200 rounded-lg p-2 w-full mb-4 focus-within:border-slate-400">
              <MdOutlineLock className="text-slate-500 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold">Repetir Senha</label>
            <div className="flex items-center border border-slate-200 rounded-lg p-2 w-full mb-4 focus-within:border-slate-400">
              <MdOutlineLock className="text-slate-500 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 focus:outline-none"
              />
            </div>
          </div>
          <button className="hover:cursor-pointer hover:bg-green-700 bg-green-600 text-white font-semibold py-2 px-4 my-2 mb-5 rounded-md w-full">
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}
