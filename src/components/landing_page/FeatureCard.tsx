import { Feature } from '@/@types/LandingPageTypes/FeatureType';
import { Card, CardContent } from '../ui/card';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-slate-200 shadow-2xl">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-slate-600 text-muted-foreground">
            {feature.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
