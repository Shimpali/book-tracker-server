import { Params } from 'nestjs-pino';
import { ConfigurationService } from '../config/configuration.service';

const config = new ConfigurationService();

export const loggerConfig: Params = {
  pinoHttp: {
    level: config.isProduction ? 'info' : 'debug',
    serializers: {
      req(req) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { headers, remoteAddress, remotePort, ...requiredReqObject } =
          req;
        return requiredReqObject;
      },
      res(res) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { headers, ...requiredResObject } = res;
        return requiredResObject;
      },
    },
  },
};
