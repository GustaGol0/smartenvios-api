export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "API SmartEnvios",
    version: "1.0.0",
    description: "API para gestão de Leads e Intenções de Frete",
    contact: {
      name: "Gustavo Developer",
      email: "gustavo@dev.com"
    }
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor Local"
    }
  ],
  paths: {
    // --- ROTA DE LEADS ---
    "/leads": {
      post: {
        summary: "Cadastra um novo Lead",
        description: "Cria um usuário e envia email de boas-vindas.",
        tags: ["Leads"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Gustavo Dev" },
                  email: { type: "string", example: "dev@teste.com" },
                  intentionId: { type: "string", example: "uuid-da-intencao-opcional" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Lead criado com sucesso" },
          400: { description: "Erro de validação ou email duplicado" }
        }
      },
      get: {
        summary: "Lista todos os Leads",
        tags: ["Leads"],
        responses: {
          200: { description: "Lista retornada com sucesso" }
        }
      }
    },
    
    // --- ROTA DE INTENÇÕES ---
    "/intentions": {
      post: {
        summary: "Cadastra uma nova intenção de frete",
        description: "Cria um pedido de frete anônimo para pegar o ID.",
        tags: ["Intenções"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  zipcode_start: { type: "string", example: "13270-000" },
                  zipcode_end: { type: "string", example: "01001-000" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Intenção criada com sucesso" }
        }
      }
    }
  }
};