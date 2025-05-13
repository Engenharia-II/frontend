interface UserGreetingProps {
  name: string;
  lastAccess: string;
}

export default function UserGreeting({ name, lastAccess }: UserGreetingProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-2 md:items-start md:mt-4 md:ml-18 ">
      <h1 className="font-bold text-2xl text-slate-900">Olá, {name}!</h1>
      <p className="text-slate-600">
        {lastAccess
          ? `Último acesso: ${new Date(lastAccess).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })}`
          : 'Seja bem-vindo(a) à plataforma!'}
      </p>
    </div>
  );
}
