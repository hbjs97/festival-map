import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLot } from 'src/entity/parking.lot.entity';
import { Repository } from 'typeorm';
import { ParkingLotGetDto } from './dto/parking.lot.get.dto';

@Injectable()
export class ParkingLotService {
  constructor(
    @InjectRepository(ParkingLot)
    private parkingLotRepository: Repository<ParkingLot>,
  ) {}

  public async getParkingLots(
    parkingLotGetDto: ParkingLotGetDto,
  ): Promise<ParkingLot[]> {
    const distanceSql = `(6371 * 2 * ASIN(SQRT( 
      POWER(SIN((latitude - abs(${parkingLotGetDto.latitude})) * pi()/180 / 2), 2) 
       + COS(latitude * pi()/180 ) * COS(abs(${parkingLotGetDto.latitude}) * pi()/180) 
       * POWER(SIN((longitude - ${parkingLotGetDto.longitude}) *  pi()/180 / 2), 2))))`;

    return await this.parkingLotRepository
      .createQueryBuilder('parkingLot')
      .select([
        'parkingLot.parking_lot_id',
        'parkingLot.prkplceNm',
        'parkingLot.rdnmadr',
        'parkingLot.lnmadr',
        'parkingLot.operDay',
        'parkingLot.parkingchrgeInfo',
        'parkingLot.phoneNumber',
        'parkingLot.latitude',
        'parkingLot.longitude',
      ])
      .where(`${distanceSql} IS NOT NULL`)
      .andWhere(`${distanceSql} <= ${parkingLotGetDto.radius}`)
      .orderBy(`${distanceSql}`, 'ASC')
      .take(150)
      .getRawMany();
  }
}
