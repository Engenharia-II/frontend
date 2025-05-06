import { ContentTopicType } from '@/@types/TopicPageTypes/ContentTopicType';
import TopicContentItem from './TopicContentItem';

interface TopicContentsProps {
  contents: ContentTopicType[];
}

export default function TopicContents({ contents }: TopicContentsProps) {
  return (
    <div className="mx-10 mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Conteúdos do Tópico
      </h1>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-2">
        {contents.map((content, index) => (
          <TopicContentItem key={index} content={content} />
        ))}
      </div>
    </div>
  );
}
