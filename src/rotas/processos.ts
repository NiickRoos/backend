import { FastifyInstance, FastifyRequest } from 'fastify';
import { pool } from '../database';

async function processosRoutes(app: FastifyInstance) {

  // GET /processos
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM Processos');
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
        area,
        Clientes_idClientes,
        Advogados_idAdvogados
      } = request.body as {
        numero_processo: string;
        descricao: string;
        status: 'Em andamento' | 'Finalizado' | 'Arquivado';
        data_abertura: string; // formato 'YYYY-MM-DD'
        data_encerramento?: string | null;
        area: 'Direito Civil' | 'Direito Penal' | 'Direito Trabalhista' | 'Direito Empresarial';
        Clientes_idClientes: number;
        Advogados_idAdvogados: number;
      };

      // Validar campos obrigatórios
      if (!numero_processo || !descricao || !status || !data_abertura || !area || !Clientes_idClientes || !Advogados_idAdvogados) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        INSERT INTO Processos 
        (numero_processo, descricao, status, data_abertura, data_encerramento, area, Clientes_idClientes, Advogados_idAdvogados) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        numero_processo,
        descricao,
        status,
        data_abertura,
        data_encerramento || null,
        area,
        Clientes_idClientes,
        Advogados_idAdvogados
      ];

      const [result] = await pool.query(query, values);

      return reply.status(201).send({ message: 'Processo cadastrado com sucesso', id: (result as any).insertId });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao cadastrar processo' });
    }
  });

  // PUT /processos/:id - atualizar processo
  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const id = Number(request.params.id);

      const {
        numero_processo,
        descricao,
        status,
        data_abertura,
        data_encerramento,
        area,
        Clientes_idClientes,
        Advogados_idAdvogados
      } = request.body as {
        numero_processo: string;
        descricao: string;
        status: 'Em andamento' | 'Finalizado' | 'Arquivado';
        data_abertura: string;
        data_encerramento?: string | null;
        area: 'Direito Civil' | 'Direito Penal' | 'Direito Trabalhista' | 'Direito Empresarial';
        Clientes_idClientes: number;
        Advogados_idAdvogados: number;
      };

      if (!numero_processo || !descricao || !status || !data_abertura || !area || !Clientes_idClientes || !Advogados_idAdvogados) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        UPDATE Processos
        SET numero_processo = ?, descricao = ?, status = ?, data_abertura = ?, data_encerramento = ?, area = ?, Clientes_idClientes = ?, Advogados_idAdvogados = ?
        WHERE idprocessos = ?
      `;

      const values = [
        numero_processo,
        descricao,
        status,
        data_abertura,
        data_encerramento || null,
        area,
        Clientes_idClientes,
        Advogados_idAdvogados,
        id
      ];

      await pool.query(query, values);

      return reply.send({ message: 'Processo atualizado com sucesso' });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao atualizar processo' });
    }
  });

  // DELETE /processos/:id - deletar processo
  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const id = Number(request.params.id);

      const query = 'DELETE FROM Processos WHERE idprocessos = ?';
      await pool.query(query, [id]);

      return reply.send({ message: 'Processo deletado com sucesso' });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao deletar processo' });
    }
  });
}

export default processosRoutes;
