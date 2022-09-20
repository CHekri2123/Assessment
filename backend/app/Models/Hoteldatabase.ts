import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hoteldatabase extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: number

  @column()
  public hotel_name: string

  @column()
  public door_no: number

  @column()
  public street: string

  @column()
  public landmark: string

  @column()
  public city: string

  @column()
  public pincode: number
    static save: any

}
