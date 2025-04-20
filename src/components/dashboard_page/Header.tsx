'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@radix-ui/react-navigation-menu';
import { Search, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSubmit() {
    setIsSearchOpen(!isSearchOpen);
  }

  return (
    <header className="relative p-4 border-b-1 border-slate-200">
      <div className="flex items-center justify-between mx-16">
        <Link href={'/dashboard'}>
          <h1 className="text-xl font-bold">CaminhoDev</h1>
        </Link>
        <div className="flex items-center justify-center gap-3">
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
                  <User className="h-5 w-5" />
                  <span>Username</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md border border-slate-200 z-50">
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
                      <Link
                        href={'/configs'}
                        className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-all duration-200"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Configurações</span>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="mt-4 ml-16">
        <h1 className="font-bold text-2xl text-slate-900">Olá, João Silva!</h1>
        <p className="text-slate-600">Último acesso: Hoje, 14:30</p>
      </div>
    </header>
  );
}
