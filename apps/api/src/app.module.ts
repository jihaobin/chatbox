import { Module } from '@nestjs/common';
import { AppConfigModule } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, ChatModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
