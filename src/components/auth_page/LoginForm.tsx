import { FcGoogle } from 'react-icons/fc';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineLock } from 'react-icons/md';

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="font-bold text-2xl text-center">Bem vindo de volta</h1>
        <p className="text-slate-500 text-center">
          Entre com sua conta para continuar seus estudos
        </p>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center border border-slate-200 rounded-lg gap-3 hover:bg-slate-50 hover:cursor-pointer py-2 px-4">
          <FcGoogle />
          <p className="font-semibold">Entrar com o google</p>
        </div>
        <div className="flex items-center gap-2 w-full my-4">
          <div className="flex-1 h-px bg-slate-300" />
          <div className="text-slate-500 text-sm">ou</div>
          <div className="flex-1 h-px bg-slate-300" />
        </div>
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
          <button className="hover:cursor-pointer hover:bg-blue-700 bg-blue-600 text-white font-semibold py-2 px-4 my-2 mb-5 rounded-md w-full">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
