export type ProgressType = {
  subjectId: string;
  name: string;
  totalTopics: bigint;
  completedTopics: bigint;
  progress: number;
  status: string | null;
};
