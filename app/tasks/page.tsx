"use client";

import { useState } from "react";
import Header from "@/header";
import { TaskList } from "@/components/tasks/task-list";
import { TaskEditor } from "@/components/tasks/task-editor";
import { TaskViewer } from "@/components/tasks/task-viewer";
import { TaskHistory } from "@/components/tasks/task-history";
import { TaskSearch } from "@/components/tasks/task-search";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, History, ClipboardList, Clock, CheckCircle } from "lucide-react";
import type { Task, TaskStatus, HistoryEntry, User } from "@/types/task";

// Демонстрационные данные пользователей
const demoUsers: User[] = [
  {
    id: "user1",
    name: "Иван Петров",
    avatarUrl: "",
  },
  {
    id: "user2",
    name: "Мария Сидорова",
    avatarUrl: "",
  },
  {
    id: "user3",
    name: "Алексей Иванов",
    avatarUrl: "",
  },
];

// Демонстрационные данные задач
const initialTasks: Task[] = [
  {
    id: "task1",
    title: "Разработать дизайн главной страницы",
    content:
      "<p>Необходимо разработать новый дизайн главной страницы сайта.</p><ol><li>Создать макет</li><li>Согласовать с руководством</li><li>Внедрить изменения</li></ol>",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date("2023-11-15"),
    dueDate: new Date("2023-12-01"),
    status: "current",
    priority: "high",
    responsibleUser: demoUsers[0],
    createdBy: demoUsers[1],
  },
  {
    id: "task2",
    title: "Оптимизировать базу данных",
    content:
      "<p>Требуется оптимизировать структуру базы данных для улучшения производительности.</p><ol><li>Проанализировать текущую структуру</li><li>Выявить узкие места</li><li>Внести изменения</li></ol>",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date("2023-10-20"),
    dueDate: new Date("2023-11-25"),
    status: "current",
    priority: "medium",
    responsibleUser: demoUsers[2],
    createdBy: demoUsers[0],
  },
  {
    id: "task3",
    title: "Подготовить отчет за квартал",
    content:
      "<p>Необходимо подготовить финансовый отчет за третий квартал.</p><ol><li>Собрать данные</li><li>Проанализировать показатели</li><li>Оформить презентацию</li></ol>",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date("2023-09-30"),
    dueDate: new Date("2023-10-15"),
    status: "postponed",
    priority: "low",
    responsibleUser: demoUsers[1],
    createdBy: demoUsers[2],
  },
  {
    id: "task4",
    title: "Обновить документацию API",
    content:
      "<p>Требуется обновить документацию API в соответствии с последними изменениями.</p>",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date("2023-08-10"),
    dueDate: new Date("2023-09-01"),
    status: "completed",
    priority: "medium",
    responsibleUser: demoUsers[0],
    createdBy: demoUsers[1],
  },
];

