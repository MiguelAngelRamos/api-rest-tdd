import { IStudent } from "./IStudent";

export interface IStudentRepository {
  findAll(): Promise<IStudent[]>;
}


// findAll(), findById(), create(), update(), delete()
//*  findById(id: number): Promise<IStudent | null>;