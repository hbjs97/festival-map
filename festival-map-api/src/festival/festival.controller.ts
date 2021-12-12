import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common';
import { Festival } from 'src/entity/festival.entity';
import { FestivalGetDto } from './dto/festival.get.dto';
import { FestivalService } from './festival.service';

@Controller()
export class FestivalController {
  constructor(private festivalService: FestivalService) {}

  @Public()
  @Get()
  public async getFestivals(
    @Query() festivalGetDto: FestivalGetDto,
  ): Promise<Festival[]> {
    return await this.festivalService.getFestivals(festivalGetDto);
  }

  @Public()
  @Get('/recent')
  public async getRecentFestivals(): Promise<Festival[]> {
    return await this.festivalService.getRecentFestivals();
  }
}
