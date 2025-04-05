export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface Article {
  id: string
  title: string
  content: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  createdBy: User
  lastEditedBy: User
}

export interface HistoryEntry {
  id: string
  articleId: string
  articleTitle: string
  eventType: "create" | "update" | "delete"
  timestamp: Date
  user: User
}

