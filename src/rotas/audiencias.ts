import { FastifyInstance } from 'fastify';
import { pool } from '../database'; // ajuste o caminho conforme seu projeto

async function audienciasRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM audiencias');
      return rows;  // retorna os audiencias do banco
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar audiencias' });
    }
  });
}

export default audienciasRoutes;
