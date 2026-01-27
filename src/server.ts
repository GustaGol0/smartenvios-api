import express from 'express';
import swaggerUi from 'swagger-ui-express'; // <--- Importe isso
import { router } from './routes/routes.js';
import { swaggerConfig } from './docs/swagger.js'; // <--- Importe a config

const app = express();

app.use(express.json());

// Rota da Documentação (Acesse em /docs)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(router);

app.listen(3000, () => {
  console.log('🔥 Servidor SmartEnvios rodando na porta 3000!');
  console.log('📄 Documentação disponível em http://localhost:3000/docs');
});