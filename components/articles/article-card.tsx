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

interface ArticleCardProps {
  article: Article;
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleCard({ article, onEdit, onDelete }: ArticleCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover rounded-t-lg"
              />
            ) : (
              <NoImageArticle />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold line-clamp-2">
              {article.title}
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
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Создано: {formatDate(article.createdAt)}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              {article.lastEditedBy.avatarUrl ? (
                <Image
                  src={article.lastEditedBy.avatarUrl}
                  alt={article.lastEditedBy.name}
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
                {article.lastEditedBy.name}, {formatDate(article.updatedAt)}
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
              Это действие нельзя отменить. Статья &quot;{article.title}&quot;
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
