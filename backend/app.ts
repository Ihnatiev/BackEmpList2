import mysql from 'mysql';
import dotenv from 'dotenv';
import util from 'util';
import keys from './config/DBkeys';
import { IDBConnection } from './config/IDBconnection';

export class MysqlConnection extends IDBConnection {
  private pool: any

  constructor() {
    super()
    dotenv.config()
    this.pool = mysql.createPool(keys.database)

    this.pool.getConnection((error: any, connection: any) => {
      if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
        }
        if (error.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
        }
      }

      if (connection) connection.release()

      return
    })
    this.pool.query = util.promisify(this.pool.query)

    // pool event
    this.pool.on('connection', (connection: any) => {
      console.log('Connected to mySQL')
    })
  }

  execute(query: string, params: any = null) {
    if (params !== null) {
      return this.pool.query(query, params)
    } else {
      return this.pool.query(query)
    }
  }
}


