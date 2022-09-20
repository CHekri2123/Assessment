import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id')
      table.string('customer_name')
      table.string('branch_name')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
