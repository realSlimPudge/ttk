"use client";
import RegisterForm from "@/widgets/RegisterForm/RegisterForm";
import { motion } from "motion/react";
export default function RegisterPage() {
  return (
    <motion.section
      className="min-h-[calc(100vh_-_60px)] flex items-center justify-center"
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
    >
      <RegisterForm />
    </motion.section>
  );
}
