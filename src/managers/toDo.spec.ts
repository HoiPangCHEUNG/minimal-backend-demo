import { Container } from 'inversify';

import { appConfig } from '../config';
import { TYPES } from '../constants/types';
import { AppConfig } from '../interfaces/config';
import {
  resultWithPageAndCompleteOptions,
  resultWithPageOptions,
  resultWithPageSize,
  resultWithPostId,
} from '../mock/toDo';
import ToDoClient from '../services/toDo';
import ApiManager from './toDo';

describe('ApiManger', () => {
  let container: Container;
  beforeAll(() => {
    container = new Container();
    // config
    container.bind<AppConfig>(TYPES.AppConfig).toConstantValue(appConfig);

    // managers
    container
      .bind<ApiManager>(TYPES.ApiManager)
      .to(ApiManager)
      .inSingletonScope();

    // services
    container
      .bind<ToDoClient>(TYPES.ToDoClient)
      .to(ToDoClient)
      .inSingletonScope();
  });

  afterAll(() => {
    container.unbindAll();
  });

  it('call the ToDoClient and fetch data with postId (all other params will be ignored)', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({
        id: 50,
        pageSize: 2,
        pageToken: 10,
        filterByCompleted: true,
      }),
    ).toStrictEqual(resultWithPostId);
  });

  it('call the ToDoClient and fetch data with pageToken, pageSize, and filterByCompleted', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({
        pageSize: 2,
        pageToken: 10,
        filterByCompleted: true,
      }),
    ).toStrictEqual(resultWithPageAndCompleteOptions);
  });

  it('call the ToDoClient and fetch data with pageToken and pageSize', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({ pageSize: 3, pageToken: 10 }),
    ).toStrictEqual(resultWithPageOptions);
  });

  it('call the ToDoClient and fetch data with pageSize only', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(await apiManager.fetchData({ pageSize: 1 })).toStrictEqual(
      resultWithPageSize,
    );
  });

  it('call the ToDoClient and fetch data', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(await apiManager.fetchData({})).toHaveLength(200);
  });
});
