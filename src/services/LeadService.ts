import { PrismaClient } from '@prisma/client';
import { EmailService } from './EmailService.js';

const prisma = new PrismaClient();
const emailService = new EmailService();

interface CreateLeadDTO {
  name: string;
  email: string;
  intentionId?: string; // Opcional: Se vier, a gente vincula
}

export class LeadService {
  async create({ name, email, intentionId }: CreateLeadDTO) {
    // 1. Verifica se já existe
    const leadExists = await prisma.lead.findUnique({ where: { email } });
    if (leadExists) {
      throw new Error("Email já cadastrado.");
    }

    // 2. Cria o Lead
    const lead = await prisma.lead.create({
      data: { name, email }
    });

    // 3. Se veio um ID de intenção, atualiza a intenção para pertencer a este Lead
    if (intentionId) {
      await prisma.intention.update({
        where: { id: intentionId },
        data: { leadId: lead.id }
      });
    }

    // 4. Envia o Email (Assíncrono, não trava a resposta)
    emailService.sendWelcomeEmail(name, email);

    return lead;
  }

  async getAll() {
    return prisma.lead.findMany({ include: { intentions: true } });
  }
}