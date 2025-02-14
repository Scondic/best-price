import { z } from "zod";

import { State } from "../../core/buttons-state";
import { AdvertisementType } from "../../core/buttons-advertisement-type";
import { Place } from "../../core/select-place";
import { Communication } from "../../core/select-communication";

export const AdvertisementDto = z.object({
  title: z.string().min(1, "Название объявления не должно быть пустым").regex(/[a-zA-Zа-яА-Я]/, "Название должно содержать буквы").refine((value) => !/^\w+$/.test(value), "Название не должно состоять только из цифр или артикула"),

  state: z.enum([State.NEW, State.USED], {
    errorMap: () => ({ message: "Выберите один из предложенных вариантов" }),
  }),

  advertisementType: z.enum([AdvertisementType.YOURSELF, AdvertisementType.RESALE], {
    errorMap: () => ({ message: "Выберите один из предложенных вариантов" }),
  }),

  description: z.string().min(1, "Описание объявления не должно быть пустым"),

  price: z.number({ message: "Цена должна содержать только цифры" }).min(1, 'Цена должна быть положительным числом'),

  photos: z.array(
    z.object({
      file: z.instanceof(File).refine((file) =>
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
        { message: "Добавить можно только PNG, JPEG, и JPG файлы" }
      )
    })
  ).max(10, { message: "Максимум 10 фотографий" }),

  video: z.string().url().regex(/^http.*[/.]/, "Некорректная ссылка на видео").or(z.literal('')),

  place: z.enum([Place.MOSCOW, Place.SAINT_PETERSBURG, Place.YEKATERINBURG, Place.KAZAN, Place.KRASNODAR], {
    errorMap: () => ({ message: "Выберите город из списка" }),
  }),

  phone: z.string().min(1, 'Вы не указали номер телефона').regex(/^(\+?7|8)?9\d{9}$/, 'Некорректный номер телефона'),

  communication: z.enum([Communication.CALL_AND_MESSAGES, Communication.TELEGRAM], {
    errorMap: () => ({ message: "Выберите город из списка" }),
  }),
});

export type AdvertisementDtoType = z.infer<typeof AdvertisementDto>
