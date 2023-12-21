import express, { Express } from 'express';
import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';

//* Importaciones del contenedor de inyeccion de dependencias
import config from './config';
import { MysqlConnection } from './database/MysqlConnection';
import { MysqlStudentRepository } from './repositories/MysqlStudentRepository';
import { StudentService } from './services/StudentService';
import { StudentController } from './controllers/StudentController';

const app: Express = express();

//* Crear el contenedor

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  dbConfig: asValue(config.dbConfig),
  dbConnection: asClass(MysqlConnection).singleton(),
  studentRepository: asClass(MysqlStudentRepository).scoped(),
  studentService: asClass(StudentService).scoped(),
  studentController: asClass(StudentController).scoped(),
});

app.use(scopePerRequest(container));
app.use(express.json()); //* POST enviar del tipo
//* Vamos al controlador
app.use('/students', (req, res, next) => {

  container.resolve('studentController').router(req, res, next);

});
const PORT = process.env.NODE_ENV === 'test' ? 0 : (process.env.PORT || 3000);

const server = app.listen(PORT, () => {
  console.log(`Server esta corriendo en: http://localhost:${PORT}`); //* http://localhost:3000
})
// export default app;
export { app, server };