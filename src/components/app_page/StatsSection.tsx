'use client';

import { IoBookmarksOutline, IoBookOutline } from 'react-icons/io5';
import { VscMortarBoard } from 'react-icons/vsc';
import StatCard from './StatCard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

interface SubjectStudiesInterface {
  userId: string;
  status: string;
  subjectId: string;
  startedAt: string;
  updatedAt: string;
  finishedAt: string | null;
}

interface TopicsStudiesInterface {
  userId: string;
  topicId: string;
  status: string;
  startedAt: string;
  updatedAt: string;
  finishedAt: string | null;
}

interface SavedContentInterface {
  userId: string;
  contentId: string;
  savedAt: string;
}

export default function StatsSection() {
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [topicsCount, setTopicsCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllStats = async () => {
    try {
      const [subjectsRes, topicsRes, savedRes] = await Promise.all([
        fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/subject-studies`),
        fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/topic-studies`),
        fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/saved-content/by-user-id`
        )
      ]);

      if (!subjectsRes.ok || !topicsRes.ok || !savedRes.ok) {
        throw new Error('Erro ao carregar dados do usuário');
      }

      const [subjects, topics, saved] = await Promise.all([
        subjectsRes.json() as Promise<SubjectStudiesInterface[]>,
        topicsRes.json() as Promise<TopicsStudiesInterface[]>,
        savedRes.json() as Promise<SavedContentInterface[]>
      ]);

      const subjectsInProgress = subjects.filter(
        (s) => s.status === 'in_progress'
      );

      setSubjectsCount(subjectsInProgress.length);
      setTopicsCount(topics.length);
      setSavedCount(saved.length);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao carregar dados'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-24 bg-gray-100 rounded-lg" />
        <div className="h-24 bg-gray-100 rounded-lg" />
        <div className="h-24 bg-gray-100 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <StatCard
        icon={<IoBookOutline />}
        label="Disciplinas em andamento"
        value={subjectsCount}
        color="text-blue-600"
        bgColor="bg-blue-100"
      />

      <StatCard
        icon={<VscMortarBoard />}
        label="Tópicos concluídos"
        value={topicsCount}
        color="text-green-600"
        bgColor="bg-green-100"
      />

      <StatCard
        icon={<IoBookmarksOutline />}
        label="Recursos salvos"
        value={savedCount}
        color="text-purple-600"
        bgColor="bg-purple-100"
      />
    </div>
  );
}
