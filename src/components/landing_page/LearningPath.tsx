import LearningPathCard from './LearningPathCard';

const pathways = [
  {
    title: 'Programação Básica',
    description:
      'Fundamentos de algoritmos e introdução a linguagens de programação',
    color: 'bg-blue-500'
  },
  {
    title: 'Estruturas de Dados',
    description:
      'Arrays, listas encadeadas, árvores, grafos e algoritmos de busca',
    color: 'bg-green-500'
  },
  {
    title: 'Desenvolvimento Web',
    description: 'HTML, CSS, JavaScript e frameworks modernos',
    color: 'bg-purple-500'
  },
  {
    title: 'Inteligência Artificial',
    description:
      'Machine Learning, Deep Learning e processamento de linguagem natural',
    color: 'bg-amber-500'
  }
];

export default function LearningPath() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Trilhas de Aprendizado
        </h2>
        <p className="text-slate-700 text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Conteúdo estruturado para guiar sua jornado na computação
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pathways.map((pathway, index) => (
            <LearningPathCard key={index} pathway={pathway} />
          ))}
        </div>
      </div>
    </section>
  );
}
