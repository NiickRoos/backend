import { FastifyInstance } from 'fastify';
import { pool } from '../database';

async function relatoriosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {  // <-- aqui é '/' e não '/relatorios'
    try {
      const [rows] = await pool.query(`
        SELECT 
          processos.numero_processo,
          processos.status,
          clientes.nome AS cliente,
          advogados.nome AS advogado,
          areas.nome AS area,
          processos.data_abertura,
          processos.data_encerramento
        FROM processos
        INNER JOIN clientes ON processos.Clientes_idClientes = clientes.idClientes
        INNER JOIN advogados ON processos.Advogados_idAdvogados = advogados.idAdvogados
        INNER JOIN areas ON processos.Areas_idareas = areas.idareas
      `);

      return rows;
    } catch (error) {
      console.error('Erro no relatório:', error);
      reply.status(500).send({ error: 'Erro ao tentar gerar o relatorio' });
    }
  });
}

export default relatoriosRoutes;