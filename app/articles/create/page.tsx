"use client";
import { useState } from "react";
export default function CreateArticle() {
  const [, setTitle] = useState<string>("");
  const [, setDesc] = useState<string>("");

  // const fetcher = (url: string) => {
  //   const token = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("token="))
  //     ?.split("=")[1];
  //
  //   return fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //   }).then((res) => res.json());
  // };
  return (
    <div className="flex flex-col gap-x-10 border-2 border-gray-300 color-white w-[500px] h-[300px] justify-around px-20 rounded-2xl mx-auto mt-90">
      <input
        type="text"
        className="bg-white"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea onChange={(e) => setDesc(e.target.value)} />
      <button>Создать</button>
    </div>
  );
}
