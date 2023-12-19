import { StudentService } from "../../../../src/services/StudentService";

const mockStudentRepository = {
  findAll: jest.fn()
}

//* Vamos a crear una instancia de estudiantes usando un repositorio simulado
const studentService=  new StudentService(mockStudentRepository);

//* Comenzamos creando el bloque de prueba parea el servicio

describe('StudentService', () => {

  //* Antes de cada prueba del bloque StudentService, limpia todos los mocks para asegurar que no haya interferencias entre pruebas.
  beforeEach( () => {
    jest.clearAllMocks();
  });

  describe('getAllStudents', () => {
    it('Should return all students', async () => {

      mockStudentRepository.findAll.mockResolvedValue([{id: 1, name: 'Richard', age: 25}, {id: 2, name: 'James', age: 30}]);

      //* Llamar al método getAllStudents del servicio y almacenar el resultado
      const result = await studentService.getAllStudents();

      //* Asegurar que el resultado tenga dos estudiantes
      expect(result).toHaveLength(2);

      //* Asegurar que el primer estudiante tenga el nombre 'Richard
      expect(result[0].name).toBe('Richard');

      //* Aseguro que el segundo estudiante tenga el nombre 'James'
      expect(result[1].name).toBe('James');
    })
  });

});