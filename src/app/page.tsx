"use client";

import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Features from "./components/Feature";
import HowItWorks from "./components/HowItWork";
import BenefitsSection from "./components/benefits";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
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
    </motion.main>
  );
}
