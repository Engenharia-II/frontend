'use client';

import { IoBookmarksOutline, IoBookOutline } from 'react-icons/io5';
import { VscMortarBoard } from 'react-icons/vsc';
import StatCard from './StatCard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
  const [subjectsStudies, setSubjectsStudies] = useState<
    SubjectStudiesInterface[] | null
  >(null);
  const [topicsStudies, setTopicsStudies] = useState<
    TopicsStudiesInterface[] | null
  >(null);
  const [savedContent, setSavedContent] = useState<
    SavedContentInterface[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubjectsStudies = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subject-studies`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Não foi possível obter os progressos do usuário');
      }
      const data = (await response.json()) as SubjectStudiesInterface[];
      setSubjectsStudies(
        data.filter((subject) => subject.status === 'in_progress')
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao obter dados do usuário';
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopicsStudies = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topic-studies`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Não foi possível obter os progressos do usuário');
      }
      const data = (await response.json()) as TopicsStudiesInterface[];
      setTopicsStudies(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao obter dados do usuário';
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedContents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/saved-content/by-user-id`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Não foi possível obter os progressos do usuário');
      }
      const data = (await response.json()) as SavedContentInterface[];
      setSavedContent(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao obter dados do usuário';
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjectsStudies();
    fetchTopicsStudies();
    fetchSavedContents();
  }, []);

  if (isLoading || !subjectsStudies || !topicsStudies || !savedContent) {
    return <span>Carregando...</span>;
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      <StatCard
        icon={<IoBookOutline />}
        label="Disciplinas em andamento"
        value={subjectsStudies.length}
        color="text-blue-500"
        bgColor="bg-blue-200"
      />

      <StatCard
        icon={<VscMortarBoard />}
        label="Tópicos concluídos"
        value={topicsStudies.length}
        color="text-green-500"
        bgColor="bg-green-200"
      />

      <StatCard
        icon={<IoBookmarksOutline />}
        label="Recursos salvos"
        value={savedContent.length}
        color="text-purple-500"
        bgColor="bg-purple-200"
      />
    </div>
  );
}
