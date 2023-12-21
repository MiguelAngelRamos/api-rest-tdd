import { IStudent } from "./IStudent";

export interface IStudentRepository {
  findAll(): Promise<IStudent[]>;
  findById(id: number): Promise<IStudent | null>
}


// findAll(), findById(), create(), update(), delete()
//*  findById(id: number): Promise<IStudent | null>;