'use client';

import { ContentTopicType } from '@/@types/SubjectPageTypes/ContentTypes/ContentTopicType';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface TopicItemProps {
  topic: ContentTopicType;
}

export default function TopicsItem({ topic }: TopicItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col border border-slate-200 rounded-lg border-solid overflow-hidden hover:shadow-md transition-shadow group p-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
      >
        <div className="flex items-center gap-4">
          <div className="md:w-8 md:h-8 flex items-center justify-center text-white text-lg font-bold bg-slate-900 rounded-full">
            {topic.id}
          </div>
          <div>
            <h1 className="font-bold md:text-xl">{topic.title}</h1>
            <p className="text-gray-600 text-sm md:text-md">
              {topic.description}
            </p>
          </div>
        </div>
        <div
          className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        >
          <ChevronDownIcon />
        </div>
      </div>
      {isExpanded && (
        <div className="mx-12 mt-3">
          <h4 className="font-medium mb-2">Materiais Disponíveis:</h4>
          <ul className="list-disc list-inside">
            <li>Aulas em vídeo</li>
            <li>Material de leitura em PDF</li>
            <li>Exercícios práticos</li>
          </ul>
        </div>
      )}
    </div>
  );
}
