import Footer from '../dashboard_page/Footer';
import Navbar from '../dashboard_page/Navbar';
import TopicContents from './TopicContents';
import TopicsHeader from './TopicsHeader';

const topicData = {
  id: '1',
  name: 'Árvores',
  description:
    'Árvores são estruturas de dados não lineares que organizam dados de forma hierárquica. São amplamente utilizadas em computação devido à sua eficiência em operações de busca, inserção e remoção.',
  progress: 40,
  contents: [
    {
      id: '1',
      name: 'Árvores Binárias',
      description: 'Fundamentos e implementação de árvores binárias',
      duration: 1,
      url: 'https://www.youtube.com/watch?v=1g2v3w4x5y6',
      completed: true
    },
    {
      id: '2',
      name: 'Árvores de Busca Binária',
      description: 'Estrutura, operações e balanceamento',
      duration: 1,
      url: 'https://www.youtube.com/watch?v=1g2v3w4x5y6',
      completed: true
    },
    {
      id: '3',
      name: 'Árvores AVL',
      description: 'Balanceamento e rotações',
      duration: 1,
      url: 'https://www.youtube.com/watch?v=1g2v3w4x5y6',
      completed: false
    },
    {
      id: '4',
      name: 'Árvores Rubro-Negras',
      description: 'Propriedades e implementação',
      duration: 1,
      url: 'https://www.youtube.com/watch?v=1g2v3w4x5y6',
      completed: false
    },
    {
      id: '5',
      name: 'Heaps',
      description: 'Filas de prioridade e aplicações',
      duration: 1,
      url: 'https://www.youtube.com/watch?v=1g2v3w4x5y6',
      completed: false
    }
  ]
};

export default function TopicsLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <TopicsHeader topicData={topicData} />
        <TopicContents contents={topicData.contents} />
      </main>
      <Footer />
    </div>
  );
}
