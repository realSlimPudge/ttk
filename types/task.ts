export type TaskStatus = "current" | "postponed" | "completed"
export type TaskPriority = "low" | "medium" | "high"

export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface Task {
  id: string
  title: string
  content: string
  imageUrl: string
  createdAt: Date
  dueDate: Date
  status: TaskStatus
  priority: TaskPriority
  responsibleUser: User
  createdBy: User
}

export interface HistoryEntry {
  id: string
  taskId: string
  taskTitle: string
  eventType: "create" | "update" | "delete"
  timestamp: Date
  user: User
  details?: string
}

