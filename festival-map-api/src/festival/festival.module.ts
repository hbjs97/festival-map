import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Festival } from 'src/entity/festival.entity';
import { FestivalController } from './festival.controller';
import { FestivalService } from './festival.service';

@Module({
  imports: [TypeOrmModule.forFeature([Festival])],
  controllers: [FestivalController],
  providers: [FestivalService],
})
export class FestivalModule {}
