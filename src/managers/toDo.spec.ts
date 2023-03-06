import { Container } from 'inversify';

import { appConfig } from '../config';
import { defaultPageSize, maxPageSize } from '../constants/pageOptions';
import { TYPES } from '../constants/types';
import {
  resultWithAllOptions,
  resultWithPageAndCompleteOptions,
  resultWithPageOptions,
  resultWithPageSize,
} from '../mock/toDo';
import { AppConfig } from '../models/config';
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

  it('Call the ToDoClient and fetch data with id (all page params will be ignored)', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({
        id: 100,
        pageSize: 2,
        pageToken: 10,
        filterByCompleted: false,
        userId: 5,
      }),
    ).toStrictEqual(resultWithAllOptions);
  });

  it('Call the ToDoClient and fetch data with pageToken, pageSize, and filterByCompleted', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({
        pageSize: 2,
        pageToken: 10,
        filterByCompleted: true,
      }),
    ).toStrictEqual(resultWithPageAndCompleteOptions);
  });

  it('Call the ToDoClient and fetch data with very large pageSize', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({
        pageSize: 300,
      }),
    ).toHaveLength(defaultPageSize);
  });

  it('Call the ToDoClient and fetch data with negative pageSize', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({
        pageSize: -10,
      }),
    ).toHaveLength(defaultPageSize);
  });

  it('Call the ToDoClient and fetch data with maxPageSize', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({
        pageSize: maxPageSize,
      }),
    ).toHaveLength(maxPageSize);
  });

  it('Call the ToDoClient and fetch data with pageToken and pageSize', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(
      await apiManager.fetchData({ pageSize: 3, pageToken: 10 }),
    ).toStrictEqual(resultWithPageOptions);
  });

  it('Call the ToDoClient and fetch data with pageSize only', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(await apiManager.fetchData({ pageSize: 1 })).toStrictEqual(
      resultWithPageSize,
    );
  });

  it('Call the ToDoClient and fetch data', async () => {
    const apiManager = container.get<ApiManager>(TYPES.ApiManager);
    expect(await apiManager.fetchData({})).toHaveLength(defaultPageSize);
  });
});
