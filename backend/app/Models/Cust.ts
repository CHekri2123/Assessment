import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cust extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: number

  @column()
  public customer_name: string
}
