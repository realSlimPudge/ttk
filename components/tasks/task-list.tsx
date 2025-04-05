import type { Task, TaskStatus } from "@/types/task"
import { TaskCard } from "./task-card"

interface TaskListProps {
  tasks: Task[]
  status: TaskStatus
  onView: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onChangeStatus: (taskId: string, newStatus: TaskStatus) => void
}

export function TaskList({ tasks, status, onView, onEdit, onDelete, onChangeStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {status === "current" && "Нет текущих задач"}
          {status === "postponed" && "Нет отложенных задач"}
          {status === "completed" && "Нет выполненных задач"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          status={status}
          onView={() => onView(task)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onChangeStatus={(newStatus) => onChangeStatus(task.id, newStatus)}
        />
      ))}
    </div>
  )
}

