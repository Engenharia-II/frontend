import Footer from '../Footer';
import Navbar from '../Navbar';
import SubjectContent from './SubjectContent';
import SubjectHeader from './SubjectHeader';

const subjectContents = [
  { id: 1, topic: 'Introdução a Algoritmos', resources: 3 },
  { id: 2, topic: 'Estruturas de Dados Lineares', resources: 3 },
  { id: 3, topic: 'Algoritmos de Ordenação', resources: 3 },
  { id: 4, topic: 'Árvores', resources: 3 },
  { id: 5, topic: 'Grafos', resources: 3 }
];

export default function SubjectsLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <SubjectHeader
          title="Algoritmos e Estrutura de Dados"
          description="Esta disciplina aborda os principais conceitos de algoritmos e estruturas de dados utilizados na ciência da computação. São explorados desde algoritmos básicos de ordenação e busca até estruturas de dados avançadas como árvores e grafos, com análise de complexidade e implementação prática."
          duration={40}
        />
        <SubjectContent subjectContent={subjectContents} />
      </main>
      <Footer />
    </div>
  );
}
