import { IStudent } from "../interfaces/IStudent";
import { IStudentRepository } from "../interfaces/IStudentRepository";
import { IStudentService } from "../interfaces/IStudentService";


export class StudentService implements IStudentService {

  constructor(private readonly studentRepository: IStudentRepository) {}
  getStudentById(id: number): Promise<IStudent | null> {
    return this.studentRepository.findById(id);
  }
  //constructor(private readonly studentRepository: MysqlStudentRepository) {}

  getAllStudents(): Promise<IStudent[]> {
    return this.studentRepository.findAll();
  }

  
}