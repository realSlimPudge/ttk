import type { Article } from "@/types/article"
import { ArticleCard } from "./article-card"

interface ArticleListProps {
  articles: Article[]
  onEdit: (article: Article) => void
  onDelete: (articleId: string) => void
}

export function ArticleList({ articles, onEdit, onDelete }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Статьи не найдены. Создайте новую статью.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onEdit={() => onEdit(article)}
          onDelete={() => onDelete(article.id)}
        />
      ))}
    </div>
  )
}

