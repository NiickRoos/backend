import { FastifyInstance } from 'fastify';
import { pool } from '../database'; // ajuste o caminho conforme seu projeto

async function advogadosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM advogados');
      return rows;  // retorna os advogados do banco
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar advogados' });
    }
  });
}

export default advogadosRoutes;
