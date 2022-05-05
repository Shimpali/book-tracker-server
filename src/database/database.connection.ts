import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigurationModule } from '../core/config/configuration.module';
import { ConfigurationService } from '../core/config/configuration.service';

export const databaseConnections = [
  MongooseModule.forRootAsync({
    imports: [ConfigurationModule],
    useFactory: async (configService: ConfigurationService) =>
      configService.mongooseConfig,
    inject: [ConfigurationService],
  }),
];
