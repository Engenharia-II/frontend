import { BookOpen, Code, Users, MessageSquare } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Guia de Estudos Estruturado',
    description:
      'Materiais organizados de acordo com o currículo de Ciência da Computação, desde iniciantes até avançados.'
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'Fórum Colaborativo',
    description:
      'Tire dúvidas, compartilhe conhecimentos e conecte-se com outros estudantes e profissionais.'
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Recursos de Qualidade',
    description:
      'Acesso a tutoriais, artigos, vídeos e exercícios selecionados para cada área de estudo.'
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Comunidade Ativa',
    description:
      'Faça parte de uma comunidade de estudantes e profissionais apaixonados por tecnologia.'
  }
];

export default function Features() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Tudo o que você precisa em um só lugar
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Supere as barreiras do aprendizado em Ciência da Computação com nossa
          plataforma completa
        </p>

        <div className="grid grid-cols-1 md:grig-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
