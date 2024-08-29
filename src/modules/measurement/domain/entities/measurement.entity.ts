import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum MeasureTypes {
  WATER = 'WATER',
  GAS = 'GAS',
}

type CreateProps = {
  custumerCode: string
  type: MeasureTypes
  image?: string
}

@Entity('measurementments')
export class Measurementment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  custumerCode: string

  @Column({ enum: MeasureTypes })
  type: MeasureTypes

  @Column({ nullable: true })
  image?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  static create(props: CreateProps) {
    const item = new this()

    Object.keys(props).forEach((key) => (item[key] = props[key]))

    return item
  }
}
