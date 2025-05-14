'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { SkeletonBox } from '../ui/skeleton-box';

interface ProgressData {
  subjectId: string;
  name: string;
  totalTopics: number;
  completedTopics: number;
  progress: number;
}

export default function ProgressTracker() {
  const [progressData, setProgressData] = useState<ProgressData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgressData = async () => {
    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects/progress`,
        { method: 'GET' }
      );

      if (!res.ok) {
        throw new Error('Não foi possível obter os progressos do usuário');
      }

      const data: ProgressData[] = await res.json();
      setProgressData(data.slice(0, 3)); // mostra apenas os 3 primeiros
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao obter dados do usuário';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  return (
    <section className="w-full">
      <Card className="border-gray-200 lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Seu progresso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {isLoading ? (
              // Skeletons enquanto carrega
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <SkeletonBox className="w-1/3 h-4" />
                    <SkeletonBox className="w-12 h-4" />
                  </div>
                  <SkeletonBox className="w-full h-2 rounded-full" />
                </div>
              ))
            ) : progressData && progressData.length > 0 ? (
              progressData.map((subject) => (
                <div key={subject.subjectId}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-700">
                      {subject.name}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {subject.completedTopics}/{subject.totalTopics} tópicos
                    </span>
                  </div>
                  <div
                    className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden"
                    aria-label={`Progresso em ${subject.name}`}
                  >
                    <div
                      className="h-full bg-black rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.round(subject.progress * 100)}%`
                      }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
                      {Math.round(subject.progress * 100)}%
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum progresso registrado ainda.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