// Демонстрационные данные истории
const initialHistory: HistoryEntry[] = [
  {
    id: "h1",
    taskId: "task1",
    taskTitle: "Разработать дизайн главной страницы",
    eventType: "create",
    timestamp: new Date("2023-11-15"),
    user: demoUsers[1],
  },
  {
    id: "h2",
    taskId: "task2",
    taskTitle: "Оптимизировать базу данных",
    eventType: "create",
    timestamp: new Date("2023-10-20"),
    user: demoUsers[0],
  },
  {
    id: "h3",
    taskId: "task3",
    taskTitle: "Подготовить отчет за квартал",
    eventType: "create",
    timestamp: new Date("2023-09-30"),
    user: demoUsers[2],
  },
  {
    id: "h4",
    taskId: "task3",
    taskTitle: "Подготовить отчет за квартал",
    eventType: "update",
    timestamp: new Date("2023-10-05"),
    user: demoUsers[1],
    details: "Изменен статус: Текущие → Отложенные",
  },
  {
    id: "h5",
    taskId: "task4",
    taskTitle: "Обновить документацию API",
    eventType: "create",
    timestamp: new Date("2023-08-10"),
    user: demoUsers[1],
  },
  {
    id: "h6",
    taskId: "task4",
    taskTitle: "Обновить документацию API",
    eventType: "update",
    timestamp: new Date("2023-09-01"),
    user: demoUsers[0],
    details: "Изменен статус: Текущие → Выполненные",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [activeTab, setActiveTab] = useState<string>("current");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Текущий пользователь (для демонстрации)
  const currentUser = demoUsers[0];

  // Фильтрация задач по статусу и поисковому запросу
  const filteredTasks = tasks.filter((task) => {
    // Фильтрация по статусу
    if (task.status !== activeTab) return false;

    // Фильтрация по поисковому запросу
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.responsibleUser.name.toLowerCase().includes(query) ||
      new Date(task.createdAt).toLocaleDateString().includes(query)
    );
  });

  // Подсчет количества задач по статусам
  const taskCounts = {
    current: tasks.filter((task) => task.status === "current").length,
    postponed: tasks.filter((task) => task.status === "postponed").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  // Обработчик создания новой задачи
  const handleCreateTask = () => {
    setCurrentTask(null);
    setIsEditorOpen(true);
  };

  // Обработчик просмотра задачи
  const handleViewTask = (task: Task) => {
    setCurrentTask(task);
    setIsViewerOpen(true);
  };

  // Обработчик редактирования задачи
  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditorOpen(true);
  };

  // Обработчик удаления задачи
  const handleDeleteTask = (taskId: string) => {
    // Находим задачу для записи в историю
    const taskToDelete = tasks.find((t) => t.id === taskId);
    if (taskToDelete) {
      // Добавляем запись в историю
      const newHistoryEntry: HistoryEntry = {
        id: `h${history.length + 1}`,
        taskId,
        taskTitle: taskToDelete.title,
        eventType: "delete",
        timestamp: new Date(),
        user: currentUser,
      };
      setHistory([newHistoryEntry, ...history]);
    }

    // Удаляем задачу
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Обработчик изменения статуса задачи
  const handleChangeStatus = (taskId: string, newStatus: TaskStatus) => {
    // Находим задачу
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;

    // Определяем текстовое описание статуса для истории
    const getStatusText = (status: TaskStatus) => {
      switch (status) {
        case "current":
          return "Текущие";
        case "postponed":
          return "Отложенные";
        case "completed":
          return "Выполненные";
      }
    };

    // Обновляем статус задачи
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Добавляем запись в историю
    const newHistoryEntry: HistoryEntry = {
      id: `h${history.length + 1}`,
      taskId,
      taskTitle: taskToUpdate.title,
      eventType: "update",
      timestamp: new Date(),
      user: currentUser,
      details: `Изменен статус: ${getStatusText(taskToUpdate.status)} → ${getStatusText(newStatus)}`,
    };

    setHistory([newHistoryEntry, ...history]);
  };

  // Обработчик сохранения задачи
  const handleSaveTask = (task: Task) => {
    const now = new Date();

    if (task.id) {
      // Обновление существующей задачи
      const updatedTask = {
        ...task,
        updatedAt: now,
      };

      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));

      // Добавляем запись в историю
      const newHistoryEntry: HistoryEntry = {
        id: `h${history.length + 1}`,
        taskId: task.id,
        taskTitle: task.title,
        eventType: "update",
        timestamp: now,
        user: currentUser,
      };
      setHistory([newHistoryEntry, ...history]);
    } else {
      // Создание новой задачи
      const newTask = {
        ...task,
        id: `task${tasks.length + 1}`,
        createdAt: now,
        status: activeTab as TaskStatus, // Создаем в текущем разделе
        createdBy: currentUser,
      };

      setTasks([newTask, ...tasks]);

      // Добавляем запись в историю
      const newHistoryEntry: HistoryEntry = {
        id: `h${history.length + 1}`,
        taskId: newTask.id,
        taskTitle: newTask.title,
        eventType: "create",
        timestamp: now,
        user: currentUser,
      };
      setHistory([newHistoryEntry, ...history]);
    }

    setIsEditorOpen(false);
  };

  // Обработчик просмотра истории
  const handleViewHistory = () => {
    setIsHistoryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-screen-lg px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Задачи</h1>
          <div className="flex space-x-4">
            <Button onClick={handleViewHistory} variant="outline">
              <History className="mr-2 h-4 w-4" />
              История изменений
            </Button>
            {(activeTab === "current" || activeTab === "postponed") && (
              <Button onClick={handleCreateTask}>
                <Plus className="mr-2 h-4 w-4" />
                Новая задача
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger
              value="current"
              className="flex items-center justify-center"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Текущие
              {taskCounts.current > 0 && (
                <span className="ml-2 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  {taskCounts.current}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="postponed"
              className="flex items-center justify-center"
            >
              <Clock className="mr-2 h-4 w-4" />
              Отложенные
              {taskCounts.postponed > 0 && (
                <span className="ml-2 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  {taskCounts.postponed}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex items-center justify-center"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Выполненные
            </TabsTrigger>
          </TabsList>

          <TaskSearch onSearch={setSearchQuery} />

          <TabsContent value="current" className="mt-6">
            <TaskList
              tasks={filteredTasks}
              status="current"
              onView={handleViewTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onChangeStatus={handleChangeStatus}
            />
          </TabsContent>

          <TabsContent value="postponed" className="mt-6">
            <TaskList
              tasks={filteredTasks}
              status="postponed"
              onView={handleViewTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onChangeStatus={handleChangeStatus}
            />
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <TaskList
              tasks={filteredTasks}
              status="completed"
              onView={handleViewTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onChangeStatus={handleChangeStatus}
            />
          </TabsContent>
        </Tabs>

        {isEditorOpen && (
          <TaskEditor
            task={currentTask}
            users={demoUsers}
            onSave={handleSaveTask}
            onCancel={() => setIsEditorOpen(false)}
          />
        )}

        {isViewerOpen && currentTask && (
          <TaskViewer
            task={currentTask}
            onClose={() => setIsViewerOpen(false)}
            onEdit={() => {
              setIsViewerOpen(false);
              setIsEditorOpen(true);
            }}
          />
        )}

        {isHistoryOpen && (
          <TaskHistory
            history={history}
            onClose={() => setIsHistoryOpen(false)}
          />
        )}
      </main>
    </div>
  );
}
