import { Button } from '@/components/ui/button';
import { BookOpen, ClockIcon } from 'lucide-react';

interface SubjectHeaderProps {
  title: string;
  description: string;
  duration: number;
}

export default function SubjectHeader({
  title,
  description,
  duration
}: SubjectHeaderProps) {
  return (
    <section className="bg-gray-900 text-white py-7">
      <div className="flex flex-col gap-5 ml-10">
        <div className="flex items-center gap-6">
          <div className="bg-gray-800 p-3 rounded-xl">
            <BookOpen className="w-14 h-14" />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold">{title}</h1>
            <div className="flex items-center gap-2">
              <ClockIcon className="text-blue-300" />
              <p>Estimativa: {duration} horas de estudo</p>
            </div>
          </div>
        </div>
        <p className="text-justify w-3xl">{description}</p>
        <div className="flex items-center gap-3">
          <Button className="text-lg bg-blue-500 hover:bg-blue-600 hover:cursor-pointer p-5">
            Iniciar Estudos
          </Button>
          <Button className="text-black text-lg bg-white hover:bg-gray-300 hover:cursor-pointer p-5">
            Salvar para Depois
          </Button>
        </div>
      </div>
    </section>
  );
}
