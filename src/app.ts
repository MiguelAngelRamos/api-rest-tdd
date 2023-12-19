import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Bienvenido a mi API');
});


export default app;