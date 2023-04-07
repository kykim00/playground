import { faker } from '@faker-js/faker';

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  subRows?: Person[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): any => {
  return {
    account: faker.finance.account(),
    date: faker.date.past().toString(),
    shop: faker.finance.accountName(),
    amount: faker.finance.amount(),
    department: faker.commerce.department(),
    reason: faker.commerce.product(),
    status: faker.helpers.shuffle(['결재중', '완료', ''])[0]!,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(200);

export async function fetchData(options: { pageIndex: number; pageSize: number }) {
  // Simulate some network latency
  await new Promise(r => setTimeout(r, 500));

  return {
    rows: data.slice(options.pageIndex * options.pageSize, (options.pageIndex + 1) * options.pageSize),
    pageCount: Math.ceil(data.length / options.pageSize),
  };
}
