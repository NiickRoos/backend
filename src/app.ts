import Fastify from 'fastify';
import advogadosRoutes from './rotas/advogados';
import clientesRoutes from './rotas/clientes';
import documentosRoutes from './rotas/documentos';
import audienciasRoutes from './rotas/audiencias';
import processosRoutes from './rotas/processos';
import areasRoutes from './rotas/areas';




// Aqui depois você importa as outras rotas

const app = Fastify();

app.register(clientesRoutes, { prefix: '/clientes' });
app.register(documentosRoutes, { prefix: '/documentos' });
app.register(audienciasRoutes, { prefix: '/audiencias' });
app.register(processosRoutes, { prefix: '/processos' });
app.register(areasRoutes, { prefix: '/areas' });
app.register(advogadosRoutes, { prefix: '/advogados' });


export default app;