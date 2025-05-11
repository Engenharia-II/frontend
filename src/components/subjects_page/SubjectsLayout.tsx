import Footer from '../app_page/Footer';
import Navbar from '../app_page/Navbar';
import SubjectContent from './SubjectContent';
import SubjectHeader from './SubjectHeader';
import TopicsList from './TopicsList';

const subjectContents = [
  { id: 1, topic: 'Introdução a Algoritmos', resources: 3 },
  { id: 2, topic: 'Estruturas de Dados Lineares', resources: 3 },
  { id: 3, topic: 'Algoritmos de Ordenação', resources: 3 },
  { id: 4, topic: 'Árvores', resources: 3 },
  { id: 5, topic: 'Grafos', resources: 3 }
];

const topics = [
  {
    id: 1,
    title: 'Introdução a Algoritmos',
    description:
      'Conceitos fundamentais, notação assintótica e análise de complexidade.'
  },
  {
    id: 2,
    title: 'Estruturas de Dados Lineares',
    description: 'Arrays, listas ligadas, pilhas e filas.'
  },
  {
    id: 3,
    title: 'Algoritmos de Ordenação',
    description:
      'Bubble sort, insertion sort, selection sort, merge sort, quick sort.'
  },
  {
    id: 4,
    title: 'Árvores',
    description:
      'Árvores binárias, árvores de busca binária, árvores AVL, heaps.'
  },
  {
    id: 5,
    title: 'Grafos',
    description:
      'Representação de grafos, busca em largura, busca em profundidade, algoritmos de caminho mínimo.'
  }
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
        <TopicsList topics={topics} />
      </main>
      <Footer />
    </div>
  );
}
