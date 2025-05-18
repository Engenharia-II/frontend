import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { ProgressType } from '@/@types/AppTypes/ProgressType';

type ProgressSectionProps = {
  progress: ProgressType[];
};

export default function ProgressSection({ progress }: ProgressSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-8 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Seu progresso</CardTitle>
          <Link
            href="/app/subjects"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            Ver todas disciplinas
            <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {progress.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">
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
                    className="text-base font-medium text-gray-800 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                  <span className="text-sm font-medium text-gray-600">
                    {item.completedTopics}/{item.totalTopics} tópicos
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(item.progress * 100).toFixed(0)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
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
                className="block w-full text-center py-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 text-sm"
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
