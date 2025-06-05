'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import { LogOut, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';

export default function Header() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) {
      const isDark = savedTheme === 'true';
      setDarkTheme(isDark);

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newThemeValue = !darkTheme;
    setDarkTheme(newThemeValue);
    localStorage.setItem('darkTheme', String(newThemeValue));

    if (newThemeValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/app" className="flex items-center">
              {/* Logo para tema claro */}
              <Image
                src="/assets/logos/caminho_dev_logo_black.png"
                alt="CaminhoDev Logo"
                width={40}
                height={40}
                className="mr-3 block dark:hidden"
              />
              {/* Logo para tema escuro */}
              <Image
                src="/assets/logos/caminho_dev_logo.png"
                alt="CaminhoDev Logo"
                width={40}
                height={40}
                className="mr-3 hidden dark:block"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CaminhoDev
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/app"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <FaHome className="mr-1" /> Início
            </Link>
            <Link
              href="/app/subjects"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <FaGraduationCap className="mr-1" /> Disciplinas
            </Link>
            <Link
              href="/app/saved-content"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
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
                              {user?.lastAppAccess ? (
                                <>
                                  Último acesso{' '}
                                  {formatLastAccess(user?.lastAppAccess || '')}
                                </>
                              ) : (
                                'Seja bem-vindo(a)!'
                              )}
                            </div>
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white">
                          <ul className="grid w-64 gap-1 p-2">
                            <li>
                              <Link
                                href={'/app/profile'}
                                className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200 dark:hover:bg-gray-800 dark:text-gray-300"
                              >
                                <FaUserEdit className="h-5 w-5" />
                                <span>Editar Perfil</span>
                              </Link>
                            </li>
                            <li>
                              <div
                                onClick={toggleTheme}
                                className="flex items-center justify-between gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200 cursor-pointer dark:hover:bg-gray-800 dark:text-gray-300"
                              >
                                <div className="flex items-center gap-2">
                                  {darkTheme ? (
                                    <Moon className="h-5 w-5" />
                                  ) : (
                                    <Sun className="h-5 w-5" />
                                  )}
                                  <span>Tema Escuro</span>
                                </div>
                                <Switch
                                  checked={darkTheme}
                                  onCheckedChange={toggleTheme}
                                  aria-label="Alternar tema"
                                />
                              </div>
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
          <div className="md:hidden border-t border-gray-200 px-2 py-3 space-y-1 dark:border-gray-700 dark:bg-gray-900">
            <Link
              href="/app"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaHome className="mr-2" /> Início
              </div>
            </Link>
            <Link
              href="/app/subjects"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaGraduationCap className="mr-2" /> Disciplinas
              </div>
            </Link>
            <Link
              href="/app/saved-content"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaBookmark className="mr-2" /> Conteúdos Salvos
              </div>
            </Link>
            <Link
              href="/app/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaUserEdit className="mr-2" /> Editar Perfil
              </div>
            </Link>
            <div
              onClick={toggleTheme}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {darkTheme ? (
                    <Moon className="mr-2 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Sun className="mr-2 text-gray-600" />
                  )}
                  <span>Tema Escuro</span>
                </div>
                <Switch
                  checked={darkTheme}
                  onCheckedChange={toggleTheme}
                  aria-label="Alternar tema"
                />
              </div>
            </div>
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
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
