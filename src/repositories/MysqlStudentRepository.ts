import { RowDataPacket } from "mysql2";
import { MysqlConnection } from "../database/MysqlConnection";
import { IStudent } from "../interfaces/IStudent";
import { IStudentRepository } from '../interfaces/IStudentRepository';

export class MysqlStudentRepository implements IStudentRepository {

  constructor(private readonly dbConnection: MysqlConnection) {}

  private async getConnection() {
    return this.dbConnection.getConnection();
  }

  //* a generar los método
  async findAll(): Promise<IStudent[]> {
    const connection =  await this.getConnection();
    try {
      const [rows] = await connection.execute("SELECT * FROM students");
      return rows as IStudent[];
    } catch (error) {
      throw new Error("Error" + error);
    } finally {
      connection.release(); //* libera la conexion
    }
  }
  async findById(id: number): Promise<IStudent | null> {
    const connection =  await this.getConnection();
    try {
      const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM students WHERE id = ?", [id]);
        
      if(rows.length === 0) {
        return null;
      }
      return rows[0] as unknown as IStudent;
    } catch (error) {
      throw new Error("Error" + error);
    } finally {
      connection.release(); //* libera la conexion
    }
  }
}