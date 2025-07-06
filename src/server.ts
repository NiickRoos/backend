import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import advogadosRoutes from './rotas/advogados';
import clientesRoutes from './rotas/clientes';
import processosRoutes from './rotas/processos';
import areasRoutes from './rotas/areas';

const app = Fastify({
  logger: true
});

const start = async () => {
  try {
    // Registrar CORS - liberar o frontend apenas na porta 5173 (recomendado)
    await app.register(fastifyCors, {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
    });

    // Rota raiz apenas para teste rápido
    app.get('/', async () => {
      return { message: 'API rodando com Fastify!' };
    });

    // Registro das rotas com prefixos organizados
    app.register(advogadosRoutes, { prefix: '/advogados' });
    app.register(clientesRoutes, { prefix: '/clientes' });
    app.register(processosRoutes, { prefix: '/processos' });
    app.register(areasRoutes, { prefix: '/areas' });

    // Escutando na porta 3000
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor rodando na porta 3000');

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
