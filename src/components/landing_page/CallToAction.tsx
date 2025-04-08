import { Button } from '../ui/button';

export default function CallToAction() {
  return (
    <section className="py-16 px-4 bg-slate-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronto para transformar seus estudos?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Junte-se a milhares de estudantes que estão aproveitando nossa
          plataforma para dominar a Ciência da Computação
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 hover:cursor-pointer"
          >
            Começar Agora
          </Button>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 hover:cursor-pointer"
          >
            Saiba mais
          </Button>
        </div>
      </div>
    </section>
  );
}
