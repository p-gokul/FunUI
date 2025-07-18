import { z } from "zod";

export const BookFormatSchema = z.union([
  z.literal("Hardcover"),
  z.literal("Paperback"),
  z.literal("eBook"),
  z.literal("Audiobook"),
]);

export const BookGenreSchema = z.union([
  z.literal("Fiction"),
  z.literal("Non-fiction"),
  z.literal("Mystery"),
  z.literal("Fantasy"),
  z.literal("Romance"),
  z.literal("Science Fiction"),
  z.literal("Biography"),
  z.literal("History"),
  z.literal("Horror"),
]);

export const BookSchema = z.object({
  name: z.string(),
  author: z.string(),
  format: BookFormatSchema,
  genre: BookGenreSchema,
  price: z.number(),
  published_date: z.preprocess(
    (val) =>
      typeof val === "string" || val instanceof Date ? new Date(val) : val,
    z.date()
  ),
  publisher: z.string(),
  rating: z.number().min(1).max(5),
});

// Optional: inferred TypeScript type
export type BookFields = z.infer<typeof BookSchema>;
