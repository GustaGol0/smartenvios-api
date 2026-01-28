import { Router } from 'express';
import { LeadController } from '../controllers/LeadController.js';
import { PrismaClient } from '@prisma/client';

const router = Router();
const leadController = new LeadController();
const prisma = new PrismaClient();

// Rotas de Leads
router.post('/leads', leadController.create);
router.get('/leads', leadController.index);

// Rota de Intenção
router.post('/intentions', async (req, res) => {
  const { zipcode_start, zipcode_end } = req.body;
  const intention = await prisma.intention.create({
    data: { zipcode_start, zipcode_end }
  });
  return res.json(intention);
});

export { router };