import bodyParser from 'body-parser';
import express from 'express';
import { createServer } from 'http';
import { Container, injectable } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import net from 'net';

@injectable()
export default class Server {
  private server!: net.Server;

  get apiServer() {
    return this.server;
  }

  public build(container: Container) {
    const app = express();

    const inversifyServer = new InversifyExpressServer(
      container,
      null,
      null,
      app,
    );
    inversifyServer.setConfig((expressApp: express.Application) => {
      expressApp.use(bodyParser.urlencoded({ extended: true }));
      expressApp.use(bodyParser.json());
    });

    this.server = createServer(inversifyServer.build());
  }

  public listen(port: number) {
    // add the error events and listen(start) server
    this.server.on('error', (err: Error) => {
      return err;
    });
    this.server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  }
}
