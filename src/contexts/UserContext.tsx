'use client';

import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface UserDataInterface {
  id: string;
  name: string;
  email: string;
  lastAccess: string | null;
  role?: {
    id: number;
    name: string;
  };
}

const PUBLIC_ROUTES = ['/', '/auth'];

const UserContext = createContext<{
  user: UserDataInterface | null;
  loading: boolean;
  setUser: (userData: UserDataInterface) => void;
}>({
  user: null,
  loading: true,
  setUser: () => {}
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<UserDataInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const shouldFetchUser = !PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/users/get-by-id`,
          { method: 'GET' }
        );
        if (!res.ok) throw new Error('Erro ao obter usuário');
        const data = await res.json();
        setUser(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Erro ao buscar usuário'
        );
      } finally {
        setLoading(false);
      }
    }

    if (shouldFetchUser) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [shouldFetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
