import { FastifyInstance } from 'fastify';
import { pool } from '../database';

async function advogadosRoutes(app: FastifyInstance) {

  // Rota GET para listar advogados
  app.get('/', async (request, reply) => {
    try {
      const [rows] = await pool.query('SELECT * FROM advogados');
      return rows;
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar advogados' });
    }
  });

  // Rota POST para cadastrar advogado
  app.post('/cadastrar', async (request, reply) => {
    try {
      const {
        nome,
        oab,
        email,
        telefone,
        especialidade
      } = request.body as {
        nome: string;
        oab: string;
        email: string;
        telefone: string;
        especialidade: string;
      };

      // Validação simples
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
}

export default advogadosRoutes;
