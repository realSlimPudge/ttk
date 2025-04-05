"use client"

import { useState, useEffect } from "react"
import type { Task, TaskPriority, User } from "@/types/task"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePlus, Bold, Italic, List, Underline } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import Image from "next/image"

interface TaskEditorProps {
  task: Task | null
  users: User[]
  onSave: (task: Task) => void
  onCancel: () => void
}

export function TaskEditor({ task, users, onSave, onCancel }: TaskEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=200&width=400")
  const [priority, setPriority] = useState<TaskPriority>("medium")
  const [responsibleUserId, setResponsibleUserId] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Инициализация формы при открытии
  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setContent(task.content)
      setImageUrl(task.imageUrl)
      setPriority(task.priority)
      setResponsibleUserId(task.responsibleUser.id)
      setDueDate(new Date(task.dueDate))
    } else {
      setTitle("")
      setContent("")
      setImageUrl("/placeholder.svg?height=200&width=400")
      setPriority("medium")
      setResponsibleUserId(users[0]?.id || "")
      setDueDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) // По умолчанию через неделю
    }
  }, [task, users])

  const handleSave = () => {
    const selectedUser = users.find((user) => user.id === responsibleUserId) || users[0]

    const updatedTask: Task = {
      id: task?.id || "",
      title,
      content,
      imageUrl,
      createdAt: task?.createdAt || new Date(),
      dueDate: dueDate || new Date(),
      status: task?.status || "current",
      priority,
      responsibleUser: selectedUser,
      createdBy: task?.createdBy || { id: "", name: "", avatarUrl: "" },
    }

    onSave(updatedTask)
  }

  // Функции для форматирования текста
  const addBold = () => {
    setContent((prev) => `${prev}<strong>выделенный текст</strong>`)
  }

  const addItalic = () => {
    setContent((prev) => `${prev}<em>курсив</em>`)
  }

  const addUnderline = () => {
    setContent((prev) => `${prev}<u>подчеркнутый текст</u>`)
  }

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
          <DialogTitle>{task ? `Редактирование задачи: ${task.title}` : "Создание новой задачи"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название задачи"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Приоритет</Label>
              <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsible">Ответственный</Label>
              <Select value={responsibleUserId} onValueChange={setResponsibleUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите ответственного" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Срок выполнения</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP", { locale: ru }) : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date)
                    setIsCalendarOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
                <Button type="button" variant="outline" size="sm" onClick={addBold}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={addItalic}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={addUnderline}>
                  <Underline className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={addNumberedList}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите содержание задачи"
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
          <Button onClick={handleSave} disabled={!title.trim() || !responsibleUserId || !dueDate}>
            {task ? "Сохранить изменения" : "Создать задачу"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

