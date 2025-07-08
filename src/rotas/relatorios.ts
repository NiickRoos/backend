import { FastifyPluginAsync } from 'fastify';

const relatoriosRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/relatorios/processos-por-cliente', async (request, reply) => {
    try {
      const [rows] = await fastify.mysql.query<{
        idClientes: number;
        nome_cliente: string;
        total_processos: number;
      }[]>(`
        SELECT
          c.idClientes,
          c.nome AS nome_cliente,
          COUNT(p.idprocessos) AS total_processos
        FROM Clientes c
        INNER JOIN Processos p ON c.idClientes = p.Clientes_idClientes
        GROUP BY c.idClientes, c.nome
        ORDER BY total_processos DESC
      `);

      reply.send(rows);
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ message: 'Erro ao buscar relatório' });
    }
  });
};

export default relatoriosRoutes;
