import { GetToDosRequest, GetToDosResponse } from '../models/toDo';

export interface Manager {
  fetchData(params: GetToDosRequest): Promise<GetToDosResponse>;
}

export interface Service {
  fetchData(params: GetToDosRequest): Promise<GetToDosResponse>;
}
