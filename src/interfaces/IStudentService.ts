import { IStudent } from "./IStudent";

export interface IStudentService {
  getAllStudents(): Promise<IStudent[]>;
  getStudentById(id: number): Promise<IStudent | null>
}