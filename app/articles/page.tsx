"use client";

import { motion } from "framer-motion";
import { ArticleList } from "@/components/articles/article-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { host } from "@/api/host";

const fetcher = (url: string) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).then((res) => res.json());
};

export default function ArticlesPage() {
  const { data: articles, mutate } = useSWR(
    `${host}/api/v1/article/show`,
    fetcher,
    { refreshInterval: 10000 },
  );

  const handleDeleteArticle = async (articleId: string) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    await fetch(`${host}/api/v1/article/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    mutate(); // Обновляем список статей
  };
  if (!articles) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }
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
            <Button variant="outline">История изменений</Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Новая статья
            </Button>
          </div>
        </div>

        <ArticleList
          articles={articles.articles}
          onDelete={handleDeleteArticle}
          onEdit={(article) => {
            console.log("Edit article:", article);
          }}
        />
      </div>
    </motion.section>
  );
}
