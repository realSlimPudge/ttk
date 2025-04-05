"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogIn, Menu, X } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Функция для определения активной ссылки
  const isActive = (path: string) => pathname === path;

  // Функция для демонстрации входа/выхода
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Навигационные ссылки
  const navLinks = [
    { name: "Главная", href: "/" },
    { name: "Статьи", href: "/articles" },
    { name: "Задачи", href: "/tasks" },
  ];

  return (
    <header className="w-full border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto max-w-screen-lg px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Название сайта */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              WebOrganizer
            </Link>
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Кнопки входа/профиля для десктопа */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Профиль</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Мой профиль</DropdownMenuItem>
                  <DropdownMenuItem>Настройки</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleLogin}>
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={toggleLogin} variant="default" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Войти
              </Button>
            )}
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Меню"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Мобильная навигация */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="block text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Мой профиль
                  </Link>
                  <Link
                    href="/settings"
                    className="block text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Настройки
                  </Link>
                  <Button
                    onClick={() => {
                      toggleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    toggleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="default"
                  size="sm"
                  className="w-full"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Войти
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
