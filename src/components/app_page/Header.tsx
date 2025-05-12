'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import UserGreeting from './UserGreeting';
import { toast } from 'sonner';

export interface UserDataInterface {
  id: string;
  name: string;
  email: string;
  lastAccess: string;
}

export default function Header() {
  const [userData, setUserData] = useState<UserDataInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // add interface for the user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/get-by-id`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados do usuário');
      }
      const data = (await response.json()) as UserDataInterface;
      setUserData(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao obter dados do usuário';
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading || !userData) {
    return <span>Carregando...</span>;
  }

  return (
    <header className="w-full relative p-4 border-b-1 border-slate-200 bg-white">
      <Navbar />
      <UserGreeting name={userData.name} lastAccess={userData.lastAccess} />
    </header>
  );
}
