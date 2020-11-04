import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost/nest-max'),
  ],
  controllers: [AppController],
  // in nestjs, services are bounded to modules. in angular services are avaiialble everywhere
  providers: [AppService],
})
export class AppModule {}
