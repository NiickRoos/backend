
import app from './app';

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  console.log(`🚀 Servidor rodando em: ${address}`);
});