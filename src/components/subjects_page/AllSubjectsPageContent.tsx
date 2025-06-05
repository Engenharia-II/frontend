'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { SkeletonBox } from '../ui/skeleton-box';
import SubjectCard from './SubjectCard';
import { SubjectsStats } from './SubjectsStats';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineFilterList } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';

type Subject = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  startedAt?: string | null;
  finishedAt?: string | null;
};

type SubjectStudy = {
  userId: string;
  subjectId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt: string | null;
  updatedAt: string;
  finishedAt: string | null;
  subject: {
    id: string;
    name: string;
    description: string;
  };
};

export function AllSubjectsPageContent() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const urlParams = useSearchParams();
  const statusFilterParams = urlParams.get('status');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(
    statusFilterParams || 'all'
  );

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch all subjects
      const subjectsResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects`,
        { method: 'GET' }
      );

      if (!subjectsResponse.ok) {
        throw new Error('Não foi possível buscar as disciplinas');
      }

      const subjectsData = await subjectsResponse.json();

      // Fetch user's subject studies
      const studiesResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/subject-studies`,
        { method: 'GET' }
      );

      let studiesData: SubjectStudy[] = [];

      if (studiesResponse.ok) {
        studiesData = await studiesResponse.json();
      }

      // Merge the data
      const mergedSubjects = subjectsData.map((subject: Subject) => {
        const study = studiesData.find(
          (study) => study.subjectId === subject.id
        );
        if (study) {
          return {
            ...subject,
            status: study.status,
            startedAt: study.startedAt,
            finishedAt: study.finishedAt
          };
        }
        return { ...subject, status: 'not_started' };
      });

      setSubjects(mergedSubjects);
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
    fetchAllData();
  }, []);

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && subject.status === statusFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Minhas Disciplinas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore todas as disciplinas disponíveis na plataforma
        </p>
      </div>

      {/* Statistics */}
      {!isLoading && !error && subjects.length > 0 && (
        <SubjectsStats subjects={subjects} />
      )}

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar disciplinas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineFilterList className="text-xl text-gray-600 dark:text-gray-200" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-100"
          >
            <option value="all">Todos</option>
            <option value="not_started">Não iniciados</option>
            <option value="in_progress">Em andamento</option>
            <option value="completed">Concluídos</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 h-64">
              <SkeletonBox width="w-3/4" height="h-6" className="mb-4" />
              <SkeletonBox width="w-full" height="h-4" className="mb-2" />
              <SkeletonBox width="w-full" height="h-4" className="mb-2" />
              <SkeletonBox width="w-5/6" height="h-4" className="mb-8" />
              <div className="flex justify-between items-center mt-auto">
                <SkeletonBox width="w-24" height="h-8" className="rounded-md" />
                <SkeletonBox
                  width="w-12"
                  height="h-12"
                  className="rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center border border-black dark:border-gray-700">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchAllData}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && filteredSubjects.length === 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center border border-black dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Nenhuma disciplina encontrada
          </p>
          {statusFilter !== 'all' || searchQuery ? (
            <p className="text-gray-400 dark:text-gray-500">
              Tente mudar os filtros de busca
            </p>
          ) : null}
        </div>
      )}

      {/* Subject grid */}
      {!isLoading && !error && filteredSubjects.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
          {filteredSubjects.length > 0 && (
            <div className="mt-8 text-center text-gray-500">
              Mostrando {filteredSubjects.length}{' '}
              {filteredSubjects.length === 1 ? 'disciplina' : 'disciplinas'}
              {searchQuery && (
                <span>
                  {' '}
                  para a busca <strong>{`"${searchQuery}"`}</strong>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span>
                  {' '}
                  com status{' '}
                  <strong>
                    {statusFilter === 'completed'
                      ? 'Concluído'
                      : statusFilter === 'in_progress'
                        ? 'Em andamento'
                        : 'Não iniciado'}
                  </strong>
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
