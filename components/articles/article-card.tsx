"use client";

import { useState } from "react";
import type { Article } from "@/types/article";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Edit, Trash2, User } from "lucide-react";
import Image from "next/image";
import NoImageArticle from "./no-image";
import { toast } from "sonner";
import { host } from "@/api/host";

interface ArticleCardProps {
  article: Article;
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleCard({ article, onEdit, onDelete }: ArticleCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  async function handleDelete() {
    setIsDeleteDialogOpen(false);
    try {
      // Отправляем запрос на удаление статьи
      const res = await fetch(`${host}/api/v1/article/${article.ID}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Ошибка при удалении статьи");
      }
      if (res.status === 500) {
        toast.error("Ошибка при удалении статьи");
      }
    } catch (error) {
      console.error("Ошибка при удалении статьи:", error);
      toast.error("Ошибка при удалении статьи");
    }
  }
  const formatDate = (date: Date | string | undefined | null) => {
    if (!date) return "Неизвестно";

    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (isNaN(parsedDate.getTime())) {
      return "Неизвестно"; // Возвращаем значение по умолчанию, если дата некорректна
    }

    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(parsedDate);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <NoImageArticle />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold line-clamp-2">
              {article.Title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">Меню</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete()}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Создано: {formatDate(article.CreatedAt)}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              {article.LastEditor.avatarUrl ? (
                <Image
                  src={article.LastEditor.avatarUrl}
                  alt={article.LastEditor.name}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <User />
              )}
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Последнее изменение:</p>
              <p>
                {article.LastEditor.name}, {formatDate(article.UpdatedAt)}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Статья &quot;{article.Title}&quot;
              будет удалена.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
