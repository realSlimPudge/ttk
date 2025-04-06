"use client"

import { useState, useEffect } from "react"
import type { Article } from "@/types/article"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus } from "lucide-react"
import Image from "next/image"

interface ArticleEditorProps {
  article: Article | null
  onSave: (article: Article) => void
  onCancel: () => void
}

export function ArticleEditor({ article, onSave, onCancel }: ArticleEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=200&width=400")

  // Инициализация формы при открытии
  useEffect(() => {
    if (article) {
      setTitle(article.Title)
      setContent(article.Content)
      setImageUrl(article.Image)
    } else {
      setTitle("")
      setContent("")
      setImageUrl("/placeholder.svg?height=200&width=400")
    }
  }, [article])

  const handleSave = () => {
    const updatedArticle: Article = {
      Id: article?.ID || "",
      title,
      content,
      imageUrl,
      createdAt: article?.createdAt || new Date(),
      updatedAt: article?.updatedAt || new Date(),
      createdBy: article?.createdBy || { id: "", name: "", avatarUrl: "" },
      lastEditedBy: article?.lastEditedBy || { id: "", name: "", avatarUrl: "" },
    }

    onSave(updatedArticle)
  }

  // Функция для добавления нумерованного списка
  const addNumberedList = () => {
    setContent((prev) => `${prev}<ol><li>Пункт 1</li><li>Пункт 2</li><li>Пункт 3</li></ol>`)
  }

  // Функция для выбора изображения (демо)
  const handleImageSelect = () => {
    // В реальном приложении здесь был бы выбор файла и загрузка
    const demoImages = [
      "/placeholder.svg?height=200&width=400&text=Image+1",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3",
    ]
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)]
    setImageUrl(randomImage)
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{article ? `Редактирование статьи: ${article.Title}` : "Создание новой статьи"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название статьи"
            />
          </div>

          <div className="grid gap-2">
            <Label>Изображение</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-32 w-48 bg-muted rounded-md overflow-hidden">
                <Image src={imageUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
              <Button type="button" variant="outline" onClick={handleImageSelect}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Выбрать изображение
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Содержание</Label>
            <div className="border rounded-md p-2">
              <div className="flex gap-2 mb-2 border-b pb-2">
                <Button type="button" variant="outline" size="sm" onClick={addNumberedList}>
                  Нумерованный список
                </Button>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите содержание статьи"
                className="min-h-[200px] border-none focus-visible:ring-0 p-0"
              />
            </div>
            <div className="text-sm text-muted-foreground">Поддерживается HTML-разметка для форматирования текста.</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {article ? "Сохранить изменения" : "Создать статью"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

