"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setPasswordError("");

    const formData = new FormData(event.currentTarget);
    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    try {
      // Здесь обычно выполняется API-запрос для регистрации пользователя
      // Например:
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ fullName, username, password }),
      // })

      // if (!response.ok) throw new Error('Registration failed')

      // Имитация успешной регистрации
      console.log("Регистрация пользователя:", {
        fullName,
        username,
        password,
      });

      // Перенаправление на страницу входа после успешной регистрации
      router.push("/login");
    } catch (err) {
      setError("Ошибка при регистрации. Пожалуйста, попробуйте снова.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Регистрация</CardTitle>
        <CardDescription>Создайте новую учетную запись</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Введите ваше полное имя"
                    required
                    disabled={isLoading}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Введите ваше полное имя</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Логин</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Введите логин"
                    required
                    disabled={isLoading}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Введите желаемый логин</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    required
                    disabled={isLoading}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Введите надежный пароль</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Повторите пароль</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    required
                    disabled={isLoading}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Повторите пароль для подтверждения</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Button variant="link" className="p-0" asChild>
            <Link href="/login">Войти</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
