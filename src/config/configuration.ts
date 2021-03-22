import { config } from 'dotenv';
config();
import * as constants from '../libs/constants';
import { IConfig } from './IConfig';

const envVars: NodeJS.ProcessEnv = process.env;
/* tslint:disable:no-var-requires */
const version = require('../../package.json').version;
const isMongooseDebug =
  envVars.NODE_ENV === constants.EnvVars.DEV;
const configurations = Object.freeze({
  adverityAuthorizationToken: envVars.ADVERITY_AUTHORIZATION_TOKEN,
  adverityUrl: envVars.ADVERITY_URL,
  apiPrefix: constants.API_PREFIX,
  appServiceCode: envVars.APP_SERVICE_CODE || 'ADV',
  clientAuthorizationUrl: envVars.CLIENT_AUTHORIZATION_URL,
  connectorUIUrl: envVars.CONNECTOR_UI_URL,
  corsOrigin: envVars.CORS_ORIGIN || `["http://localhost"]`,
  dataType: envVars.DATATYPE,
  env: envVars.NODE_ENV || 'dev',
  envName: envVars.ENVIRONMENT,
  flowManagerAPIUrl: envVars.FLOW_MANAGER_API_URL,
  lookUpAdverityUrl: envVars.LOOK_UP_ADVERITY_URL,
  mongo: envVars.MONGO_URL,
  mongoTestUrl: envVars.MONGO_TEST_URL,
  mongooseDebug: isMongooseDebug,
  port: envVars.PORT,
  referenceDataService: process.env.DR_REFERENCE_DATA_URL || 'http://localhost:7777',
  seeding: envVars.SEEDING,
  stackId: Number(envVars.STACK_ID),
  stgContainerName: envVars.STG_CONTAINER_NAME || 'adverity_staging_container',
  swaggerDefinition: {
    basePath: constants.API_PREFIX,
    info: {
      ...constants.ABOUT,
      version,
    },
    securityDefinitions: {
      Bearer: {
        in: constants.ABOUT.in,
        name: constants.ABOUT.name,
        type: constants.ABOUT.type,
      },
    },
  },
  swaggerUrl: constants.SWAGGER_URL,
}) as IConfig;

export default configurations;
