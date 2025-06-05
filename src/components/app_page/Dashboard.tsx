'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { SkeletonBox } from '../ui/skeleton-box';
import ProgressSection from './dashboard/ProgressSection';
import RecommendationSection from './dashboard/RecommendationSection';
import StatsOverview from './dashboard/StatsOverview';
import QuickActions from './dashboard/QuickActions';
import SavedContentSection from './dashboard/SavedContentSection';
import Footer from './Footer';
import type { UserStatsType } from '@/@types/AppTypes/UserStatsType';
import type { SavedContentType } from '@/@types/AppTypes/SavedContentType';
import type { ProgressType } from '@/@types/AppTypes/ProgressType';
import type { SubjectType } from '@/@types/AppTypes/SubjectType';
import Header from './Header';

export function Dashboard() {
  const [userStats, setUserStats] = useState<UserStatsType | null>(null);
  const [savedContents, setSavedContents] = useState<SavedContentType[]>([]);
  const [progressData, setProgressData] = useState<ProgressType[]>([]);
  const [recommendations, setRecommendations] = useState<SubjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch user statistics
      const statsResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/users/statistics`,
        {
          method: 'GET'
        }
      );

      if (!statsResponse.ok) {
        throw new Error('Não foi possível carregar as estatísticas');
      }

      const statsData = await statsResponse.json();
      setUserStats(statsData);

      // Fetch progress data
      const progressResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects/progress`,
        {
          method: 'GET'
        }
      );

      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        setProgressData(progressData || []);
      }

      // Fetch saved content
      const savedContentResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/saved-content/by-user-id`,
        {
          method: 'GET'
        }
      );

      if (savedContentResponse.ok) {
        const savedData = await savedContentResponse.json();

        // Fetch content details for each saved content
        if (savedData && savedData.length > 0) {
          const contentPromises = savedData
            .slice(0, 4)
            .map(async (item: SavedContentType) => {
              const contentResponse = await fetchWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/contents/${item.contentId}`,
                { method: 'GET' }
              );

              if (contentResponse.ok) {
                const contentData = await contentResponse.json();
                return {
                  ...item,
                  content: contentData
                };
              }
              return item;
            });

          const enrichedSavedContent = await Promise.all(contentPromises);
          setSavedContents(enrichedSavedContent);
        } else {
          setSavedContents([]);
        }
      }

      const subjectsResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects`,
        { method: 'GET' }
      );

      if (subjectsResponse.ok) {
        const subjectsData = await subjectsResponse.json();
        setRecommendations(subjectsData.slice(0, 4) || []);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao carregar os dados';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 p-6"
                >
                  <SkeletonBox
                    width="w-12"
                    height="h-12"
                    className="rounded-full mb-4"
                  />
                  <SkeletonBox width="w-20" height="h-6" className="mb-2" />
                  <SkeletonBox width="w-16" height="h-4" />
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 p-6">
              <SkeletonBox width="w-48" height="h-8" className="mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <SkeletonBox width="w-full" height="h-4" className="mb-1" />
                    <SkeletonBox width="w-full" height="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 p-6 md:col-span-2">
                <SkeletonBox width="w-48" height="h-8" className="mb-6" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <SkeletonBox
                        width="w-16"
                        height="h-16"
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <SkeletonBox
                          width="w-full"
                          height="h-4"
                          className="mb-2"
                        />
                        <SkeletonBox width="w-3/4" height="h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 p-6">
                <SkeletonBox width="w-48" height="h-8" className="mb-6" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <SkeletonBox
                        width="w-10"
                        height="h-10"
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <SkeletonBox
                          width="w-full"
                          height="h-4"
                          className="mb-2"
                        />
                        <SkeletonBox width="w-2/3" height="h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border dark:border-gray-700 p-8 text-center">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="bg-blue-600 text-white dark:bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsOverview {...userStats} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ProgressSection progress={progressData} />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                {savedContents.length > 0 && (
                  <SavedContentSection savedContents={savedContents} />
                )}
              </div>
              <div>
                <RecommendationSection recommendations={recommendations} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
