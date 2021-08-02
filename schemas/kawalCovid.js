import { introspectSchema, RenameTypes, RenameRootTypes, RenameRootFields } from '@graphql-tools/wrap';
import { fetch } from 'cross-fetch';
import { print } from 'graphql';

async function remoteExecutor({ document, variables }) {
  const query = print(document);
  const fetchResult = await fetch('http://covid_data_kawalcovid:4001', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
}

export const kawalCovidSubschema = {
  schema: await introspectSchema(remoteExecutor),
  transforms: [
    new RenameTypes(name => `KawalCovid19_${name}`),
    new RenameRootTypes(name => `KawalCovid19_${name}`),
    new RenameRootFields((operationName, fieldName, fieldConfig) => `KawalCovid19_${fieldName}`)
  ],
  executor: remoteExecutor,
};