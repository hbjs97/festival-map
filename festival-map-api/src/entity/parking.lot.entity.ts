import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parking_lot')
export class ParkingLot {
  @PrimaryGeneratedColumn({ name: 'parking_lot_id' })
  parkingLotId: number;

  @Column('varchar', { name: 'prkplceNo', length: 30 })
  prkplceNo: string;

  @Column('varchar', { name: 'prkplceNm', length: 50, nullable: true })
  prkplceNm: string;

  @Column('varchar', { name: 'prkplceSe', length: 10, nullable: true })
  prkplceSe: string;

  @Column('varchar', { name: 'prkplceType', length: 10, nullable: true })
  prkplceType: string;

  @Column('varchar', { name: 'rdnmadr', length: 500, nullable: true })
  rdnmadr: string;

  @Column('varchar', { name: 'lnmadr', length: 500, nullable: true })
  lnmadr: string;

  @Column('varchar', { name: 'prkcmprt', length: 50, nullable: true })
  prkcmprt: string;

  @Column('varchar', { name: 'feedingSe', length: 10, nullable: true })
  feedingSe: string;

  @Column('varchar', { name: 'enforceSe', length: 10, nullable: true })
  enforceSe: string;

  @Column('varchar', { name: 'operDay', length: 50, nullable: true })
  operDay: string;

  @Column('varchar', {
    name: 'weekdayOperOpenHhmm',
    length: 10,
    nullable: true,
  })
  weekdayOperOpenHhmm: string;

  @Column('varchar', {
    name: 'weekdayOperColseHhmm',
    length: 10,
    nullable: true,
  })
  weekdayOperColseHhmm: string;

  @Column('varchar', {
    name: 'satOperOperOpenHhmm',
    length: 10,
    nullable: true,
  })
  satOperOperOpenHhmm: string;

  @Column('varchar', { name: 'satOperCloseHhmm', length: 10, nullable: true })
  satOperCloseHhmm: string;

  @Column('varchar', {
    name: 'holidayOperOpenHhmm',
    length: 10,
    nullable: true,
  })
  holidayOperOpenHhmm: string;

  @Column('varchar', {
    name: 'holidayCloseOpenHhmm',
    length: 10,
    nullable: true,
  })
  holidayCloseOpenHhmm: string;

  @Column('varchar', { name: 'parkingchrgeInfo', length: 10, nullable: true })
  parkingchrgeInfo: string;

  @Column('varchar', { name: 'basicTime', length: 50, nullable: true })
  basicTime: string;

  @Column('varchar', { name: 'basicCharge', length: 50, nullable: true })
  basicCharge: string;

  @Column('varchar', { name: 'addUnitTime', length: 50, nullable: true })
  addUnitTime: string;

  @Column('varchar', { name: 'addUnitCharge', length: 50, nullable: true })
  addUnitCharge: string;

  @Column('varchar', { name: 'dayCmmtktAdjTime', length: 50, nullable: true })
  dayCmmtktAdjTime: string;

  @Column('varchar', { name: 'dayCmmtkt', length: 50, nullable: true })
  dayCmmtkt: string;

  @Column('varchar', { name: 'monthCmmtkt', length: 50, nullable: true })
  monthCmmtkt: string;

  @Column('varchar', { name: 'metpay', length: 50, nullable: true })
  metpay: string;

  @Column('varchar', { name: 'spcmnt', length: 255, nullable: true })
  spcmnt: string;

  @Column('varchar', { name: 'institutionNm', length: 50, nullable: true })
  institutionNm: string;

  @Column('varchar', { name: 'phoneNumber', length: 50, nullable: true })
  phoneNumber: string;

  @Column('double', { name: 'latitude', nullable: true })
  latitude: number;

  @Column('double', { name: 'longitude', nullable: true })
  longitude: number;

  @Column('varchar', { name: 'referenceDate', length: 50, nullable: true })
  referenceDate: string;

  @Column('varchar', { name: 'instt_code', length: 50, nullable: true })
  instt_code: string;

  @Column('varchar', { name: 'instt_nm', length: 50, nullable: true })
  instt_nm: string;
}
