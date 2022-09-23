import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'custs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id')
      table.integer('customer_id')
      table.string('customer_name')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
