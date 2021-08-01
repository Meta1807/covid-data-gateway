import { introspectSchema, RenameTypes, RenameRootTypes, RenameRootFields } from '@graphql-tools/wrap';
import { fetch } from 'cross-fetch';
import { print } from 'graphql';

async function remoteExecutor({ document, variables }) {
  const query = print(document);
  const fetchResult = await fetch('http://covid_data_kemenkes:4002', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
}

export const kemenkesSubschema = {
  schema: await introspectSchema(remoteExecutor),
  transforms: [
    new RenameTypes(name => `Kemenkes_${name}`),
    new RenameRootTypes(name => `Kemenkes_${name}`),
    new RenameRootFields((operationName, fieldName, fieldConfig) => `Kemenkes_${fieldName}`)
  ],
  executor: remoteExecutor,
};