import { ContentTopicType } from '@/@types/SubjectPageTypes/ContentTypes/ContentTopicType';
import TopicItem from './TopicItem';

interface TopicsListProps {
  topics: ContentTopicType[];
}

export default function TopicsList({ topics }: TopicsListProps) {
  return (
    <section className="mx-8 mt-8">
      <h1 className="text-2xl font-semibold">Tópicos e Materiais</h1>
      <div className="flex flex-col gap-4 mt-8">
        {topics.map((topic, index) => (
          <TopicItem key={index} topic={topic} />
        ))}
      </div>
    </section>
  );
}
