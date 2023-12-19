import { IStudent } from "./IStudent";

export interface IStudentService {
  getAllStudents(): Promise<IStudent[]>;
}