import { MysqlConnection } from "../../../database/MysqlConnection";
import { IStudent } from '../../../../src/interfaces/IStudent';
//* La clase que necesitamos en base a este test
import { MysqlStudentRepository } from "../../../../src/repositories/MysqlStudentRepository";

interface MockMysqlConnection {
  getConnection: jest.Mock;
}
describe('MysqlStudentRepository', () => {

  let repository: MysqlStudentRepository;
  let mockConnection: MockMysqlConnection;

  beforeEach(() => {
    //* Define el mock con todos los método necesarios
    mockConnection = {
      getConnection: jest.fn().mockReturnValue({
        execute: jest.fn(),
        release: jest.fn()
      })
    }
    repository = new MysqlStudentRepository(mockConnection as unknown as MysqlConnection);
  });

  describe('findAll', () => {
    it('debería retornar a todos los estudiantes', async () => {
      const mockStudents: IStudent[] = [
        {id: 1, name: 'Juan', age: 20}, 
        {id: 2, name: 'Catalina', age: 27} 
      ];
      mockConnection.getConnection().execute.mockResolvedValue([mockStudents]); //* select * from "nombretabla"
      const students = await repository.findAll();
      expect(students).toEqual(mockStudents);
    });
  });

  describe('findById', () => {
    it('debería retornar a un estudiante por Id', async () => {
      const mockStudent: IStudent = {id: 1, name: 'Catalina', age: 27};
      mockConnection.getConnection().execute.mockResolvedValue([[mockStudent]]);
      const student = await repository.findById(1);
      expect(student).toEqual(mockStudent);
    });
  });
});

//* findAll(), findById(), create(), update(), delete()
//* nest.js

//* execute se utiliza para ejecutar consultas SQL, 
//* y release se utiliza para liberar la conexión 