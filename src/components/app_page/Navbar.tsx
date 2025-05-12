'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Search, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import UserImage from '@/../public/assets/images/user_image.png';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { UserDataInterface } from './Header';

export default function Navbar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  function handleSubmit() {
    setIsSearchOpen(!isSearchOpen);
  }

  async function handleLogout() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sessions/logout`,
        {
          method: 'POST',
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Erro ao sair');
      }
      toast.success('Logout realizado com sucesso');
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao sair');
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mx-18">
      <Link href={'/app'}>
        <h1 className="text-xl font-bold">CaminhoDev</h1>
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        <div className="relative flex items-center justify-center">
          <div
            className={`absolute right-12 top-1/2 -translate-y-1/2 bg-white ${
              isSearchOpen ? 'w-64 opacity-100 px-3 py-1' : 'w-0 opacity-0'
            } border border-slate-200 overflow-hidden transition-all duration-300 ease-in-out shadow-md rounded-sm`}
          >
            <input
              type="text"
              placeholder="Buscar tópicos, cursos ou discussões..."
              className="w-full h-full outline-none text-sm text-slate-800"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="hover:bg-slate-100 transition-all duration-200 p-3 rounded-lg hover:cursor-pointer relative z-10"
          >
            <Search size={16} />
          </button>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200 hover:cursor-pointer">
                <Image
                  src={UserImage}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-semibold">{userData.name}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white">
                <ul className="grid w-48 gap-1 p-2">
                  <li>
                    <Link
                      href={'/profile'}
                      className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span>Perfil</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200 cursor-pointer"
                    >
                      <LogOut className="h-5 w-5 text-red-500" />
                      <span className="text-red-500">Sair</span>
                    </button>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
