import { describe, expect, test } from '@jest/globals';

import {
  resultWithPageAndCompleteOptions,
  resultWithPageOptions,
  resultWithPageSize,
  resultWithPostId,
} from '../mock/toDo';
import ToDoClient from './toDo';

describe('ToDoClient', () => {
  const appConfig = {
    fakeAPIEndpoint: 'https://jsonplaceholder.typicode.com',
    serverPort: 3000,
    timeout: 100000,
  };

  const toDoClient = new ToDoClient(appConfig);

  test('Fetch todo Data with postId', async () => {
    expect(
      await toDoClient.fetchData({
        id: 50,
      }),
    ).toStrictEqual(resultWithPostId);
  });

  test('Fetch todo Data with pageToken, pageSize, and filterByCompleted', async () => {
    expect(
      await toDoClient.fetchData({
        pageSize: 2,
        pageToken: 10,
        filterByCompleted: true,
      }),
    ).toStrictEqual(resultWithPageAndCompleteOptions);
  });

  test('Fetch todo Data with pageToken and pageSize', async () => {
    expect(
      await toDoClient.fetchData({ pageSize: 3, pageToken: 10 }),
    ).toStrictEqual(resultWithPageOptions);
  });

  test('Fetch todo Data with pageSize only', async () => {
    expect(await toDoClient.fetchData({ pageSize: 1 })).toStrictEqual(
      resultWithPageSize,
    );
  });

  test('Fetch todo Data ', async () => {
    expect(await toDoClient.fetchData({})).toHaveLength(200);
  });
});
