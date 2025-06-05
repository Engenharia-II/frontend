import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import ContentTypeIcon from '../../topics_page/ContentTypeIcon';
import { SavedContentType } from '@/@types/AppTypes/SavedContentType';

type SavedContentSectionProps = {
  savedContents: SavedContentType[];
};

export default function SavedContentSection({
  savedContents
}: SavedContentSectionProps) {
  return (
    <Card className="mt-6 bg-white dark:bg-gray-900 border border-black dark:border-gray-700 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-white dark:bg-gray-900 border-b border-black dark:border-gray-700">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Conteúdos salvos
        </CardTitle>
        <Link
          href="/app/saved-content"
          className="text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 text-sm flex items-center transition-colors"
        >
          Ver todos
          <FaArrowRight className="ml-1 text-xs" />
        </Link>
      </CardHeader>
      <CardContent>
        {savedContents.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum conteúdo salvo encontrado
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedContents
              .filter((item) => item.content)
              .map((savedContent, index) => (
                <div
                  key={index}
                  className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
                >
                  <div className="w-24 h-20 bg-gray-100 dark:bg-gray-800 relative flex-shrink-0">
                    {savedContent.content?.tumbnailUrl ? (
                      <Image
                        src={savedContent.content.tumbnailUrl}
                        alt={savedContent.content.name}
                        fill
                        sizes="100%"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ContentTypeIcon
                          type={savedContent.content?.type || 'video'}
                          size="small"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-3 flex flex-col">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-1">
                      {savedContent.content?.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                      {savedContent.content?.description}
                    </p>

                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        {savedContent.content?.type}
                      </span>

                      <a
                        href={savedContent.content?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 text-sm flex items-center transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
