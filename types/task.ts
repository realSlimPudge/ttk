export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED"
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH"

export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface Task {
  ID: string; // Уникальный идентификатор задачи
  Title: string; // Название задачи
  Content: string; // Описание задачи
  Image: string; // URL изображения
  CreatedAt: string; // Дата создания задачи
  UserID: string; // ID пользователя, создавшего задачу
  PlannedAt: string; // Запланированная дата выполнения
  Priority: "LOW" | "MEDIUM" | "HIGH"; // Приоритет задачи
  Status: "PENDING" | "IN_PROGRESS" | "COMPLETED"; // Статус задачи
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

