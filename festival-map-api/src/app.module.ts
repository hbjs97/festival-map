import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter, LoggerMiddleware } from './common';
import { configuration } from './config';
import { FestivalModule } from './festival/festival.module';
import { PostModule } from './post/post.module';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { ReplyModule } from './post/reply/reply.module';

dotenv.config({
  path: path.resolve('.env'),
});

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get('db'),
      }),
      inject: [ConfigService],
    }),

    CommonModule,
    BaseModule,

    FestivalModule,
    RouterModule.register([
      {
        path: 'festivals',
        module: FestivalModule,
      },
    ]),

    ParkingLotModule,
    RouterModule.register([
      {
        path: 'parking-lots',
        module: ParkingLotModule,
      },
    ]),

    PostModule,
    RouterModule.register([
      {
        path: 'posts',
        module: PostModule,
        children: [
          {
            path: 'replies',
            module: ReplyModule,
          },
        ],
      },
    ]),
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
