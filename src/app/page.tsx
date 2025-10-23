"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Features from "./components/Feature";
import HowItWorks from "./components/HowItWork";
import BenefitsSection from "./components/benefits";
import Testimonials from "./components/Testimonials";
import Deploy from "./components/Deploy";
import Footer from "./components/Footer";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Se não estiver logado, redireciona para o login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Enquanto verifica o login, mostra carregando
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Carregando...
      </div>
    );
  }

  // Se não tiver usuário logado, não renderiza a Home
  if (!user) return null;

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-hidden"
    >
      <motion.div variants={fadeInUp}>
        <Navbar />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Hero />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Features />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <HowItWorks />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <BenefitsSection />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Testimonials />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Deploy />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Footer />
      </motion.div>
    </motion.main>
  );
}
