import { faker } from "@faker-js/faker";
import { type Book } from "@/types";

export const generateFakeBooks = (count = 1000): Book[] => {
  const books: Book[] = [];

  faker.seed(25);

  for (let i = 0; i < count; i++) {
    books.push({
      name: faker.lorem.words(3),
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      format: faker.helpers.arrayElement([
        "Hardcover",
        "Paperback",
        "eBook",
        "Audiobook",
      ]),
      genre: faker.helpers.arrayElement([
        "Fiction",
        "Non-fiction",
        "Mystery",
        "Fantasy",
        "Romance",
        "Science Fiction",
        "Biography",
        "History",
        "Horror",
      ]),
      price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
      published_date: faker.date.past({ years: 20 }),
      publisher: faker.company.name(),
      rating: faker.number.int({ min: 1, max: 5 }),
    });
  }

  return books;
};
