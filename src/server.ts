import express, { Application, Express } from 'express';
import * as bodyparser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan'
import connectTimeout from 'connect-timeout'
import { config } from 'dotenv';
import employeeRouter from './routes/employee.routes';
import articleRouter from './routes/article.routes';
import { connect, connection, ConnectOptions } from 'mongoose';
config();



class Server{
    app: express.Express;

    constructor(){
        this.app = express();
        this.app.use(bodyparser.json({ limit: "50mb" }));
        this.app.use(bodyparser.urlencoded({ extended: true, limit: "50mb", parameterLimit: 100000000 }));
        this.app.use(bodyparser.text());
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(connectTimeout("360s"));
    }

    configureRoutes():void{
        this.app.use('/api/v1',[employeeRouter])
        this.app.use('/api/v1',[articleRouter])
    }

    databaseStatus(): void {
        if (connection.readyState === 2) {
          console.log("Connecting to database");
          setTimeout(() => {
            this.databaseStatus();
          }, 1000);
        }
      }

    async connectDatabase(connectionUrl: string, tries: number = 0): Promise<any> {
        const tryCount = 4;
        return new Promise((resolve: any, reject) => {
          if (connection.readyState === 0 && tries < tryCount) {
            connect(connectionUrl, {  autoIndex: true } as ConnectOptions)
              .then(() => resolve("Database connected"))
              .catch((error: any) => {
                if (tries < tryCount - 1) {
                  console.log("Reconnecting database due to error", error.message);
                  resolve(this.connectDatabase(connectionUrl, tries + 1));
                }
              });
          } else {
            reject("Database connection problem!!!");
          }
    
          if (tries < 1) {
            this.databaseStatus();
          }
        });
      }

    async start():Promise<Express>{
        const url:string = process.env.MONGO_CONNECTION_URL || ""
        this.configureRoutes();
        return this.connectDatabase(url).then((data: any) => {
            console.log(data);
            return this.app;
          });
    }

}



export default new Server();