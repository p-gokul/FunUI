export type BookFormat = "Hardcover" | "Paperback" | "eBook" | "Audiobook";

export type BookGenre =
  | "Fiction"
  | "Non-fiction"
  | "Mystery"
  | "Fantasy"
  | "Romance"
  | "Science Fiction"
  | "Biography"
  | "History"
  | "Horror";
export interface Book {
  name: string;
  author: string;
  format: BookFormat;
  genre: BookGenre;
  price: number;
  published_date: Date;
  publisher: string;
  rating: number;
}
