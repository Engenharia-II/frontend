import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';

interface RecommendationSectionProps {
  recommendations: Array<{
    id: string;
    name: string;
    description: string;
    type?: string;
  }>;
}

export default function RecommendationSection({
  recommendations
}: RecommendationSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          Recomendado para você
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">Nenhuma recomendação disponível</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((item) => (
              <Link
                key={item.id}
                href={`/app/subjects/topics?subjectId=${item.id}`}
                className="block p-3 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-md mr-3">
                    <FaGraduationCap />
                  </div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-2 flex justify-end">
                  <span className="inline-flex items-center text-xs text-blue-600">
                    Começar
                    <FaArrowRight size={10} className="ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
