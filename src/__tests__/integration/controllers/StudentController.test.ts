import request, {SuperTest, Test } from 'supertest';
import { app, server } from '../../../../src/app';

describe('StudentController', () => {
  let baseRequest: SuperTest<Test>;
  //* Antes de cada una de las pruebas, configuramos la instancia de SuperTest
  beforeAll(() => {
    const address = server.address();
    //* address tambien es un objeto
    if(!address || typeof address === 'string') {
      throw new Error('Server is not running on an address with a port');
    }
    const port = address.port; //* Ahora que sabemos que address no es nulo y ademas que efectivamente es Objecto obtenemos el puerto.
    baseRequest = request(`http://localhost:${port}`);
  });

  //* Después de todas las pruebas, cerramos el servidor
  afterAll(done => {
    server.close(done);
  });

  //* Prueba para el endpoint GET /students
  describe('GET /students', () => {
    it('should return a list of students', async () => {
      const response = await baseRequest.get('/students');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array); //* 10 students
    });
  });

  //* Pruebas para el endpoint GET /students/:id
  describe('GET /students/:id', () => {

    it('should return a student by id', async () => {
      const testId = 1;
      const response = await baseRequest.get(`/students/${testId}`);
      expect(response.statusCode).toBe(200);
    });

    it('should return 404 for a non-existent student', async () => {
      const testId = 99999;
      const response = await baseRequest.get(`/students/${testId}`);
      expect(response.statusCode).toBe(404);
    });
  });

});