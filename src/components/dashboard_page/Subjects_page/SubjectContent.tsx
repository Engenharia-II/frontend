import { SubjectContentType } from '@/@types/DashboardTypes/SubjectTypes/ContentTypes/SubjectContentType';

interface SubjectContentProps {
  subjectContent: SubjectContentType[];
}

export default function SubjectContent({
  subjectContent
}: SubjectContentProps) {
  return (
    <section className="mt-10 mx-10">
      <h1 className="text-2xl font-semibold mb-4">Conteúdo da disciplina</h1>
      <div className="table w-full border border-slate-200 border-solid rounded-lg">
        <div className="flex items-stretch justify-between border-b border-b-slate-200 border-solid bg-gray-50 text-gray-700 mx-4 p-3">
          <div className="flex gap-10">
            <p>Ordem</p>
            <p>Tópicos</p>
          </div>
          <p>Recursos</p>
        </div>
        {subjectContent.map((content) => (
          <div
            key={content.id}
            className="flex items-center justify-between text-slate-800 mx-6 gap-2 p-2"
          >
            <div className="flex items-center gap-20">
              <p>{content.id}</p>
              <p className="text-xl">{content.topic}</p>
            </div>
            <p>{content.resources}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
