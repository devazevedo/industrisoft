import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function insertRecipe(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/recipes', {
    schema: {
      body: z.object({
        name: z.string(),
        yieldRecipe: z.number(),
        description: z.string().nullable(),
        rawMaterials: z.array(z.object({
          rawMaterialId: z.number(),
          quantity: z.number(),
          medition: z.enum(['kg', 'g', 'l', 'ml', 'un'])
        })),
      }),
      response: {},
    },
  }, async (req, rep) => {
    const { name, description, yieldRecipe, rawMaterials } = req.body;

    const recipe = await prisma.recipes.create({
      data: {
        name,
        yield: yieldRecipe,
        description,
      },
    });

    await prisma.recipesRawMaterials.createMany({
      data: rawMaterials.map(({ rawMaterialId, quantity, medition }) => ({
        recipeId: recipe.id,
        rawMaterialId,
        quantity,
        medition,
      })),
    });

    return rep.status(201).send(recipe);
  });
}