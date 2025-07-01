import mysql from 'mysql2/promise';


/*importação de uma biblioteca dotenv  é uma boa prática muito recomendada, especialmente para:
Manter segredos (como usuário e senha do banco) fora do código fonte
Facilitar a troca de configurações entre ambientes (desenvolvimento, produção)
Evitar que dados sensíveis sejam enviados ao GitHub
*/

import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});