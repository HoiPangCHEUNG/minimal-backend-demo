import axios from 'axios';
import { Container } from 'inversify';
import 'reflect-metadata';

import { appConfig } from '../../config';
import { TYPES } from '../../constants/types';
import '../../controllers/toDo';
import ApiManager from '../../managers/toDo';
import { AppConfig } from '../../models/config';
import Server from '../../server';
import ToDoClient from '../../services/toDo';

const container = new Container();

function initLib() {
  axios.defaults.headers.get['Content-Type'] = 'application/json';
  axios.defaults.timeout = appConfig.timeout;
}

function initContainer() {
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

  // server
  container.bind<Server>(TYPES.Server).to(Server).inSingletonScope();
}

function initServer() {
  const apiInstance = container.get<Server>(TYPES.Server);
  apiInstance.build(container);
  apiInstance.listen(appConfig.serverPort);
}

const init = async () => {
  try {
    initLib();
    initContainer();
    initServer();
  } catch (e) {
    console.log(`failed to init: ${e}`);
  }
};

init();
