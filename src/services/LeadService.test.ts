import { describe, it, expect, vi, beforeEach } from 'vitest';
// Mantive o .js que você colocou corretamente!
import { LeadService } from './LeadService.js'; 

// 1. HOISTING: Criamos as funções de controle ANTES dos mocks rodarem
const { prismaFunctions, emailFunctions } = vi.hoisted(() => {
  return {
    prismaFunctions: {
      lead: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
      intention: {
        update: vi.fn(),
      },
    },
    emailFunctions: {
      sendWelcomeEmail: vi.fn(),
    },
  };
});

// 2. Mock do Prisma: Agora ele consegue enxergar o 'prismaFunctions'
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      lead = prismaFunctions.lead;
      intention = prismaFunctions.intention;
    },
  };
});

// 3. Mock do EmailService
vi.mock('./EmailService.js', () => {
  return {
    EmailService: class {
      sendWelcomeEmail = emailFunctions.sendWelcomeEmail;
    },
  };
});

// --- OS TESTES ---
describe('LeadService', () => {
  let service: LeadService;

  beforeEach(() => {
    vi.clearAllMocks(); // Limpa a contagem antes de cada teste
    service = new LeadService();
  });

  it('deve criar um novo lead com sucesso', async () => {
    // Configura: "Não achei ninguém"
    prismaFunctions.lead.findUnique.mockResolvedValue(null);
    
    // Configura: "Criei com sucesso"
    prismaFunctions.lead.create.mockResolvedValue({
      id: '123',
      name: 'Gustavo Teste',
      email: 'teste@teste.com',
    });

    const result = await service.create({
      name: 'Gustavo Teste',
      email: 'teste@teste.com',
    });

    expect(result).toHaveProperty('id', '123');
    expect(prismaFunctions.lead.create).toHaveBeenCalled();
    expect(emailFunctions.sendWelcomeEmail).toHaveBeenCalled();
  });

  it('não deve criar lead se o email já existe', async () => {
    // Configura: "Já achei alguém!"
    prismaFunctions.lead.findUnique.mockResolvedValue({
      id: '999',
      email: 'teste@teste.com',
    });

    await expect(service.create({
      name: 'Gustavo Teste',
      email: 'teste@teste.com',
    })).rejects.toThrow('Email já cadastrado');

    expect(prismaFunctions.lead.create).not.toHaveBeenCalled();
  });
});