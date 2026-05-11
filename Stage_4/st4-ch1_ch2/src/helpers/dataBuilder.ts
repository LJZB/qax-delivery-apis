import { faker } from '@faker-js/faker';
import { CollectionRequest } from '../types/modelos';

export function buildCollectionPayload(): CollectionRequest {
  return {
    name: `${faker.company.name()} Laptop`,
    data: {
      year: faker.date.past({ years: 3 }).getFullYear(),
      price: faker.number.int({ min: 500, max: 3000 }),
      cpuModel: faker.helpers.arrayElement([
        'Intel Core i5',
        'Intel Core i7',
        'AMD Ryzen 5',
        'AMD Ryzen 7',
      ]),
      hardDiskSize: faker.helpers.arrayElement(['256 GB', '512 GB', '1 TB']),
      color: faker.color.human(),
    },
  };
}
