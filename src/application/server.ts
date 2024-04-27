import express from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import cors from 'cors';
import { apiRouter } from '../route/api';

export const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(publicRouter);
server.use(apiRouter);
server.use(errorMiddleware);




