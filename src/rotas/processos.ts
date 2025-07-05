import { FastifyInstance } from 'fastify';
import { pool } from '../database';

async function processosRoutes(app: FastifyInstance) {

  // GET /processos
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM processos');
      return rows;
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar processos' });
    }
  });

  // POST /processos/cadastrar
  app.post('/cadastrar', async (request, reply) => {
    try {
      const {
        numero_processo,
        descricao,
        status,
        data_abertura,
        data_encerramento,
        Clientes_idClientes,
        Advogados_idAdvogados,
        Areas_idareas
      } = request.body as {
        numero_processo: string;
        descricao: string;
        status: string;
        data_abertura: string;
        data_encerramento?: string;
        Clientes_idClientes: number;
        Advogados_idAdvogados: number;
        Areas_idareas: number;
      };

      if (!numero_processo || !descricao || !status || !data_abertura || !Clientes_idClientes || !Advogados_idAdvogados || !Areas_idareas) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        INSERT INTO processos 
        (numero_processo, descricao, status, data_abertura, data_encerramento, Clientes_idClientes, Advogados_idAdvogados, Areas_idareas) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        numero_processo,
        descricao,
        status,
        data_abertura,
        data_encerramento || null,
        Clientes_idClientes,
        Advogados_idAdvogados,
        Areas_idareas
      ];

      const [result] = await pool.query(query, values);

      return reply.status(201).send({ message: 'Processo cadastrado com sucesso', id: (result as any).insertId });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao cadastrar processo' });
    }
  });
}

export default processosRoutes;
