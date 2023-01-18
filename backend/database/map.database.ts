import { createPool, Pool } from 'mysql';
import { DATA_SOURCES } from '../config/mysql.config';
const dataSource = DATA_SOURCES.mySqlDataSource;

let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try {
    pool = createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
      port : Number(dataSource.DB_PORT),
    });

    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};


/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const execute = (query: string, params: string[] | Object): Promise<any> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise<any>((resolve, reject) => {
      pool.query(query, params, (error:any, results:any) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}
