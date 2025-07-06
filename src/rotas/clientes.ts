import { FastifyInstance, FastifyRequest } from 'fastify';
import { pool } from '../database';

async function clientesRoutes(app: FastifyInstance) {

  // Listar todos os clientes
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes');
      return rows;
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao buscar clientes' });
    }
  });

  // Cadastrar cliente
  app.post('/cadastrar', async (request, reply) => {
    try {
      const {
        nome,
        email,
        telefone,
        documentos,
        tipo_de_documento,
        endereco,
        estado
      } = request.body as {
        nome: string;
        email: string;
        telefone: string;
        documentos: string;
        tipo_de_documento: 'CPF' | 'CNPJ';
        endereco: string;
        estado: string;
      };

      if (!nome || !email || !telefone || !documentos || !tipo_de_documento || !endereco || !estado) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        INSERT INTO clientes (nome, email, telefone, documentos, tipo_de_documento, endereco, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [nome, email, telefone, documentos, tipo_de_documento, endereco, estado];

      const [result] = await pool.query(query, values);

      return reply.status(201).send({ message: 'Cliente cadastrado com sucesso', id: (result as any).insertId });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao cadastrar cliente' });
    }
  });

  // Atualizar cliente
  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const id = Number(request.params.id);

      const {
        nome,
        email,
        telefone,
        documentos,
        tipo_de_documento,
        endereco,
        estado
      } = request.body as {
        nome: string;
        email: string;
        telefone: string;
        documentos: string;
        tipo_de_documento: 'CPF' | 'CNPJ';
        endereco: string;
        estado: string;
      };

      if (!nome || !email || !telefone || !documentos || !tipo_de_documento || !endereco || !estado) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        UPDATE clientes
        SET nome = ?, email = ?, telefone = ?, documentos = ?, tipo_de_documento = ?, endereco = ?, estado = ?
        WHERE idClientes = ?
      `;

      const values = [nome, email, telefone, documentos, tipo_de_documento, endereco, estado, id];

      await pool.query(query, values);

      return reply.send({ message: 'Cliente atualizado com sucesso' });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao atualizar cliente' });
    }
  });

  // Deletar cliente
  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const id = Number(request.params.id);

      const query = 'DELETE FROM clientes WHERE idClientes = ?';
      await pool.query(query, [id]);

      return reply.send({ message: 'Cliente deletado com sucesso' });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao deletar cliente' });
    }
  });

}

export default clientesRoutes;
