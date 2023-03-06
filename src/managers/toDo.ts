import { inject, injectable } from 'inversify';

import { defaultPageSize, maxPageSize } from '../constants/pageOptions';
import { TYPES } from '../constants/types';
import { Manager } from '../interfaces/toDo';
import { GetToDosRequest, GetToDosResponse } from '../models/toDo';
import ToDoClient from '../services/toDo';

@injectable()
export default class ApiManager implements Manager {
  public constructor(
    @inject(TYPES.ToDoClient) private toDoClient: ToDoClient,
  ) {}

  public async fetchData(params: GetToDosRequest): Promise<GetToDosResponse> {
    const processedParams: GetToDosRequest = {};

    // if id is used, ignore pageOptions
    if (params.id) {
      processedParams['id'] = params.id;
    } else {
      processedParams['pageSize'] = this.getPageSize(params.pageSize);
      processedParams['pageToken'] = params.pageToken;
    }

    processedParams['userId'] = params.userId;
    processedParams['filterByCompleted'] = params.filterByCompleted;

    return this.toDoClient.fetchData(processedParams);
  }

  private getPageSize(pageSize?: number): number {
    return !pageSize || pageSize <= 0 || pageSize > maxPageSize
      ? defaultPageSize
      : pageSize;
  }
}
