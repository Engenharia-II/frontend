'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import ProfileForm from '@/components/app_page/profile/ProfileForm';
import { SkeletonBox } from '@/components/ui/skeleton-box';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center mb-8 w-full">
        <Link
          href="/app"
          className="flex items-center text-gray-600 hover:text-blue-600 mr-4 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Voltar para o dashboard
        </Link>
      </div>
      <h1 className="text-2xl text-center flex-1 md:text-3xl font-bold text-gray-800">
        Editar Perfil
      </h1>

      <div className="max-w-2xl mt-8 mx-auto">
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div className="flex flex-col items-center mb-6">
              <SkeletonBox
                width="w-24"
                height="h-24"
                className="rounded-full mb-4"
              />
              <SkeletonBox
                width="w-40"
                height="h-6"
                className="rounded-md mb-2"
              />
              <SkeletonBox width="w-60" height="h-4" className="rounded-md" />
            </div>
            <SkeletonBox width="w-full" height="h-14" className="rounded-md" />
            <SkeletonBox width="w-full" height="h-14" className="rounded-md" />
            <SkeletonBox width="w-full" height="h-14" className="rounded-md" />
            <SkeletonBox width="w-full" height="h-14" className="rounded-md" />
            <SkeletonBox width="w-full" height="h-12" className="rounded-md" />
          </div>
        ) : user ? (
          <ProfileForm />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erro ao carregar dados
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    Não foi possível carregar os dados do usuário. Por favor,
                    tente novamente mais tarde.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
