"use client";

import { host } from "@/api/host";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).then((res) => res.json());
};

export default function TasksPage() {
  const [page] = useState<number>(1);
  const { data, isLoading } = useSWR(
    `${host}/api/v1/task/show?p=${page}`,
    fetcher,
    { refreshInterval: 10000 },
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    if (data) {
      setTasks(data.tasks);
    }
  }, [data]);

  async function HandleDelete(id: string) {
    const res = await fetch(`${host}/api/v1/task/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("Успешно удаленос");
    }
  }
  if (isLoading) {
    return <div>Загрузка</div>;
  }
  return (
    <div>
      <div className="text-center mt-8">
        <h1 className="text-2xl font-bold">Задачи</h1>
        <p className="text-muted-foreground">
          Здесь вы можете управлять своими задачами.
        </p>
      </div>
      <div className="my-10"></div>
      <div className="grid grid-cols-3 mx-auto w-fit space-x-24 space-y-16">
        {tasks.map((e) => (
          <div
            key={e.ID}
            className={`bg-white w-[400px] h-[550px] border-[1px] rounded-xl shadow-md ${e.Priority === "HIGH" ? "border-red-400" : "border-yellow-300"}
              ${e.Priority === "LOW" && "border-green-300"}
            }

`}
          >
            <p className="text-center text-2xl">{e.Title}</p>
            <p>{e.Content}</p>
            <button
              onClick={() => {
                HandleDelete(e.ID);
              }}
            >
              Удалить
            </button>
            <div>
              <p>{e.Status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
