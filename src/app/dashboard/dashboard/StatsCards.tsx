"use client";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type StatsCardsProps = {
  titulo: string;
  valor: number;
  icon: LucideIcon;
  cor: string; // Ex: "from-blue-500 to-blue-600"
};

export default function StatsCards({
  titulo,
  valor,
  icon: Icon,
  cor,
}: StatsCardsProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border-none shadow-md">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-slate-500 text-sm">{titulo}</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{valor}</h3>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cor} text-white`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
