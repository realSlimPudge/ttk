import { z } from "zod";

export const registrationSchema = z
  .object({
    fullName: z
      .string({ required_error: "ФИО обязательно" })
      .regex(/^[А-ЯЁа-яё\s]+$/, "ФИО должно содержать только кириллицу"),
    username: z
      .string({ required_error: "Логин обязателен" })
      .regex(/^[A-Za-z]+$/, "Логин должен содержать только латинские буквы"),
    password: z
      .string({ required_error: "Пароль обязателен" })
      .regex(
        /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
        "Пароль должен содержать только латинские буквы, цифры и допустимые символы",
      ),
    confirmPassword: z.string({
      required_error: "Подтверждение пароля обязательно",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
