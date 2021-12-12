import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common';
import { ParkingLot } from 'src/entity/parking.lot.entity';
import { ParkingLotGetDto } from './dto/parking.lot.get.dto';
import { ParkingLotService } from './parking-lot.service';

@Controller()
export class ParkingLotController {
  constructor(private parkingLotService: ParkingLotService) {}

  @Public()
  @Get()
  public async getParkingLotss(
    @Query() parkingLotGetDto: ParkingLotGetDto,
  ): Promise<ParkingLot[]> {
    return await this.parkingLotService.getParkingLots(parkingLotGetDto);
  }
}
