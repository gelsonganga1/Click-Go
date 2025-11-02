import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  titulo: string;
  valor: number;
  icon: React.ElementType;
  cor: string;
}

export default function StatsCards({ titulo, valor, icon: Icon, cor }: StatsCardsProps) {
  return (
    <Card className={`p-4 ${cor} text-white`}>
      <CardContent className="flex items-center justify-between">
        <div>
          <h3 className="text-sm">{titulo}</h3>
          <p className="text-xl font-bold">{valor}</p>
        </div>
        <Icon className="w-8 h-8" />
      </CardContent>
    </Card>
  );
}
