import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { ProgressType } from '@/@types/AppTypes/ProgressType';

type ProgressSectionProps = {
  progress: ProgressType[];
};

export default function ProgressSection({ progress }: ProgressSectionProps) {
  return (
    <Card className="overflow-hidden p-6 bg-white dark:bg-gray-900 border border-black dark:border-gray-700 hover:shadow-md transition-shadow">
      <CardHeader className="pb-8 border-b border-black dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Seu progresso
          </CardTitle>
          <Link
            href="/app/subjects"
            className="text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 text-sm flex items-center transition-colors"
          >
            Ver todas disciplinas
            <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6 bg-white dark:bg-gray-900">
        {progress.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-300 mb-4">
              Você ainda não começou nenhuma disciplina
            </p>
            <Link
              href="/app/subjects"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Explorar disciplinas
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {progress.slice(0, 3).map((item) => (
              <div key={item.subjectId}>
                <div className="flex items-center justify-between mb-2">
                  <Link
                    href={`/app/subjects/topics?subjectId=${item.subjectId}`}
                    className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {item.completedTopics}/{item.totalTopics} tópicos
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-1">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(item.progress * 100).toFixed(0)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{(item.progress * 100).toFixed(0)}% concluído</span>
                  <span>
                    {item.totalTopics - item.completedTopics} restantes
                  </span>
                </div>
              </div>
            ))}

            {progress.length > 3 && (
              <Link
                href="/app/subjects"
                className="block w-full text-center py-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm"
              >
                + {progress.length - 3} outras disciplinas em progresso
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
