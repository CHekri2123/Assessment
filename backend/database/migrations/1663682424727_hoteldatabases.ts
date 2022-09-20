import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'hoteldatabases'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id')
      table.integer('customer_id')
      table.string('hotel_name')
      table.integer('door_no') 
      table.string('street')
      table.string('landmark')
      table.string('city')
      table.integer('pincode')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
