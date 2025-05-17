'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaBars,
  FaBookmark,
  FaGraduationCap,
  FaHome,
  FaUserCircle,
  FaUserEdit
} from 'react-icons/fa';
import { SkeletonBox } from '../ui/skeleton-box';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatLastAccess = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/app" className="flex items-center">
              <Image
                src="/assets/logos/caminho_dev_logo.png"
                alt="CaminhoDev Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold text-gray-900">
                CaminhoDev
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/app"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
            >
              <FaHome className="mr-1" /> Início
            </Link>
            <Link
              href="/app/subjects"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
            >
              <FaGraduationCap className="mr-1" /> Disciplinas
            </Link>
            <Link
              href="/app/saved-content"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
            >
              <FaBookmark className="mr-1" /> Conteúdos Salvos
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center">
            {/* User info/profile */}
            <div className="ml-3 relative">
              {loading ? (
                <div className="flex items-center">
                  <SkeletonBox
                    width="w-8"
                    height="h-8"
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <button
                    className="flex md:hidden text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <FaUserCircle size={32} className="text-gray-600" />
                  </button>

                  <NavigationMenu className="hidden md:block">
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="flex items-center gap-2 p-2 rounded-md transition-all duration-200 hover:cursor-pointer">
                          <FaUserCircle size={32} className="text-gray-600" />
                          <div className="hidden md:block ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {user?.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              Último acesso{' '}
                              {formatLastAccess(user?.lastAccess || '')}
                            </div>
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white">
                          <ul className="grid w-48 gap-1 p-2">
                            <li>
                              <Link
                                href={'/app/profile'}
                                className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200"
                              >
                                <FaUserEdit className="h-5 w-5" />
                                <span>Editar Perfil</span>
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={handleLogout}
                                type="button"
                                className="flex w-full items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200 cursor-pointer"
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
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden ml-3 p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FaBars />
            </button>
          </div>
        </div>{' '}
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 px-2 py-3 space-y-1">
            <Link
              href="/app"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaHome className="mr-2" /> Início
              </div>
            </Link>
            <Link
              href="/app/subjects"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaGraduationCap className="mr-2" /> Disciplinas
              </div>
            </Link>
            <Link
              href="/app/saved-content"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaBookmark className="mr-2" /> Conteúdos Salvos
              </div>
            </Link>
            <Link
              href="/app/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaUserEdit className="mr-2" /> Editar Perfil
              </div>
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="text-red-500">Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
