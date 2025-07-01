import { FastifyInstance } from 'fastify';

export default async function audienciasRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return { message: 'Rota de audiencia funcionando!' };
  });
}
