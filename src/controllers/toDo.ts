import { Joi, celebrate } from 'celebrate';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  queryParam,
} from 'inversify-express-utils';

import { defaultPageSize, maxPageSize } from '../constants/pageOptions';
import { TYPES } from '../constants/types';
import ApiManager from '../managers/toDo';

@controller('/todos')
export class ToDoController extends BaseHttpController {
  @inject(TYPES.ApiManager) private apiManager: ApiManager;

  @httpGet(
    '',
    celebrate({
      query: Joi.object().keys({
        id: Joi.number().integer(),
        userId: Joi.number().integer(),
        filterByCompleted: Joi.boolean(),
        pageSize: Joi.number()
          .integer()
          .default(defaultPageSize)
          .max(maxPageSize),
        pageToken: Joi.number().integer(),
      }),
    }),
  )
  public async fetchData(
    @queryParam('id') id: number,
    @queryParam('userId') userId: number,
    @queryParam('filterByCompleted') filterByCompleted: boolean,
    @queryParam('pageSize') pageSize: number,
    @queryParam('pageToken') pageToken: number,
  ) {
    try {
      console.log(`Todos request received.`);

      return await this.apiManager.fetchData({
        id,
        userId,
        filterByCompleted,
        pageSize,
        pageToken,
      });
    } catch (e) {
      console.log(`failed to fetch toDo data: ${e}`);
      // to-do: type errors for better handling
      throw e;
    }
  }
}
