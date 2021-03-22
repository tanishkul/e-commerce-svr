import * as _ from 'lodash';
import * as mongoose from 'mongoose';

import errorResponse from '../libs/errors/errorResponse';
import IError from '../libs/errors/IError';

export const generateObjectId = () => mongoose.Types.ObjectId();

export const isValidObjectId = (id: any) => mongoose.Types.ObjectId.isValid(id);

export function leanObject<D extends any>(doc: D): D {
  try {
    if (doc && doc._id) {
      doc.id = doc._id;
      delete doc._id;
      delete doc.__v;
    }

    return doc;
  } catch (err) {
    return err;
  }
}

export function getEnumKeyOrValue(enums: any, enumKeyOrValue: any): string {
  return enums[enumKeyOrValue];
}

export const changeName = (name) => {
  const newName = name.split(/_(.+)/)[1];
  if (newName) {
    return newName;
  }
  return name;
};

export const checkType = (value: any, type: string): boolean => {
  if (typeof value === type) {
    return true;
  }
  return false;
};

export const isIn = (list: string[], value: string): boolean => {
  if (list.indexOf(value) === -1) {
    return false;
  }
  return true;
};

export const createErrorResponse = (
  location: string,
  message: string,
  param: string,
  value: string,
): IError[] => {
  const error: IError[] = [errorResponse(location, message, param, value)];
  return error;
};

export const removeSpaceFromName = (name) => name.split(' ').join('_');

export const requestObjectForDAG = (
  connection,
  dbConfig,
  schedule,
  dataStreamType,
  dataStream,
) => {
  // tslint:disable:variable-name
  const { name, id: connection_id } = connection;
  const {
    cron_interval_start,
    cron_interval,
    cron_start_of_day,
    cron_type,
    lookback_type,
    lookback_window,
    offset,
  } = schedule;
  const { tenantId, subTenantId, clientId, marketCode } = dbConfig;
  const { slug: data_source, adverityId } = dataStreamType;
  const { id, slug } = dataStream;

  const template = {
    account: removeSpaceFromName(name),
    client: clientId,
    connection: removeSpaceFromName(name),
    connection_id,
    cron_interval,
    cron_interval_start,
    cron_start_of_day,
    cron_type,
    data_source,
    data_source_id: adverityId,
    data_stream_id: id,
    data_stream_name: slug,
    lookback_type,
    lookback_window,
    market: marketCode,
    offset,
    subtenant_id: subTenantId,
    tenant_id: tenantId,
  };
  return template;
};

export const getSchedulesString = (schedule: any) => {
  const {
    cron_type = '',
    cron_interval = '',
    cron_interval_start = '',
    cron_start_of_day = '',
  } = schedule;

  const time = cron_start_of_day.split(':');
  switch (cron_type) {
    case 'minute':
      return `*/${cron_interval} * * * *`;
    case 'hour':
      return `0 */${cron_interval_start} * * *`;
    case 'day':
      return `${time[1]} ${time[0]} */${cron_interval} * *`;
    case 'week':
      if (cron_interval === 1) {
        return `${time[1]} ${time[0]} * * ${cron_interval_start}`;
      } else if (cron_interval === 2) {
        return `${time[1]} ${time[0]} */14 * ${cron_interval_start}`;
      }
      return `${time[1]} ${time[0]} */28 * ${cron_interval_start}`;
    case 'month':
      return `${time[1]} ${time[0]} ${cron_interval_start} */${cron_interval} *`;
    case 'year':
      return `0 0 1 1 *`;
  }
  return '* * * * *';
};
