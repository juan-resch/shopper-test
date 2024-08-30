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
  value: number
  readDate: Date
  imageBase64?: string
  imageURL?: string
}

export type PublicMeasure = {
  measure_uuid: string
  measure_datetime: Date
  measure_type: string
  has_confirmed: boolean
  image_url: string
}
@Entity('measurementments')
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  custumerCode: string

  @Column({ type: 'float' })
  value: number

  @Column({ enum: MeasureTypes })
  type: MeasureTypes

  @Column({ nullable: true })
  imageBase64?: string

  @Column({ nullable: true })
  imageURL?: string

  @Column({ default: false })
  confirmed: boolean

  @Column({ type: 'date' })
  readDate: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  static create(props: CreateProps) {
    const item = new this()

    Object.keys(props).forEach((key) => (item[key] = props[key]))

    return item
  }

  static toPublic(measure: Measurement): PublicMeasure {
    return {
      has_confirmed: measure.confirmed,
      image_url: measure.imageURL,
      measure_datetime: measure.readDate,
      measure_type: measure.type,
      measure_uuid: measure.id,
    }
  }
}
