'use client';

import Link from 'next/link';
import { TiArrowRight } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import SubjectItem from './SubjectItem';
import { SkeletonBox } from '../ui/skeleton-box';

export interface SubjectInterface {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function SubjectsList() {
  const [subjects, setSubjects] = useState<SubjectInterface[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects`,
        {
          method: 'GET'
        }
      );
      if (!response.ok) {
        throw new Error('Não foi possível buscar os subjects');
      }
      const data = await response.json();
      const sortedData = data.sort(
        (a: SubjectInterface, b: SubjectInterface) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const limitedData = sortedData.slice(0, 5);
      setSubjects(limitedData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const SubjectSkeletons = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-white border border-slate-300 rounded-lg p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SkeletonBox width="w-8" height="h-8" className="rounded-full" />
              <div className="space-y-2">
                <SkeletonBox width="w-40" height="h-5" />
                <SkeletonBox width="w-60" height="h-4" />
              </div>
            </div>
            <SkeletonBox width="w-6" height="h-6" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="mx-8 mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Disciplinas Recentes</h1>
          <p className="text-gray-600">
            Últimas disciplinas adicionadas à plataforma
          </p>
        </div>
        <Link
          href={'/app/subjects'}
          className="flex items-center justify-center bg-white hover:bg-slate-100 border rounded-lg border-slate-300 shadow-slate-200 px-4 py-2 font-semibold group"
        >
          Ver tudo
          <TiArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="mt-8 space-y-4">
        {isLoading ? (
          <SubjectSkeletons />
        ) : error ? (
          <div className="text-center py-6 bg-white border border-slate-300 rounded-lg">
            <p className="text-gray-500 mb-2">{error}</p>
            <button
              onClick={() => fetchSubjects()}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Tentar novamente
            </button>
          </div>
        ) : subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectItem {...subject} key={subject.id} />
          ))
        ) : (
          <div className="text-center py-6 bg-white border border-slate-300 rounded-lg">
            <p className="text-gray-500">Nenhuma disciplina encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
