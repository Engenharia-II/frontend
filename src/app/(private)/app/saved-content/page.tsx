'use client';

import { ContentType } from '@/@types/TopicPageTypes/ContentType';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { toast } from 'sonner';
import DashboardHeader from '@/components/app_page/dashboard/DashboardHeader';
import Footer from '@/components/app_page/Footer';
import { SkeletonBox } from '@/components/ui/skeleton-box';
import {
  FaBookmark,
  FaGraduationCap,
  FaSearch,
  FaTag,
  FaTrashAlt
} from 'react-icons/fa';
import Image from 'next/image';
import ContentTypeIcon from '@/components/topics_page/ContentTypeIcon';
import Link from 'next/link';

interface SavedContent {
  id: string;
  contentId: string;
  userId: string;
  savedAt: string;
  content?: {
    id: string;
    name: string;
    description: string;
    topicId: string;
    type: ContentType;
    url: string;
    tumbnailUrl?: string;
    topic?: {
      id: string;
      name: string;
      subjectId: string;
      subject?: {
        id: string;
        name: string;
      };
    };
  };
}

export default function SavedContentPage() {
  const [savedContents, setSavedContents] = useState<SavedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const fetchSavedContents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const savedContentResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/saved-content/by-user-id`,
        { method: 'GET' }
      );

      if (!savedContentResponse.ok) {
        throw new Error('Não foi possível carregar os conteúdos salvos');
      }

      const savedData = await savedContentResponse.json();

      // Fetch content details for each saved content
      if (savedData && savedData.length > 0) {
        const contentPromises = savedData.map(
          async (item: {
            id: string;
            name: string;
            description: string;
            topicId: string;
            type: ContentType;
            url: string;
            tumbnailUrl?: string;
            contentId: string;
          }) => {
            const contentResponse = await fetchWithAuth(
              `${process.env.NEXT_PUBLIC_API_URL}/contents/${item.contentId}`,
              { method: 'GET' }
            );

            if (contentResponse.ok) {
              const contentData = await contentResponse.json();

              // Get topic info if available
              if (contentData.topicId) {
                const topicResponse = await fetchWithAuth(
                  `${process.env.NEXT_PUBLIC_API_URL}/topics/${contentData.topicId}`,
                  { method: 'GET' }
                );

                if (topicResponse.ok) {
                  const topicData = await topicResponse.json();
                  contentData.topic = topicData;

                  // Get subject info if available
                  if (topicData.subjectId) {
                    const subjectResponse = await fetchWithAuth(
                      `${process.env.NEXT_PUBLIC_API_URL}/subjects/${topicData.subjectId}`,
                      { method: 'GET' }
                    );

                    if (subjectResponse.ok) {
                      const subjectData = await subjectResponse.json();
                      contentData.topic.subject = subjectData;
                    }
                  }
                }
              }

              return {
                ...item,
                content: contentData
              };
            }
            return item;
          }
        );

        const enrichedSavedContent = await Promise.all(contentPromises);
        setSavedContents(enrichedSavedContent);
      } else {
        setSavedContents([]);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao carregar os conteúdos salvos';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSavedContent = async (id: string) => {
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/saved-content/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Não foi possível remover o conteúdo dos favoritos');
      }

      toast.success('Conteúdo removido dos favoritos');
      setSavedContents(savedContents.filter((item) => item.id !== id));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao remover o conteúdo';
      toast.error(errorMessage);
    }
  };

  // Filter saved contents based on search term and selected type
  const filteredContents = savedContents.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.content?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === 'all' || item.content?.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Get unique content types for filtering
  const contentTypes = Array.from(
    new Set(savedContents.map((item) => item.content?.type).filter(Boolean))
  );

  useEffect(() => {
    fetchSavedContents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Conteúdos Salvos</h1>
          <span className="text-sm text-gray-500">
            {filteredContents.length}{' '}
            {filteredContents.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar conteúdos salvos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <div className="relative">
                <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">Todos os tipos</option>
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-0 border border-gray-200 overflow-hidden"
              >
                <div className="relative w-full h-32">
                  <SkeletonBox width="w-full" height="h-full" />
                </div>
                <div className="p-4">
                  <SkeletonBox width="w-2/3" height="h-6" className="mb-2" />
                  <SkeletonBox width="w-full" height="h-4" className="mb-4" />
                  <div className="flex justify-between items-center">
                    <SkeletonBox width="w-20" height="h-6" />
                    <SkeletonBox width="w-20" height="h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchSavedContents}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : savedContents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
              <FaBookmark className="text-blue-500" size={32} />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Nenhum conteúdo salvo
            </h2>
            <p className="text-gray-600 mb-6">
              Você ainda não salvou nenhum conteúdo. Explore disciplinas e
              tópicos para encontrar conteúdos interessantes para salvar.
            </p>
            <Link
              href="/app/subjects"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Explorar disciplinas
            </Link>
          </div>
        ) : filteredContents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-gray-600 mb-4">
              Não encontramos conteúdos salvos que correspondam aos seus
              critérios de pesquisa.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((item, index) => (
              <div
                key={item.content?.id || index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-40 bg-gray-100">
                  {item.content?.tumbnailUrl ? (
                    <Image
                      src={item.content.tumbnailUrl}
                      alt={item.content.name}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ContentTypeIcon
                        type={item.content?.type || 'video'}
                        size="large"
                      />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleRemoveSavedContent(item.id)}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      title="Remover dos favoritos"
                    >
                      <FaTrashAlt className="text-red-500" size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-lg text-gray-900 mb-1 line-clamp-2">
                    {item.content?.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.content?.description}
                  </p>

                  <div className="flex flex-col gap-2">
                    {item.content?.topic?.subject && (
                      <Link
                        href={`/app/subjects/topics?subjectId=${item.content.topic.subject.id}`}
                        className="text-xs text-blue-700 hover:underline flex items-center"
                      >
                        <FaGraduationCap className="mr-1" />
                        {item.content.topic.subject.name}
                      </Link>
                    )}

                    {item.content?.topic && (
                      <Link
                        href={`/app/topics/contents?topicId=${item.content.topic.id}`}
                        className="text-xs text-green-700 hover:underline flex items-center"
                      >
                        <FaBookmark className="mr-1" />
                        {item.content.topic.name}
                      </Link>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {item.content?.type}
                    </span>

                    <a
                      href={item.content?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Acessar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
