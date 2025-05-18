'use client';

import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { usePathname } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { toast } from 'sonner';

export interface UserDataInterface {
  id: string;
  name: string;
  email: string;
  lastAppAccess: string | null;
  role?: {
    id: number;
    name: string;
  };
}

const PUBLIC_ROUTES = ['/', '/auth'];

// Intervalo em milissegundos para atualizar o lastAppAccess (5 minutos)
const UPDATE_LAST_ACCESS_INTERVAL = 1000 * 60 * 5;
// Tempo em milissegundos de inatividade para considerar o usuário inativo (2 minutos)
const INACTIVITY_THRESHOLD = 1000 * 60 * 2;

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
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  const shouldFetchUser = !PUBLIC_ROUTES.includes(pathname);

  // Função para atualizar o último acesso do usuário com useCallback
  const updateLastAppAccess = useCallback(async () => {
    if (!user) return;

    try {
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/users/last-app-access`,
        { method: 'PUT' }
      );
    } catch {
      // Silenciosamente falha para não interromper a experiência do usuário
    }
  }, [user]);

  // Função para verificar se o usuário está ativo com useCallback
  const isUserActive = useCallback(() => {
    return Date.now() - lastActivity < INACTIVITY_THRESHOLD;
  }, [lastActivity]);

  // Monitora eventos de usuário para atualizar o lastActivity
  useEffect(() => {
    if (!shouldFetchUser || !user) return;

    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];

    const handleUserActivity = () => {
      setLastActivity(Date.now());
    };

    // Registra os event listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      // Remove os event listeners quando o componente é desmontado
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [shouldFetchUser, user]);

  // Configura o intervalo para atualizar o lastAppAccess
  useEffect(() => {
    if (!shouldFetchUser || !user) return;

    // Executa uma vez quando o usuário faz login
    updateLastAppAccess();

    // Configura um intervalo para verificar atividade e atualizar lastAppAccess
    const intervalId = setInterval(() => {
      if (isUserActive()) {
        updateLastAppAccess();
      }
    }, UPDATE_LAST_ACCESS_INTERVAL);

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, [shouldFetchUser, user, isUserActive, updateLastAppAccess]);

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
