import axios from 'axios';
import { inject, injectable } from 'inversify';

import { TYPES } from '../constants/types';
import { Service } from '../interfaces/toDo';
import { AppConfig } from '../models/config';
import { GetToDosRequest, GetToDosResponse } from '../models/toDo';

@injectable()
export default class ToDoClient implements Service {
  public constructor(@inject(TYPES.AppConfig) private appConfig: AppConfig) {}

  public async fetchData(params: GetToDosRequest): Promise<GetToDosResponse> {
    try {
      const response = await axios.get<GetToDosResponse>(
        `${this.appConfig.fakeAPIEndpoint}/todos`,
        {
          params: {
            _start: params.pageToken,
            _limit: params.pageSize,
            id: params.id,
            userId: params.userId,
            completed: params.filterByCompleted,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error(`${response.status} : ${response.statusText}`);
      }

      return response.data;
    } catch (e) {
      console.log(`failed to fetch data in service layer: ${e}`);
      return [];
    }
  }
}
