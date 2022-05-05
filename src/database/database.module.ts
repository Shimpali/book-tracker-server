import { Module } from '@nestjs/common';
import { databaseConnections } from './database.connection';

@Module({
  imports: [...databaseConnections],
  exports: [],
  providers: [],
})
export class DatabaseModule {}
