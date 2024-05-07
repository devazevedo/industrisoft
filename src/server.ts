import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { insertSupplier } from './routes/insert-suppliers';
import { getSuppliers } from './routes/get-suppliers';
import { insertRawMaterials } from './routes/insert-raw-materials';
import { getRawMaterials } from './routes/get-raw-materials';
import { insertRecipe } from './routes/insert-recipes';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROTAS GET
app.register(getSuppliers);
app.register(getRawMaterials)

// ROTAS POST
app.register(insertSupplier);
app.register(insertRawMaterials)
app.register(insertRecipe);

app.listen({ port:3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running on port 3333');
});