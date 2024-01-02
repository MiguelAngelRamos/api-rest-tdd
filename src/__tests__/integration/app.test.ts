import { Express } from 'express';
import request from 'supertest';
//* Necesito un archivo de configuracion de las variables necesarias para la conexion hacia la base de datos
import config from '../../config';


import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { MysqlConnection } from '../../database/MysqlConnection';
import { MysqlStudentRepository } from '../../repositories/MysqlStudentRepository';
import { StudentService } from '../../services/StudentService';
import { StudentController } from '../../controllers/StudentController';
import { scopePerRequest } from 'awilix-express';
import { app, server } from '../../app';


describe('App', () => {
 let container;
  //* Antes de las pruebas, configura el contenedor de inyeccion de dependencias
 beforeAll(() => {
  
  container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.register({
    dbConfig: asValue(config.dbConfig),
    dbConnection: asClass(MysqlConnection).singleton(),
    studentRepository: asClass(MysqlStudentRepository).scoped(),
    studentService: asClass(StudentService).scoped(),
    studentController: asClass(StudentController).scoped(),
  });

  //* scopePerRequest es un middleware se utiliza para garantizar que las dependencias registradas se cree y se compartan en el alcance de una solicitud de Exprees. "UNA SOLA SOLICITUD"
  app.use(scopePerRequest(container));
 });

 // Despues de las pruebas cerramos el servidor
 afterAll((done) =>{
  server.close(done);
 });

 //* generar el test unitario
 it('Deberia responder con un codigo 200 para /students', async () => {
  const response = await request(app).get('/students');
  expect(response.status).toBe(200);
 });

 it('DeberÍa permitir solicitudes de un origin permitido', async()=> {
     const response = await request(app).get('/students').set('Origin', 'http://localhost:4200');
     expect(response.headers['access-control-allow-origin']).toBe('http://localhost:4200');
 })

});


// describe('Pruebas de integración para app.ts', () => {

//   let expressApp: Express;

//   beforeAll(() => {
//     expressApp = app;
//   });

//   it('deberia responder a la ruta raiz', async () => {
//     const response = await request(expressApp).get('/');

//     //* Verificar que el código de estado HTTP de la respuesta hacia el path "/" sea 200 (OK).
//     expect(response.statusCode).toBe(200);

//     expect(response.text).toContain('Bienvenido a mi API');

//   });
// });
