import { FastifyInstance } from 'fastify';
import { pool } from '../database'; // ajuste o caminho conforme seu projeto

async function processosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM processos_juridicos ');
      return rows;  // retorna os processos  do banco
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar processos ' });
    }
  });
}

export default processosRoutes;
