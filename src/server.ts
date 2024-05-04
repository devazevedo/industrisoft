import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { insertSupplier } from './routes/insert-suppliers';
import { getSuppliers } from './routes/get-suppliers';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(insertSupplier);
app.register(getSuppliers);

app.listen({ port:3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running on port 3333');
});