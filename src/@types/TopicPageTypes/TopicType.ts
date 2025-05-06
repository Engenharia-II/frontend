import { ContentTopicType } from './ContentTopicType';

export type TopicType = {
  id: string;
  name: string;
  description: string;
  progress: number;
  contents: ContentTopicType[];
};
