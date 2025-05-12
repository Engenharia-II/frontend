'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';

interface progressDataInterface {
  subjectId: string;
  name: string;
  totalTopics: number;
  completedTopics: number;
  progress: number;
}

export default function ProgressTracker() {
  const [progressData, setProgressData] = useState<
    progressDataInterface[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  // add interface for the user data
  const fetchProgressData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects/progress`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Não foi possível obter os progressos do usuário');
      }
      const data = (await response.json()) as progressDataInterface[];
      const limitedData = data.slice(0, 3);
      setProgressData(limitedData);
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
    fetchProgressData();
  }, []);

  if (isLoading || !progressData) {
    return <span>Carregando...</span>;
  }

  return (
    <section className="w-full">
      <Card className="border-gray-200 lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl">Seu progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.map((subject, index) => (
              <div key={index}>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h4 className="text-sm font-semibold">{subject.name}</h4>
                  <span className="text-sm text-slate-500">
                    {subject.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
