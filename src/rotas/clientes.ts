import { FastifyInstance } from 'fastify';
import { pool } from '../database'; 

async function clientesRoutes(app: FastifyInstance) {

  // Rota para listar todos os clientes
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes');
      return rows;
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao buscar clientes' });
    }
  });

  // Rota para cadastrar cliente
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

      // Validação simples
      if (!nome || !email || !telefone || !documentos || !tipo_de_documento || !endereco || !estado) {
        return reply.status(400).send({ error: 'Campos obrigatórios faltando' });
      }

      const query = `
        INSERT INTO clientes (nome, email, telefone, documentos, tipo_de_documento, endereco, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        nome,
        email,
        telefone,
        documentos,
        tipo_de_documento,
        endereco,
        estado
      ];

      const [result] = await pool.query(query, values);

      return reply.status(201).send({ message: 'Cliente cadastrado com sucesso', id: (result as any).insertId });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao cadastrar cliente' });
    }
  });
}

export default clientesRoutes;
