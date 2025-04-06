import Features from '@/components/landing_page/Features';
import Footer from '@/components/landing_page/Footer';
import Header from '@/components/landing_page/Header';
import LearningPath from '@/components/landing_page/LearningPath';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Features />
      <LearningPath />
      <Footer />
    </div>
  );
}
