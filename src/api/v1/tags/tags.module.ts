import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagRepository } from './data/tag.repository';
import { TagCollectionName, TagSchema } from './data/tag.schema';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TagCollectionName, schema: TagSchema }]),
  ],
  controllers: [TagsController],
  providers: [TagsService, TagRepository],
})
export class TagsModule {}
