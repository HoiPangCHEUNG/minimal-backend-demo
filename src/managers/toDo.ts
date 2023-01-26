// import e from 'express';
import { inject, injectable } from 'inversify';

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
    const updatedParams: GetToDosRequest = {};

    if (params.id) {
      updatedParams['id'] = params.id;
    } else {
      updatedParams['userId'] = params.userId;
      updatedParams['pageSize'] = params.pageSize;
      updatedParams['pageToken'] = params.pageToken;
    }

    updatedParams['filterByCompleted'] = params.filterByCompleted;

    return this.toDoClient.fetchData(updatedParams);
  }
}
