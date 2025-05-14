'use client';

import Link from 'next/link';
import { TiArrowRight } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import SubjectItem from './SubjectItem';

export interface SubjectInterface {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function SubjectsList() {
  const [subjects, setSubjects] = useState<SubjectInterface[] | null>(null);

  const fetchSubjects = async () => {
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
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

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
          href={'/subjects'}
          className="flex items-center justify-center bg-white hover:bg-slate-100 border rounded-lg border-slate-300 shadow-slate-200 px-4 py-2 font-semibold group"
        >
          Ver tudo
          <TiArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="mt-8 space-y-4">
        {subjects?.map((subject) => (
          <SubjectItem {...subject} key={subject.id} />
        ))}
      </div>
    </div>
  );
}
