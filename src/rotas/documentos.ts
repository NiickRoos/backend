import { FastifyInstance } from 'fastify';

export default async function documentosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return { message: 'Rota de documentos funcionando!' };
  });
}
