import { FastifyInstance } from 'fastify';
import { pool } from '../database'; // ajuste o caminho conforme seu projeto

async function documentosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM documentos_juridicos ');
      return rows;  // retorna os documentos  do banco
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar documentos ' });
    }
  });
}

export default documentosRoutes;
