import { FastifyInstance } from 'fastify';

export default async function clientesRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return { message: 'Rota de clientes funcionando!' };
  });
}
