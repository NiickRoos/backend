import { FastifyInstance } from 'fastify';
import { pool } from '../database'; // ajuste o caminho conforme seu projeto

async function areasRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM areas_do_direito');
      return rows;  // retorna os areas do banco
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar areas' });
    }
  });
}

export default areasRoutes;
