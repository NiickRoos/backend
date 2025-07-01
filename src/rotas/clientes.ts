import { FastifyInstance } from 'fastify';
import { pool } from '../database'; // ajuste o caminho conforme seu projeto

async function clientesRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes');
      return rows;  // retorna os clientes do banco
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar clientes' });
    }
  });
}

export default clientesRoutes;
