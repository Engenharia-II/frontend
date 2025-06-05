'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { SkeletonBox } from '../ui/skeleton-box';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaBook,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaFile,
  FaPlay
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { formatDuration } from '@/lib/utils';

type Topic = {
  id: string;
  name: string;
  description: string;
  position: number;
  contentCount: number;
  duration: number;
  completed: boolean;
};

type Subject = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  topics: Topic[];
  totalTopics: number;
  completedTopics: number;
  subjectProgress: number;
  subjectDuration: number;
};

export function SubjectTopicsContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subjectId');

  const [subject, setSubject] = useState<Subject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  const fetchSubjectDetails = useCallback(async () => {
    if (!subjectId) {
      setError('ID da disciplina não fornecido');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects/${subjectId}/details`,
        { method: 'GET' }
      );

      if (!response.ok) {
        throw new Error('Não foi possível carregar os detalhes da disciplina');
      }

      const data = await response.json();
      setSubject(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [subjectId]);

  const toggleTopicCompletion = async (
    topicId: string,
    currentStatus: boolean
  ) => {
    if (!subjectId) return;

    setIsUpdatingStatus(topicId);

    try {
      let response;

      if (currentStatus) {
        response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/topic-studies`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topicId })
          }
        );
      } else {
        response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/topic-studies`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topicId })
          }
        );
      }

      if (!response.ok) {
        throw new Error('Não foi possível atualizar o status do tópico');
      }

      // Atualiza o estado local
      setSubject((prev) => {
        if (!prev) return null;

        const updatedTopics = prev.topics.map((topic) => {
          if (topic.id === topicId) {
            return { ...topic, completed: !currentStatus };
          }
          return topic;
        });

        const completedCount = updatedTopics.filter(
          (topic) => topic.completed
        ).length;

        return {
          ...prev,
          topics: updatedTopics,
          completedTopics: completedCount,
          subjectProgress: completedCount / prev.totalTopics
        };
      });

      toast.success(
        currentStatus
          ? 'Tópico marcado como não concluído'
          : 'Tópico marcado como concluído'
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(errorMessage);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  useEffect(() => {
    fetchSubjectDetails();
  }, [subjectId, fetchSubjectDetails]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <SkeletonBox width="w-8" height="h-8" className="rounded" />
          <SkeletonBox width="w-40" height="h-6" />
        </div>

        <div className="mb-6">
          <SkeletonBox width="w-64" height="h-10" className="mb-2" />
          <SkeletonBox width="w-full" height="h-4" className="mb-1" />
          <SkeletonBox width="w-3/4" height="h-4" className="mb-6" />

          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <SkeletonBox width="w-6" height="h-6" className="rounded-full" />
              <SkeletonBox width="w-20" height="h-4" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBox width="w-6" height="h-6" className="rounded-full" />
              <SkeletonBox width="w-20" height="h-4" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm mt-8">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <SkeletonBox width="w-40" height="h-6" />
          </div>

          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <SkeletonBox
                    width="w-10"
                    height="h-10"
                    className="rounded-full"
                  />
                  <div>
                    <SkeletonBox width="w-40" height="h-6" className="mb-2" />
                    <SkeletonBox width="w-64" height="h-4" />
                  </div>
                </div>
                <SkeletonBox width="w-24" height="h-10" className="rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8 text-center border border-black dark:border-gray-700">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchSubjectDetails}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8 text-center border border-black dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            Disciplina não encontrada
          </p>
          <Link
            href="/app/subjects"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Voltar para a lista de disciplinas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Backlink */}
      <Link
        href="/app/subjects"
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
      >
        <FaArrowLeft className="text-sm" />
        <span>Voltar para disciplinas</span>
      </Link>

      {/* Subject Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {subject.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {subject.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <IoMdTime className="text-lg text-gray-600 dark:text-gray-300" />
            <span>{formatDuration(subject.subjectDuration)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <FaFile className="text-gray-600 dark:text-gray-300" />
            <span>{subject.totalTopics} tópicos</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <FaCheckCircle className="text-green-600" />
            <span>
              {subject.completedTopics}
              {subject.completedTopics === 1
                ? ' tópico concluído'
                : ' tópicos concluídos'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progresso</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {Math.round(subject.subjectProgress * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${Math.round(subject.subjectProgress * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-black dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <h2 className="font-medium text-gray-800 dark:text-gray-100">
            Conteúdo da Disciplina
          </h2>
        </div>

        {subject.topics.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum tópico disponível para esta disciplina.
            </p>
          </div>
        ) : (
          <div>
            {subject.topics.map((topic, index) => (
              <div
                key={topic.id}
                className={`border-b border-gray-200 dark:border-gray-800 p-6 ${index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/60' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${topic.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}
                    >
                      {topic.position}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {topic.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {topic.description}
                      </p>
                      <div className="flex items-center gap-6 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          <span>{formatDuration(topic.duration)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaBook />
                          <span>
                            {topic.contentCount}{' '}
                            {topic.contentCount === 1
                              ? 'conteúdo'
                              : 'conteúdos'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-14 sm:ml-0">
                    <button
                      onClick={() =>
                        toggleTopicCompletion(topic.id, topic.completed)
                      }
                      disabled={isUpdatingStatus === topic.id}
                      className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2
                        ${
                          topic.completed
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                    >
                      {isUpdatingStatus === topic.id ? (
                        <div className="w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin"></div>
                      ) : (
                        <FaCheck
                          className={
                            topic.completed ? 'text-green-600' : 'text-gray-400'
                          }
                        />
                      )}
                      {topic.completed ? 'Concluído' : 'Marcar como concluído'}
                    </button>

                    <Link
                      href={`/app/topics/contents?topicId=${topic.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FaPlay className="text-xs" />
                      <span>Ver conteúdos</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
