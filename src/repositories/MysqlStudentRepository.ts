import { MysqlConnection } from "../database/MysqlConnection";
import { IStudent } from "../interfaces/IStudent";

export class MysqlStudentRepository {

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
}