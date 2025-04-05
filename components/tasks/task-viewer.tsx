"use client"

import type { Task } from "@/types/task"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Edit } from "lucide-react"
import Image from "next/image"

interface TaskViewerProps {
  task: Task
  onClose: () => void
  onEdit: () => void
}

export function TaskViewer({ task, onClose, onEdit }: TaskViewerProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Получение информации о приоритете
  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case "low":
        return { color: "text-green-500", icon: null, text: "Низкий" }
      case "medium":
        return { color: "text-yellow-500", icon: <AlertCircle className="h-4 w-4" />, text: "Средний" }
      case "high":
        return { color: "text-red-500", icon: <AlertTriangle className="h-4 w-4" />, text: "Высокий" }
      default:
        return { color: "", icon: null, text: priority }
    }
  }

  const priorityInfo = getPriorityInfo(task.priority)

  // Получение текста статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case "current":
        return "Текущая"
      case "postponed":
        return "Отложенная"
      case "completed":
        return "Выполненная"
      default:
        return status
    }
  }

  // Проверка просроченности задачи
  const isOverdue = task.status !== "completed" && new Date(task.dueDate) < new Date()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Информация о задаче */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Статус:</p>
              <p>{getStatusText(task.status)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Приоритет:</p>
              <p className={`flex items-center ${priorityInfo.color}`}>
                {priorityInfo.icon && <span className="mr-1">{priorityInfo.icon}</span>}
                {priorityInfo.text}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Создано:</p>
              <p>{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Срок выполнения:</p>
              <p className={isOverdue ? "text-red-500" : ""}>
                {formatDate(task.dueDate)}
                {isOverdue && task.status !== "completed" && " (просрочено)"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Создал:</p>
              <div className="flex items-center">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={task.createdBy.avatarUrl || "/placeholder.svg"}
                    alt={task.createdBy.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <p>{task.createdBy.name}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Ответственный:</p>
              <div className="flex items-center">
                <div className="relative h-6 w-6 mr-2">
                  <Image
                    src={task.responsibleUser.avatarUrl || "/placeholder.svg"}
                    alt={task.responsibleUser.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <p>{task.responsibleUser.name}</p>
              </div>
            </div>
          </div>

          {/* Изображение */}
          {task.imageUrl && (
            <div className="relative h-48 w-full">
              <Image
                src={task.imageUrl || "/placeholder.svg"}
                alt={task.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}

          {/* Содержание */}
          <div>
            <h3 className="text-lg font-medium mb-2">Описание:</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: task.content }} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Редактировать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

