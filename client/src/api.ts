import { AbortableRequest, fetchJson, from, HttpVerb, withJsonBody } from 'abortable-networking';
import { SuperAgentRequest } from 'superagent';

const fromApi: (url: string, method?: HttpVerb) => SuperAgentRequest =
  from(process.env.REACT_APP_API_LOCATION || '/');

export type Id = number | string;

export type CreateExampleEntity = {
  name: string,
};

export type ExampleEntity = {
  id: Id,
  name: string,
};

export const createExample = (example: CreateExampleEntity): AbortableRequest<ExampleEntity> =>
  fetchJson(withJsonBody(example)(fromApi('/example-entity', 'post')));

export const fetchExample = (): AbortableRequest<Array<ExampleEntity>> =>
  fetchJson(fromApi('/example'));
