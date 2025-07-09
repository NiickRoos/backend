import { FastifyInstance, FastifyRequest } from 'fastify';
import { pool } from '../database';

async function advogadosRoutes(app: FastifyInstance) {

  // Listar advogados
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM advogados');
      return rows;
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao buscar advogados' });
    }
  });

  // Cadastrar advogado
  app.post('/cadastrar', async (request, reply) => {
    try {
      const { nome, oab, email, telefone, especialidade } = request.body as {
        nome: string;
        oab: string;
        email: string;
        telefone: string;
        especialidade: string;
      };

      if (!nome || !oab || !email || !telefone || !especialidade) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        INSERT INTO advogados (nome, oab, email, telefone, especialidade)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [nome, oab, email, telefone, especialidade];

      const [result] = await pool.query(query, values);
      return reply.status(201).send({ message: 'Advogado cadastrado com sucesso', id: (result as any).insertId });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao cadastrar advogado' });
    }
  });

  // Atualizar advogado
  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const id = Number(request.params.id);

      const { nome, oab, email, telefone, especialidade } = request.body as {
        nome: string;
        oab: string;
        email: string;
        telefone: string;
        especialidade: string;
      };

      if (!nome || !oab || !email || !telefone || !especialidade) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        UPDATE advogados
        SET nome = ?, oab = ?, email = ?, telefone = ?, especialidade = ?
        WHERE idAdvogados = ?
      `;
      const values = [nome, oab, email, telefone, especialidade, id];

      await pool.query(query, values);
      return reply.send({ message: 'Advogado atualizado com sucesso' });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao atualizar advogado' });
    }
  });

  // Deletar advogado
// Deletar advogado
app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
  try {
    const id = Number(request.params.id);

    const query = 'DELETE FROM advogados WHERE idAdvogados = ?';
    await pool.query(query, [id]);

    return reply.send({ message: 'Advogado deletado com sucesso' });

  } catch (error: any) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return reply.status(400).send({
        error: 'Este advogado está vinculado a um ou mais processos. Altere o advogado dos processos antes de excluí-lo.'
      });
    }

    console.error('Erro ao deletar advogado:', error);
    return reply.status(500).send({ error: 'Erro interno ao deletar advogado.' });
  }
});

}
export default advogadosRoutes;