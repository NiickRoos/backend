import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const app = Fastify({ logger: true });

import advogadosRoutes from './rotas/advogados';
import clientesRoutes from './rotas/clientes';
import processosRoutes from './rotas/processos';
import areasRoutes from './rotas/areas';

const start = async () => {
  try {
    // Registrar plugins dentro de função async
    await app.register(fastifyCors, {
      origin: 'http://localhost:5173'
    });

    // Rotas
    app.get('/', async () => {
      return { message: 'API rodando com Fastify!' };
    });

    app.register(clientesRoutes, { prefix: '/clientes' });
    app.register(processosRoutes, { prefix: '/processos' });
    app.register(areasRoutes, { prefix: '/areas' });
    app.register(advogadosRoutes, { prefix: '/advogados' });

    await app.listen({ port: 3000 });
    console.log('Servidor rodando na porta 3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
