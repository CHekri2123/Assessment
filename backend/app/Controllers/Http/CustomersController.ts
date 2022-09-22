import { HttpContext } from "@adonisjs/core/build/standalone";
import Database from "@ioc:Adonis/Lucid/Database";
import Customer from "App/Models/Customer"

export default class CustomersController {

    public async count({ }: HttpContext) {
        const countData = Database
            .from('customers')
            .leftJoin('hoteldatabases', 'customers.id', '=', 'hoteldatabases.customer_id')
            .groupBy('customers.id')
            .count('hoteldatabases.customer_id')
        return countData
    }


    public async displayData({ }: HttpContext) {
        const user = await Customer.all()
        return user
    }
    public async inserData({ request, response }: HttpContext) {
        const dataInsert = new Customer();
        dataInsert.id = request.input('id');
        dataInsert.customer_name = request.input('customer_name');
        dataInsert.branch_name = request.input('branch_name');
        await dataInsert.save()
        return response.json({ dataInsert })
    }
    public async editData({ request }: HttpContext) {
        const editInsert = await Customer.findByOrFail('id', request.params().id)
        editInsert.customer_name = request.input('customer_name')
        editInsert.branch_name = request.input('branch_name')
        await editInsert.save()
        return editInsert
    }
    public async deleteData({ request }: HttpContext) {
        const deleteItem = await Customer.findByOrFail('id', request.params().id)
        deleteItem.delete()
        await deleteItem.save()
        return deleteItem
    }
    public async searchQuery({ request }: HttpContext) {
        var data = request.input('term')
        const searchData = await Database
            .from('customers')
            .select('*')
            .where((query) => {
                if (/^[0-9]/.test(data)) {
                    query.where('id', data)
                }
            })
            .orWhere((query: any) => {
                query
                    .where("customer_name", "ilike", `%${data}%`)
                    .orWhere("branch_name", "ilike", `%${data}%`)
            })
        return searchData
    }

    public async sortAscending({ request }: HttpContext) {
        const columnName = request.input('columnName')
        const sort = await Database.from('customers').select('*').orderBy(`${columnName}`, `asc`)
        return sort
    }

    public async sortDescending({ request }: HttpContext) {
        const columnName = request.input('columnName')
        const sort = await Database.from('customers').select('*').orderBy(`${columnName}`, `desc`)
        return sort
    }
}
