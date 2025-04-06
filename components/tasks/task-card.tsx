"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{task.Title}</h3>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Запланировано: {new Date(task.PlannedAt).toLocaleDateString("ru-RU")}
        </p>
        <p className="text-sm text-muted-foreground">
          Приоритет: {task.Priority}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button variant="outline" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Редактировать
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}