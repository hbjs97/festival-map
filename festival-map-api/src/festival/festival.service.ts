import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from 'src/entity/festival.entity';
import { MoreThan, Repository } from 'typeorm';
import { FestivalGetDto } from './dto/festival.get.dto';
import dayjs from 'dayjs';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(Festival)
    private festivalRepository: Repository<Festival>,
  ) {}

  public async getFestivals(
    festivalGetDto: FestivalGetDto,
  ): Promise<Festival[]> {
    const distanceSql = `(6371 * 2 * ASIN(SQRT( 
      POWER(SIN((latitude - abs(${festivalGetDto.latitude})) * pi()/180 / 2), 2) 
       + COS(latitude * pi()/180 ) * COS(abs(${festivalGetDto.latitude}) * pi()/180) 
       * POWER(SIN((longitude - ${festivalGetDto.longitude}) *  pi()/180 / 2), 2))))`;

    return await this.festivalRepository
      .createQueryBuilder()
      .addSelect(distanceSql, 'distance')
      .where(`${distanceSql} IS NOT NULL`)
      .andWhere(`${distanceSql} <= ${festivalGetDto.radius}`)
      .orderBy(`${distanceSql}`, 'ASC')
      .getRawMany();
  }

  public async getRecentFestivals(): Promise<Festival[]> {
    return await this.festivalRepository.find({
      where: {
        fstvlStartDate: MoreThan(dayjs().format('YYYY-MM-DD')),
      },
      order: {
        fstvlStartDate: 'ASC',
      },
      take: 10,
    });
  }
}
