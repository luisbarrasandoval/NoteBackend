import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware';
import notesRouter from './routes/notes.route';
import authenticationRouter from './routes/authentication.route';
import sessionsRouter from './routes/sessions.route';

import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from '../swagger';
mongoose.set('debug', true);


class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.connectDB();
    this.initMiddleware();
    this.initControllers();
    this.initErrorHandlig();
  }

  private initMiddleware() {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    // this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
 
  }

  private initControllers() {
    this.app.use(notesRouter);
    this.app.use(authenticationRouter);
    this.app.use(sessionsRouter);
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerJsdoc(options), {
        explorer: true,
        swaggerOptions: { docExpansion: 'none' }
      })
    );
    this.app.use('/api-doc.json', swaggerJSDoc)
  }

  private initErrorHandlig() {
    this.app.use(errorMiddleware);
  }

  private async connectDB() {
    // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    try {
      //      await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
      await mongoose.connect(`mongodb://localhost/notes`);
      console.log('Conextado con MONGODB');
    } catch (e) {
      console.error(e);
    }
  }

  public listen() {
    this.app.listen(5000, () => {
      console.log('App escuchando en el puerto 5000');
    });
  }
}

export default App;
