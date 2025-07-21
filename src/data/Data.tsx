import { faker } from "@faker-js/faker";
import { type Book, bookFormats, bookGenres } from "@/types_&_schemas";

export const generateFakeBooks = (count = 1000): Book[] => {
  const books: Book[] = [];

  faker.seed(8);

  for (let i = 0; i < count; i++) {
    books.push({
      name: faker.lorem.words(3),
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      format: faker.helpers.arrayElement(bookFormats),
      genre: faker.helpers.arrayElement(bookGenres),
      price: Number(
        faker.number.int({ min: 1000, max: 9000, multipleOf: 100 })
      ),
      published_date: faker.date.past({ years: 20 }),
      publisher: faker.company.name(),
      rating: faker.number.int({ min: 1, max: 5 }),
    });
  }

  return books;
};
