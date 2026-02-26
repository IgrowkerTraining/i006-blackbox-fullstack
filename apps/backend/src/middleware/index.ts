import cors from "cors";
import bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";

const setupMiddleware = (app: any) => {
  app.use(cors());
  app.use(bodyParser.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
};

export { setupMiddleware };

