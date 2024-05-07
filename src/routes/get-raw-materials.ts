import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getRawMaterials(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/rawMaterials', {
    schema: {
      querystring: z.object({
        query: z.string().optional(),
      }),
      response: {
        200: z.array(z.object({
          name: z.string(),
          description: z.string().optional(),
          medition: z.string(),
          quantity: z.number(),
          price: z.number(),
          supplier: z.object({
            name: z.string(),
            phone: z.string(),
            email: z.string().optional(),
            cnpj: z.string().optional(),
            address: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            country: z.string().optional(),
            number: z.string().optional(),
          }).optional(),
        })),
      },
    },
    handler: async (req: FastifyRequest<{ Querystring: { query?: string } }>, rep) => {
      const { query } = req.query;
      console.log(query);

      const rawMaterials = await prisma.rawMaterials.findMany({
        where: {
          name: {
            contains: query || ''
          },
        },
        include: {
          supplier: true,
        },
      });

      return rep.send(rawMaterials);
    },
  });
}