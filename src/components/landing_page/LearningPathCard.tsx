import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Pathway } from '@/@types/LandingPageTypes/PathwayType';

interface PathwayProps {
  pathway: Pathway;
}

export default function LearningPathCard({ pathway }: PathwayProps) {
  return (
    <Card className="border-none shadow-lg hover:shadow-lg ">
      <CardHeader className={`${pathway.color} text-white rounded-t-lg`}>
        <CardTitle className="text-2xl pt-2 p-2">{pathway.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-lg text-slate-600">
          {pathway.description}
        </CardDescription>
        <Button
          variant="outline"
          className="border border-slate-300 mt-4 group hover:cursor-pointer hover:bg-slate-200"
        >
          Explorar
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
