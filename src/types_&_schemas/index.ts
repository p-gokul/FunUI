export const bookFormats = [
  "Hardcover",
  "Paperback",
  "eBook",
  "Audiobook",
] as const;
export type BookFormat = (typeof bookFormats)[number];

export const bookGenres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Science Fiction",
  "Biography",
  "History",
  "Horror",
] as const;

export type BookGenre = (typeof bookGenres)[number];
export interface Book {
  title: string;
  author: string;
  format: BookFormat;
  genre: BookGenre;
  price: number;
  published_date: Date;
  publisher: string;
  rating: number;
}
