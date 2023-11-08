import Server from "./server";
import { Application, Express } from "express";
import http from 'http';
import util from 'util'
import { exec } from "child_process";

const execute = util.promisify(exec);


declare global {
    namespace Express {
      // tslint:disable-next-line: interface-name
      interface Response {
        sseSetup: any;
        sseSend: any;
      }
    }
  }

class App{
    private server: http.Server;
    express: Express | null = null;

    constructor(){
        this.server=http.createServer();
    }

    start(app:Express):void{
        this.express = app;
        try{
            const port = this.normalizePort(process.env.PORT || 3333);
            const server = http.createServer(app);

        server.listen(port, () => {
        this.onListen(port);
        })
        .on("error", this.restart(app, port));
        }
        catch(error){
            console.log("Start() error...")
        }

    }

    restart(app: Express, port: number): (error: any) => Promise<void> {
        return async (error: any) => {
          this.server.close();
          console.log("Server Error:", error);
          const { stdout } = await execute(`netstat -ano | findstr :${process.env.PORT || 3333}`);
          const portUsed = stdout
            .replace(/\r?\n|\r/g, "")
            .split(" ")
            .filter(Boolean)
            .slice(-1)[0];
          console.log(`PORT ${port} on ${portUsed} is already in use!!!`);
          await execute(`taskkill /PID ${portUsed} /F`);
          this.start(app);
        };
      }

    normalizePort(val: any): number {
        const port = parseInt(val, 10);
        return isNaN(port) ? val : port;
      }

    onListen(port: any): void {
        console.log(`Listening on port ${port}`);
    }
}

const app = new App()

try {
    Server
      .start()
      .then((express: Express) => {
        app.start(express);
      })
      .catch((error: any) => {
        console.log(error);
      });
  } catch (error) {
    app.restart(app.express as Express, app.normalizePort(process.env.PORT || 3333));
    console.error("There was an uncaught error on the server:", error);
  }
  
  process.on("unhandledRejection", (error: any) => {
    console.error("There was an uncaught error on the server:", error);
  });

