import { stitchSchemas } from '@graphql-tools/stitch';
import { kawalCovidSubschema } from './schemas/kawalCovid';
import { kemenkesSubschema } from './schemas/kemenkes';
import { ApolloServer } from 'apollo-server';


// build the combined schema
export const gatewaySchema = stitchSchemas({
  subschemas: [
    kawalCovidSubschema,
    kemenkesSubschema,
  ]
});

const server = new ApolloServer({ schema: gatewaySchema });
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});