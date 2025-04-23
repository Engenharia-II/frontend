import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const inProgressCourses = [
  {
    title: 'Algoritmos e Estruturas de Dados',
    progress: 65
  },
  {
    title: 'Desenvolvimento Web Full Stack',
    progress: 42
  },
  {
    title: 'Introdução à Inteligência Artificial',
    progress: 18
  }
];

export default function ProgressTracker() {
  // Isso é patético, mas não sei como fazer isso de outra forma
  // e não quero perder tempo com isso agora
  // O ideal seria fazer isso com um useEffect e um useState mas FODASE
  let progresses = 0;
  for (let i = 0; i < inProgressCourses.length; i++) {
    progresses += inProgressCourses[i].progress;
  }
  progresses /= inProgressCourses.length;

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="border-gray-200 lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl">Seu progresso</CardTitle>
          <span className="text-sm">{progresses.toFixed(0)}% completo</span>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inProgressCourses.map((course, index) => (
              <div key={index}>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h4 className="text-sm font-semibold">{course.title}</h4>
                  <span className="text-sm text-slate-500">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
