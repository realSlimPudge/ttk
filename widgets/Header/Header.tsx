"use client";

import { motion } from "framer-motion";
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
    <motion.header
      className="w-full border-b bg-background sticky top-0 z-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto max-w-screen-lg px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Название сайта */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Organizer
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
              <Link
                href="/login"
                className="bg-gray-950 flex justify-center items-center text-gray-50 px-3 py-2 rounded-xl"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Войти
              </Link>
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
    </motion.header>
  );
}
