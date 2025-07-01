import { FastifyInstance } from 'fastify';

export default async function processossRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return { message: 'Rota de processos funcionando!' };
  });
}
