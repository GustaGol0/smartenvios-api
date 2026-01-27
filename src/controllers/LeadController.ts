import { Request, Response } from 'express';
import { z } from 'zod'; // O Xerife da validação
import { LeadService } from '../services/LeadService.js';

const leadService = new LeadService();

export class LeadController {
  async create(req: Request, res: Response) {
    // 1. Define as regras (Schema)
    const createLeadSchema = z.object({
      name: z.string().min(3, "Nome deve ter pelo menos 3 letras"),
      email: z.string().email("Email inválido"),
      intentionId: z.string().uuid("ID da intenção inválido").optional(),
    });

    try {
      // 2. Valida os dados
      const data = createLeadSchema.parse(req.body);

      // 3. Chama o serviço
      const result = await leadService.create(data);
      return res.status(201).json(result);

    } catch (error: any) {
      // Se for erro de validação do Zod
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      // Se for erro de regra (tipo email duplicado)
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response) {
    const leads = await leadService.getAll();
    return res.json(leads);
  }
}