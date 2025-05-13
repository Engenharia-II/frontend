'use client';

import Link from 'next/link';
import { TiArrowRight } from 'react-icons/ti';
import TopicItem from './TopicItem';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface TopicInterface {
  id: string;
  name: string;
  description: string;
  position: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}

export default function TopicList() {
  const [topics, setTopics] = useState<TopicInterface[] | null>(null);

  const fetchTopics = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topics`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Não foi possível buscar os tópicos');
      }
      const data = await response.json();
      const sortedData = data.sort(
        (a: TopicInterface, b: TopicInterface) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const limitedData = sortedData.slice(0, 5);
      setTopics(limitedData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="mx-8 mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Tópicos Recentes</h1>
          <p className="text-gray-600">
            Últimos conteúdos adicionados à plataforma
          </p>
        </div>
        <Link
          href={'/topics'}
          className="flex items-center justify-center bg-white hover:bg-slate-100 border rounded-lg border-slate-300 shadow-slate-200 px-4 py-2 font-semibold group"
        >
          Ver tudo
          <TiArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="mt-8 space-y-4">
        {topics?.map((topic) => <TopicItem {...topic} key={topic.id} />)}
      </div>
    </div>
  );
}
