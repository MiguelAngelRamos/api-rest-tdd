import { MysqlConnection } from  '../../../../src/database/MysqlConnection';
import dotenv from 'dotenv';

dotenv.config();

describe('MysqlConnection', () => {

  it('debería crear un pool de conexiones', async () => {
    const dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    }

    const mysqlConnection = new MysqlConnection(dbConfig);
    const connection = await mysqlConnection.getConnection();
  
    //* Verificar que obtenemos la conexión y que no sea null o undefined
    expect(connection).toBeDefined();

    await connection.release();
  }); //* fin de test Unitario "debería crear un pool de conexiones"

});

