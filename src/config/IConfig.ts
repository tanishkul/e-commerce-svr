import { ISwaggerDefinition } from '../libs/Swagger';

export interface IConfig extends ISwaggerDefinition {
  env: string;
  apiPrefix: string;
  appServiceCode: string;
  port: string;
  corsOrigin: string;
  mongo: string;
  mongoTestUrl: string;
  mongooseDebug: boolean;
  seeding: string;
  swaggerUrl: string;
  adverityUrl: string;
  stackId: number;
  adverityAuthorizationToken: string;
  dataType: string;
  clientAuthorizationUrl: string;
  envName: string;
  flowManagerAPIUrl: string;
  stgContainerName: string;
  lookUpAdverityUrl: string;
  referenceDataService: string;
  connectorUIUrl: string;
}
