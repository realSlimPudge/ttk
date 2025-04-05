"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArticleList } from "@/components/articles/article-list";
import { ArticleEditor } from "@/components/articles/article-editor";
import { ArticleHistory } from "@/components/articles/article-history";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Article, HistoryEntry } from "@/types/article";

// Демонстрационные данные
const initialArticles: Article[] = [
  {
    id: "1",
    title: "Введение в React",
    content:
      "<p>React — это библиотека JavaScript для создания пользовательских интерфейсов.</p><ol><li>Компонентный подход</li><li>Виртуальный DOM</li><li>Однонаправленный поток данных</li></ol>",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-11-20"),
    createdBy: {
      id: "user1",
      name: "Иван Петров",
      avatarUrl: "",
    },
    lastEditedBy: {
      id: "user2",
      name: "Мария Сидорова",
      avatarUrl: "",
    },
  },
  {
    id: "2",
    title: "Основы TypeScript",
    content:
      "<p>TypeScript — это строго типизированный язык программирования, который является надмножеством JavaScript.</p><ol><li>Типы данных</li><li>Интерфейсы</li><li>Дженерики</li></ol>",
    imageUrl: "",
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2023-12-10"),
    createdBy: {
      id: "user2",
      name: "Мария Сидорова",
      avatarUrl: "",
    },
    lastEditedBy: {
      id: "user1",
      name: "Иван Петров",
      avatarUrl: "",
    },
  },
];

const initialHistory: HistoryEntry[] = [
  {
    id: "h1",
    articleId: "1",
    articleTitle: "Введение в React",
    eventType: "create",
    timestamp: new Date("2023-10-15"),
    user: {
      id: "user1",
      name: "Иван Петров",
      avatarUrl: "",
    },
  },
  {
    id: "h2",
    articleId: "1",
    articleTitle: "Введение в React",
    eventType: "update",
    timestamp: new Date("2023-11-20"),
    user: {
      id: "user2",
      name: "Мария Сидорова",
      avatarUrl: "",
    },
  },
  {
    id: "h3",
    articleId: "2",
    articleTitle: "Основы TypeScript",
    eventType: "create",
    timestamp: new Date("2023-09-05"),
    user: {
      id: "user2",
      name: "Мария Сидорова",
      avatarUrl: "",
    },
  },
  {
    id: "h4",
    articleId: "2",
    articleTitle: "Основы TypeScript",
    eventType: "update",
    timestamp: new Date("2023-12-10"),
    user: {
      id: "user1",
      name: "Иван Петров",
      avatarUrl: "",
    },
  },
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  // Текущий пользователь (для демонстрации)
  const currentUser = {
    id: "user1",
    name: "Иван Петров",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  };

  // Обработчик создания новой статьи
  const handleCreateArticle = () => {
    setCurrentArticle(null);
    setIsEditorOpen(true);
  };

  // Обработчик редактирования статьи
  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsEditorOpen(true);
  };

  // Обработчик удаления статьи
  const handleDeleteArticle = (articleId: string) => {
    // Добавляем запись в историю
    const articleToDelete = articles.find((a) => a.id === articleId);
    if (articleToDelete) {
      const newHistoryEntry: HistoryEntry = {
        id: `h${history.length + 1}`,
        articleId,
        articleTitle: articleToDelete.title,
        eventType: "delete",
        timestamp: new Date(),
        user: currentUser,
      };
      setHistory([newHistoryEntry, ...history]);
    }

    // Удаляем статью
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  // Обработчик сохранения статьи
  const handleSaveArticle = (article: Article) => {
    const now = new Date();

    if (article.id) {
      // Обновление существующей статьи
      const updatedArticle = {
        ...article,
        updatedAt: now,
        lastEditedBy: currentUser,
      };

      setArticles(
        articles.map((a) => (a.id === article.id ? updatedArticle : a)),
      );

      // Добавляем запись в историю
      const newHistoryEntry: HistoryEntry = {
        id: `h${history.length + 1}`,
        articleId: article.id,
        articleTitle: article.title,
        eventType: "update",
        timestamp: now,
        user: currentUser,
      };
      setHistory([newHistoryEntry, ...history]);
    } else {
      // Создание новой статьи
      const newArticle = {
        ...article,
        id: `${articles.length + 1}`,
        createdAt: now,
        updatedAt: now,
        createdBy: currentUser,
        lastEditedBy: currentUser,
      };

      setArticles([newArticle, ...articles]);

      // Добавляем запись в историю
      const newHistoryEntry: HistoryEntry = {
        id: `h${history.length + 1}`,
        articleId: newArticle.id,
        articleTitle: newArticle.title,
        eventType: "create",
        timestamp: now,
        user: currentUser,
      };
      setHistory([newHistoryEntry, ...history]);
    }

    setIsEditorOpen(false);
  };

  // Обработчик просмотра истории
  const handleViewHistory = () => {
    setIsHistoryOpen(true);
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex-1 container mx-auto max-w-screen-lg px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Статьи</h1>
          <div className="flex space-x-4">
            <Button onClick={handleViewHistory} variant="outline">
              История изменений
            </Button>
            <Button onClick={handleCreateArticle}>
              <Plus className="mr-2 h-4 w-4" />
              Новая статья
            </Button>
          </div>
        </div>

        <ArticleList
          articles={articles}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
        />

        {isEditorOpen && (
          <ArticleEditor
            article={currentArticle}
            onSave={handleSaveArticle}
            onCancel={() => setIsEditorOpen(false)}
          />
        )}

        {isHistoryOpen && (
          <ArticleHistory
            history={history}
            onClose={() => setIsHistoryOpen(false)}
          />
        )}
      </div>
    </motion.section>
  );
}
