import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdniReaderModule } from './adni-reader/adni-reader.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AdniImagesModule } from './adni-images/adni-images.module';
import { AdniDictionaryModule } from './adni-dictionary/adni-dictionary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdniReaderModule,
    AdniImagesModule,
    AdniDictionaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
