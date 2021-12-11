import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('festival')
export class Festival {
  @PrimaryGeneratedColumn({ name: 'festival_id' })
  festival_id: string;

  @Column('varchar', { name: 'fstvlNm', length: 255, nullable: true })
  fstvlNm: string;

  @Column('varchar', { name: 'opar', length: 255, nullable: true })
  opar: string;

  @Column('varchar', { name: 'fstvlStartDate', length: 255, nullable: true })
  fstvlStartDate: string;

  @Column('varchar', { name: 'fstvlEndDate', length: 255, nullable: true })
  fstvlEndDate: string;

  @Column('varchar', { name: 'fstvlCo', length: 255, nullable: true })
  fstvlCo: string;

  @Column('varchar', { name: 'mnnst', length: 255, nullable: true })
  mnnst: string;

  @Column('varchar', { name: 'auspcInstt', length: 255, nullable: true })
  auspcInstt: string;

  @Column('varchar', { name: 'suprtInstt', length: 255, nullable: true })
  suprtInstt: string;

  @Column('varchar', { name: 'phoneNumber', length: 255, nullable: true })
  phoneNumber: string;

  @Column('varchar', { name: 'homepageUrl', length: 255, nullable: true })
  homepageUrl: string;

  @Column('varchar', { name: 'relateInfo', length: 500, nullable: true })
  relateInfo: string;

  @Column('varchar', { name: 'rdnmadr', length: 500, nullable: true })
  rdnmadr: string;

  @Column('varchar', { name: 'lnmadr', length: 500, nullable: true })
  lnmadr: string;

  @Column('double', { name: 'latitude', nullable: true })
  latitude: number;

  @Column('double', { name: 'longitude', nullable: true })
  longitude: number;

  @Column('varchar', { name: 'referenceDate', length: 255, nullable: true })
  referenceDate: string;

  @Column('varchar', { name: 'instt_code', length: 255, nullable: true })
  instt_code: string;

  @Column('varchar', { name: 'instt_nm', length: 255, nullable: true })
  instt_nm: string;
}
