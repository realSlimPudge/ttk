export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface Article {
  ID: string
  Title: string
  Content: string
  Image: string
  CreatedAt: Date
  UpdatedAt: Date
  CreatedBy: User
  LastEditor: User
}

export interface HistoryEntry {
  id: string
  articleId: string
  articleTitle: string
  eventType: "create" | "update" | "delete"
  timestamp: Date
  user: User
}

