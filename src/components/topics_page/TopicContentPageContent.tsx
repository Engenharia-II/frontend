'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { SkeletonBox } from '../ui/skeleton-box';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaBookmark as FaBookmarkSolid,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { FaBookmark as FaBookmarkRegular } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { formatDuration } from '@/lib/utils';
import ContentTypeIcon from './ContentTypeIcon';
import { Content, SavedContent } from '@/@types/TopicPageTypes/ContentType';
import Image from 'next/image';

type Topic = {
  id: string;
  name: string;
  description: string;
  position: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
};

export function TopicContentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicId = searchParams.get('topicId');

  const [topic, setTopic] = useState<Topic | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [savedContents, setSavedContents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingContentId, setSavingContentId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    if (!topicId) {
      setError('ID do tópico não fornecido');
      setIsLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch topic details
        const topicResponse = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}`,
          { method: 'GET' }
        );

        if (!topicResponse.ok) {
          throw new Error('Não foi possível carregar os detalhes do tópico');
        }

        const topicData = await topicResponse.json();
        setTopic(topicData);

        // Fetch contents for this topic
        const contentsResponse = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}/contents`,
          { method: 'GET' }
        );

        if (!contentsResponse.ok) {
          throw new Error('Não foi possível carregar os conteúdos');
        }

        const contentsData = await contentsResponse.json();

        // Fetch saved contents
        const savedResponse = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/saved-content/by-user-id`,
          { method: 'GET' }
        );

        let userSavedContents: SavedContent[] = [];

        if (savedResponse.ok) {
          userSavedContents = await savedResponse.json();
        }

        // Extract content IDs that are saved
        const savedContentIds = userSavedContents.map(
          (saved) => saved.contentId
        );
        setSavedContents(savedContentIds);

        // Mark contents as saved
        const enrichedContents = contentsData.map((content: Content) => ({
          ...content,
          isSaved: savedContentIds.includes(content.id)
        }));

        setContents(enrichedContents);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro desconhecido';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [topicId]);

  const handleToggleSave = async (contentId: string, isSaved: boolean) => {
    setSavingContentId(contentId);

    try {
      let response;

      if (isSaved) {
        // Remove from saved
        response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/saved-content/remove`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contentId })
          }
        );
      } else {
        // Add to saved
        response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/saved-content/save`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contentId })
          }
        );
      }

      if (!response.ok) {
        throw new Error(
          isSaved ? 'Erro ao remover dos salvos' : 'Erro ao salvar conteúdo'
        );
      }

      // Update local state
      if (isSaved) {
        setSavedContents(savedContents.filter((id) => id !== contentId));
      } else {
        setSavedContents([...savedContents, contentId]);
      }

      setContents(
        contents.map((content) =>
          content.id === contentId ? { ...content, isSaved: !isSaved } : content
        )
      );

      toast.success(
        isSaved ? 'Conteúdo removido dos salvos' : 'Conteúdo salvo com sucesso'
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(errorMessage);
    } finally {
      setSavingContentId(null);
    }
  };

  const filteredContents =
    activeFilter === 'all'
      ? contents
      : activeFilter === 'saved'
        ? contents.filter((content) => content.isSaved)
        : contents.filter((content) => content.type === activeFilter);

  const getFilterCount = (filter: string) => {
    if (filter === 'all') return contents.length;
    if (filter === 'saved') return contents.filter((c) => c.isSaved).length;
    return contents.filter((c) => c.type === filter).length;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <SkeletonBox width="w-8" height="h-8" className="rounded" />
          <SkeletonBox width="w-40" height="h-6" />
        </div>

        <div className="mb-8">
          <SkeletonBox width="w-64" height="h-10" className="mb-2" />
          <SkeletonBox width="w-full" height="h-4" className="mb-6" />
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <SkeletonBox
              key={i}
              width="w-24"
              height="h-8"
              className="rounded-full"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden"
            >
              <SkeletonBox width="w-full" height="h-40" />
              <div className="p-4">
                <SkeletonBox width="w-3/4" height="h-6" className="mb-2" />
                <SkeletonBox width="w-full" height="h-4" className="mb-1" />
                <SkeletonBox width="w-full" height="h-4" className="mb-3" />
                <div className="flex justify-between items-center mt-4">
                  <SkeletonBox width="w-20" height="h-4" />
                  <SkeletonBox
                    width="w-8"
                    height="h-8"
                    className="rounded-full"
                  />
                </div>
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
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8 text-center border border-black dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            Tópico não encontrado
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
        href={`/app/subjects/topics?subjectId=${topic.subjectId}`}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
      >
        <FaArrowLeft className="text-sm" />
        <span>Voltar para tópicos</span>
      </Link>

      {/* Topic Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {topic.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {topic.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
            {contents.length} {contents.length === 1 ? 'conteúdo' : 'conteúdos'}{' '}
            disponíveis
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
            {savedContents.length}{' '}
            {savedContents.length === 1 ? 'conteúdo salvo' : 'conteúdos salvos'}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Todos ({getFilterCount('all')})
        </button>
        <button
          onClick={() => setActiveFilter('saved')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'saved'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Salvos ({getFilterCount('saved')})
        </button>
        <button
          onClick={() => setActiveFilter('video')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'video'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Videos ({getFilterCount('video')})
        </button>
        <button
          onClick={() => setActiveFilter('article')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'article'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Artigos ({getFilterCount('article')})
        </button>
        <button
          onClick={() => setActiveFilter('book')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'book'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Livros ({getFilterCount('book')})
        </button>
        <button
          onClick={() => setActiveFilter('course')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'course'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Cursos ({getFilterCount('course')})
        </button>
        <button
          onClick={() => setActiveFilter('podcast')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'podcast'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Podcasts ({getFilterCount('podcast')})
        </button>
      </div>

      {/* Content Grid */}
      {filteredContents.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8 text-center border border-black dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            {activeFilter === 'all'
              ? 'Nenhum conteúdo disponível para este tópico.'
              : activeFilter === 'saved'
                ? 'Você ainda não salvou nenhum conteúdo deste tópico.'
                : `Nenhum conteúdo do tipo "${activeFilter}" disponível para este tópico.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => (
            <div
              key={content.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden h-full flex flex-col border border-black dark:border-gray-700"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                {content.tumbnailUrl ? (
                  <Image
                    width={360}
                    height={200}
                    src={content.tumbnailUrl}
                    alt={content.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <ContentTypeIcon type={content.type} size="large" />
                  </div>
                )}
                <div className="absolute top-0 right-0 m-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${content.isFree ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300'}`}
                  >
                    {content.isFree ? 'Grátis' : 'Premium'}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 m-3">
                  <div className="flex items-center gap-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
                    <ContentTypeIcon type={content.type} size="small" />
                    <span>
                      {content.type.charAt(0).toUpperCase() +
                        content.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-2">
                  {content.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {content.description}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <IoMdTime className="mr-1" />
                    <span>{formatDuration(content.duration)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleToggleSave(content.id, content.isSaved || false)
                      }
                      disabled={savingContentId === content.id}
                      className={`p-2 rounded-full transition-colors ${
                        content.isSaved
                          ? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900'
                          : 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      aria-label={
                        content.isSaved
                          ? 'Remover dos salvos'
                          : 'Salvar conteúdo'
                      }
                    >
                      {savingContentId === content.id ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
                      ) : content.isSaved ? (
                        <FaBookmarkSolid className="text-xl" />
                      ) : (
                        <FaBookmarkRegular className="text-xl" />
                      )}
                    </button>

                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                      aria-label="Abrir conteúdo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
