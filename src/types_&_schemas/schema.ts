import { bookFormats, bookGenres } from "./index";
import { z } from "zod";

export const BookFormatSchema = z.enum(bookFormats);

export const BookGenreSchema = z.enum(bookGenres);

export const BookSchema = z.object({
  name: z.string(),
  author: z.string(),
  format: BookFormatSchema,
  genre: BookGenreSchema,
  price: z.number(),
  published_date: z.date(),
  publisher: z.string(),
  rating: z.number().min(1).max(5).optional(),
});

// Optional: inferred TypeScript type
export type BookFields = z.infer<typeof BookSchema>;
