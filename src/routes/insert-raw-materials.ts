import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { number, z } from "zod";
import { prisma } from "../lib/prisma";

export async function insertRawMaterials(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/rawMaterials', {
    schema: {
      body: z.object({
        name: z.string(),
        description: z.string().nullable(),
        medition: z.enum(['kg', 'g', 'l', 'ml', 'un']),
        quantity: z.number(),
        supplierId: z.number(),
        price: z.number(),
      }),
      response: {},
    },
  }, async (req, rep) => {
    const { name, description, medition, quantity, supplierId, price } = req.body;

    const supplier = await prisma.rawMaterials.create({
      data: {
        name,
        description,
        medition,
        quantity,
        supplierId,
        price,
      },
    });

    return rep.status(201).send(supplier);
  });
}
