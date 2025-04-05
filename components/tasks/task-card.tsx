"use client";

import { useState } from "react";
import type { Task, TaskStatus, TaskPriority } from "@/types/task";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  RotateCcw,
  AlertTriangle,
  AlertCircle,
  User,
} from "lucide-react";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  status: TaskStatus;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: (newStatus: TaskStatus) => void;
}

export function TaskCard({
  task,
  status,
  onView,
  onEdit,
  onDelete,
  onChangeStatus,
}: TaskCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Получение цвета и иконки для приоритета
  const getPriorityInfo = (priority: TaskPriority) => {
    switch (priority) {
      case "low":
        return { color: "text-green-500", icon: null, text: "Низкий" };
      case "medium":
        return {
          color: "text-yellow-500",
          icon: <AlertCircle className="h-4 w-4" />,
          text: "Средний",
        };
      case "high":
        return {
          color: "text-red-500",
          icon: <AlertTriangle className="h-4 w-4" />,
          text: "Высокий",
        };
    }
  };

  const priorityInfo = getPriorityInfo(task.priority);

  // Проверка просроченности задачи
  const isOverdue =
    task.status !== "completed" && new Date(task.dueDate) < new Date();

  return (
    <>
      <Card
        className={`h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow ${isOverdue ? "border-red-300" : ""
          }`}
        onClick={onView}
      >
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold line-clamp-2">{task.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">Меню</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Редактировать
                </DropdownMenuItem>

                {/* Опции смены статуса в зависимости от текущего раздела */}
                {status === "current" && (
                  <>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus("postponed");
                      }}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Отложить
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus("completed");
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Выполнить
                    </DropdownMenuItem>
                  </>
                )}

                {status === "postponed" && (
                  <>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus("current");
                      }}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Вернуть в работу
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus("completed");
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Выполнить
                    </DropdownMenuItem>
                  </>
                )}

                {status === "completed" && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeStatus("current");
                    }}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Вернуть в работу
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteDialogOpen(true);
                  }}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-2 flex items-center">
            <span className={`flex items-center ${priorityInfo.color}`}>
              {priorityInfo.icon && (
                <span className="mr-1">{priorityInfo.icon}</span>
              )}
              {priorityInfo.text}
            </span>
            {isOverdue && (
              <span className="ml-2 text-red-500 text-sm">Просрочено</span>
            )}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <div>Создано: {formatDate(task.createdAt)}</div>
            <div>Срок: {formatDate(task.dueDate)}</div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto border-t">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              {task.responsibleUser.avatarUrl ? (
                <Image
                  src={task.responsibleUser.avatarUrl || "/placeholder.svg"}
                  alt={task.responsibleUser.name}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <User />
              )}
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Ответственный:</p>
              <p>{task.responsibleUser.name}</p>
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
              Это действие нельзя отменить. Задача &quot;{task.title}&quot;
              будет удалена.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
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
