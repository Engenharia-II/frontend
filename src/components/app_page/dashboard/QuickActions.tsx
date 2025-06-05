import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaBookmark, FaGraduationCap } from 'react-icons/fa';

export default function QuickActions() {
  const actions = [
    {
      name: 'Explorar Disciplinas',
      description: 'Descubra novas áreas de estudo',
      icon: <FaGraduationCap className="text-blue-500" size={20} />,
      href: '/app/subjects',
      color: 'border-blue-200 bg-blue-50 hover:bg-blue-100'
    },
    {
      name: 'Conteúdos Salvos',
      description: 'Acesse seus favoritos',
      icon: <FaBookmark className="text-amber-500" size={20} />,
      href: '/app/saved-content',
      color: 'border-amber-200 bg-amber-50 hover:bg-amber-100'
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-900 border border-black dark:border-gray-700 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 bg-white dark:bg-gray-900 border-b border-black dark:border-gray-700">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Ações rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`flex items-center p-3 rounded-lg border transition-colors ${action.color}`}
            >
              <div className="mr-3">{action.icon}</div>
              <div>
                <h3 className="font-medium text-gray-900">{action.name}</h3>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
