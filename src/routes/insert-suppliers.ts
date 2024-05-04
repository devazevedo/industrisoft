import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { number, z } from "zod";
import { prisma } from "../lib/prisma";

export async function insertSupplier(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/suppliers', {
    schema: {
      body: z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string().nullable(),
        cnpj: z.string().nullable(),
        address: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        country: z.string().nullable(),
        number: z.string().nullable(),
      }),
      response: {},
    },
  }, async (req, rep) => {
    const { name, phone, email, cnpj, address, city, state, country, number } = req.body;

    const supplier = await prisma.suppliers.create({
      data: {
        name,
        phone,
        email,
        cnpj,
        address,
        city,
        state,
        country,
        number,
      },
    });

    return rep.status(201).send(supplier);
  });
}
