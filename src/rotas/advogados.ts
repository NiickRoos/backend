import { FastifyInstance } from 'fastify';

export default async function advogadosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return { message: 'Rota de advogados funcionando!' };
  });
}
