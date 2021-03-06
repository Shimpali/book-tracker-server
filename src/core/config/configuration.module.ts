import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [],
  providers: [
    {
      provide: ConfigurationService,
      useValue: new ConfigurationService(),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
