import { FC } from 'react';
import {
  FaBook,
  FaFileAlt,
  FaGraduationCap,
  FaMicrophone,
  FaPlay
} from 'react-icons/fa';
import { ContentType } from '@/@types/TopicPageTypes/ContentType';

interface ContentTypeIconProps {
  type: ContentType;
  size: 'small' | 'large';
}

const ContentTypeIcon: FC<ContentTypeIconProps> = ({ type, size }) => {
  const iconSize = size === 'small' ? 'text-xs' : 'text-4xl';
  const iconColor = size === 'small' ? 'text-white' : getColorByType(type);

  const getIcon = () => {
    switch (type) {
      case 'video':
        return <FaPlay className={`${iconSize} ${iconColor}`} />;
      case 'book':
        return <FaBook className={`${iconSize} ${iconColor}`} />;
      case 'article':
        return <FaFileAlt className={`${iconSize} ${iconColor}`} />;
      case 'course':
        return <FaGraduationCap className={`${iconSize} ${iconColor}`} />;
      case 'podcast':
        return <FaMicrophone className={`${iconSize} ${iconColor}`} />;
      default:
        return <FaFileAlt className={`${iconSize} ${iconColor}`} />;
    }
  };

  return getIcon();
};

function getColorByType(type: ContentType): string {
  switch (type) {
    case 'video':
      return 'text-red-500 dark:text-red-400';
    case 'book':
      return 'text-blue-500 dark:text-blue-400';
    case 'article':
      return 'text-green-500 dark:text-green-400';
    case 'course':
      return 'text-purple-500 dark:text-purple-400';
    case 'podcast':
      return 'text-orange-500 dark:text-orange-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
}

export default ContentTypeIcon;
