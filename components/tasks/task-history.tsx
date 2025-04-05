"use client";

import type { HistoryEntry } from "@/types/task";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Edit, Trash2, User } from "lucide-react";
import Image from "next/image";

interface TaskHistoryProps {
  history: HistoryEntry[];
  onClose: () => void;
}

export function TaskHistory({ history, onClose }: TaskHistoryProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "create":
        return <PlusCircle className="h-5 w-5 text-green-500" />;
      case "update":
        return <Edit className="h-5 w-5 text-blue-500" />;
      case "delete":
        return <Trash2 className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getEventText = (eventType: string) => {
    switch (eventType) {
      case "create":
        return "Создание";
      case "update":
        return "Изменение";
      case "delete":
        return "Удаление";
      default:
        return "Неизвестное событие";
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>История изменений задач</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          {history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">История изменений пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start p-4 border rounded-lg"
                >
                  <div className="mr-4 mt-1">
                    {getEventIcon(entry.eventType)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{entry.taskTitle}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-1">
                      {getEventText(entry.eventType)}
                      {entry.details && `: ${entry.details}`}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="relative h-6 w-6 mr-2">
                        {entry.user.avatarUrl ? (
                          <Image
                            src={entry.user.avatarUrl || "/placeholder.svg"}
                            alt={entry.user.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <User />
                        )}
                      </div>
                      <span className="text-sm">{entry.user.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
