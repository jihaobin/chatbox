import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ProviderModule } from '../provider/provider.module';
import { ChatEventsService } from './chat-events.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [ConfigModule, DatabaseModule, ProviderModule],
  controllers: [ChatController],
  providers: [ChatService, ChatEventsService],
  exports: [ChatService, ChatEventsService],
})
export class ChatModule {}
