import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { APIModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { loggerConfig } from './core/app-logger/app-logger.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    APIModule,
    LoggerModule.forRoot(loggerConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
