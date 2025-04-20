interface UserGreetingProps {
  name: string;
  lastAccess: string;
}

export default function UserGreeting({ name, lastAccess }: UserGreetingProps) {
  return (
    <div className="mt-4 ml-18">
      <h1 className="font-bold text-2xl text-slate-900">Olá, {name}!</h1>
      <p className="text-slate-600">Último acesso: {lastAccess}</p>
    </div>
  );
}
