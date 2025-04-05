"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, CheckSquare } from "lucide-react";

export default function Home() {
  return (
    <motion.div
      className="container mx-auto max-w-screen-lg px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Простой заголовок */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">WebOrganizer</h1>
        <p className="text-muted-foreground">
          Ваш персональный помощник в организации работы
        </p>
      </div>

      {/* Основные разделы в виде двух карточек */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Карточка Статьи */}
        <Card className="flex flex-col h-full border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Статьи</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4">
              В разделе статей вы найдете полезные материалы по следующим темам:
            </p>
            <ul className="space-y-2 mb-6 list-disc pl-5">
              <li>Повышение личной эффективности</li>
              <li>Методики организации рабочего процесса</li>
              <li>Обзоры инструментов для планирования</li>
              <li>Советы по тайм-менеджменту</li>
            </ul>
            <p className="text-muted-foreground">
              Регулярные обновления и актуальная информация от экспертов в
              области организации работы.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" asChild>
              <Link href="/articles">Перейти к статьям</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Карточка Задачи */}
        <Card className="flex flex-col h-full border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <CheckSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Задачи</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4">Раздел задач поможет вам:</p>
            <ul className="space-y-2 mb-6 list-disc pl-5">
              <li>Создавать и организовывать задачи</li>
              <li>Устанавливать приоритеты и сроки</li>
              <li>Отслеживать прогресс выполнения</li>
              <li>Анализировать свою продуктивность</li>
            </ul>
            <p className="text-muted-foreground">
              Удобный интерфейс и функциональные возможности для эффективного
              управления вашими задачами.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" asChild>
              <Link href="/tasks">Перейти к задачам</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Дополнительная информация */}
      <div className="text-center">
        <p className="mb-4">
          Еще не зарегистрированы? Создайте аккаунт, чтобы получить доступ ко
          всем функциям.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/register">Регистрация</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Вход</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
