"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

import Navbar from "./_components/Navbar";
import Hero from "./_components/hero";
import Features from "./_components/Feature";
import HowItWorks from "./_components/HowItWork";
import BenefitsSection from "./_components/benefits";
import Testimonials from "./_components/Testimonials";
import Deploy from "./_components/Deploy";
import Footer from "./_components/Footer";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // se não estiver logado, redireciona para login
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="flex items-center justify-center h-screen text-gray-600">Carregando...</div>;
  if (!user) return null; // evita renderizar antes do user estar carregado

  return (
    <motion.main initial="initial" animate="animate" exit="exit" className="overflow-hidden">
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

