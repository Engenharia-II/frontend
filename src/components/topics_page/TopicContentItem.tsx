'use client';

import { ContentTopicType } from '@/@types/TopicPageTypes/ContentTopicType';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface TopicContentItemProps {
  content: ContentTopicType;
}

export default function TopicContentItem({ content }: TopicContentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div
        key={content.id}
        className="flex flex-col p-4 border border-slate-200 rounded-lg gap-2 cursor-pointer hover:shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
      >
        <div className="w-full flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center text-white text-lg font-bold bg-slate-900 rounded-full">
              {content.id}
            </div>
            <div>
              <h1 className="font-bold text-xl">{content.name}</h1>
              <p className="text-gray-600">{content.description}</p>
            </div>
          </div>
          <span className="text-gray-500">{content.duration}h</span>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`mt-2 px-3 py-1 w-fit rounded text-sm font-medium ${
              content.completed
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {content.completed ? 'Concluído' : 'Não Concluído'}
          </p>
          <div
            className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <ChevronDownIcon />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="w-full border border-t-0 border-solid border-slate-200 rounded-lg p-2">
          <div className="mx-6">
            <h4 className="font-medium mb-2">Materiais Disponíveis:</h4>
            <ul className="list-disc list-inside">
              <li>
                <a target="blank" href={content.url} className="text-blue-500">
                  {content.url}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
