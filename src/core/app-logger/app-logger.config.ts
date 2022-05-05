/* eslint-disable @typescript-eslint/no-unused-vars */
import { Params } from 'nestjs-pino';
import { ConfigurationService } from '../config/configuration.service';

const config = new ConfigurationService();

export const loggerConfig: Params = {
  pinoHttp: {
    level: config.isProduction ? 'info' : 'debug',
    serializers: {
      req(req) {
        const { headers, remoteAddress, remotePort, ...requiredReqObject } =
          req;
        return requiredReqObject;
      },
      res(res) {
        const { headers, ...requiredResObject } = res;
        return requiredResObject;
      },
    },
  },
};
