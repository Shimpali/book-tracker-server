import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressRepository } from './data/progress.repository';
import { ProgressCollectionName, ProgressSchema } from './data/progress.schema';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProgressCollectionName, schema: ProgressSchema },
    ]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressRepository],
})
export class ProgressModule {}
