import { describe, expect, test } from '@jest/globals';

import { maxPageSize } from '../constants/pageOptions';
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

  test('Fetch Data with id', async () => {
    expect(
      await toDoClient.fetchData({
        id: 50,
      }),
    ).toStrictEqual(resultWithPostId);
  });

  test('Fetch Data with pageToken, pageSize, and filterByCompleted', async () => {
    expect(
      await toDoClient.fetchData({
        pageSize: 2,
        pageToken: 10,
        filterByCompleted: true,
      }),
    ).toStrictEqual(resultWithPageAndCompleteOptions);
  });

  test('Fetch Data with pageToken and pageSize', async () => {
    expect(
      await toDoClient.fetchData({ pageSize: 3, pageToken: 10 }),
    ).toStrictEqual(resultWithPageOptions);
  });

  test('Fetch Data with pageSize only', async () => {
    expect(await toDoClient.fetchData({ pageSize: 1 })).toStrictEqual(
      resultWithPageSize,
    );
  });

  test('Fetch Data ', async () => {
    expect(await toDoClient.fetchData({})).toHaveLength(maxPageSize);
  });
});
