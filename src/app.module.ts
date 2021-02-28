import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdniReaderModule } from './adni-reader/adni-reader.module';

@Module({
  imports: [AdniReaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
