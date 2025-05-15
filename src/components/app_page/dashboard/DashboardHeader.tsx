'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaBars,
  FaBookmark,
  FaGraduationCap,
  FaHome,
  FaSearchPlus,
  FaUserCircle
} from 'react-icons/fa';
import { SkeletonBox } from '../../ui/skeleton-box';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';

export default function DashboardHeader() {
  const { user, loading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatLastAccess = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

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
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <FaUserCircle size={32} className="text-gray-600" />
                  </button>
                  <div className="hidden md:block ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Último acesso {formatLastAccess(user?.lastAccess || '')}
                    </div>
                  </div>
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
        </div>

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
              href="/app/explore"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaSearchPlus className="mr-2" /> Explorar
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
