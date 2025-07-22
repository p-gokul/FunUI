import { bookFormats, bookGenres } from "./index";
import { z } from "zod";

export const BookFormatSchema = z.enum(bookFormats, {
  error: () => ({ message: "Please select a book format." }),
});

export const BookGenreSchema = z.enum(bookGenres, {
  error: () => ({ message: "Please select a book genre." }),
});

export const BookSchema = z.object({
  title: z.string("Please insert title."),
  author: z.string("Please insert author name."),
  format: BookFormatSchema,
  genre: BookGenreSchema,
  price: z
    .number("Please insert number")
    .positive("Please insert positive number."),
  published_date: z.date("Please select a date."),
  publisher: z.string("Please insert publisher name."),
  rating: z.number().min(1).max(5).optional(),
});

// Optional: inferred TypeScript type
export type BookFields = z.infer<typeof BookSchema>;
