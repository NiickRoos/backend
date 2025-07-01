import { FastifyInstance } from 'fastify';

export default async function areasRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return { message: 'Rota de areas funcionando!' };
  });
}
