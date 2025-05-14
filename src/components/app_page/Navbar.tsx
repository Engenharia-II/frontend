'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';
import UserImage from '@/../public/assets/images/user_image.png';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { SkeletonBox } from '../ui/skeleton-box';

export default function Navbar() {
  const router = useRouter();
  const { user, loading } = useUser();

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
    <div className="flex flex-col md:flex-row items-center justify-between mx-18 py-3">
      <Link href={'/app'}>
        <h1 className="text-xl font-bold">CaminhoDev</h1>
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        {loading ? (
          <SkeletonBox width="w-32" height="h-8" />
        ) : (
          user && (
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
                    <span className="text-sm font-semibold">{user.name}</span>
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
          )
        )}
      </div>
    </div>
  );
}
